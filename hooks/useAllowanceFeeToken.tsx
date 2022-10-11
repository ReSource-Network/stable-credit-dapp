import { BigNumber } from "ethers"
import { useCallback, useEffect, useMemo } from "react"
import { KeyedMutator } from "swr"
import { useNoCacheSWR } from "./useSWR"
import { ZERO } from "../config"
import { useDebounceCallback } from "./useDebounceCallback"
import { ERC20 } from "../types"
import { useAccount, useSigner } from "wagmi"
import { useFeeTokenContract } from "./useFeeTokenContract"

export type UseAllowanceResponse = {
  mutate: KeyedMutator<any>
  update: () => Promise<any>
  allowance: BigNumber
  loading: boolean
  initialLoading: boolean
  error: any
}

export const useAllowanceFeetoken = (
  spender: string,
  owner?: string,
): UseAllowanceResponse => {
  const { data: signer } = useSigner()
  const { address: addr } = useAccount()
  const provider = signer?.provider
  const address = useMemo(() => owner ?? addr, [owner, addr])

  const feeToken = useFeeTokenContract()

  const inputs = useMemo(() => ["Allowance", owner, spender], [owner, spender])
  const shouldFetch = !!address && !!feeToken

  const func =
    (contract: ERC20) => async (_: string, owner: string, spender: string) =>
      await contract.allowance(owner, spender)

  console.log(shouldFetch)

  const result = useNoCacheSWR<BigNumber>(
    shouldFetch ? inputs : null,
    func(feeToken),
  )

  const mutate = result.mutate

  const update = useCallback(() => {
    return mutate(undefined, true)
  }, [mutate])

  const updateAllowance = useDebounceCallback(update)

  const subscribeToUpdates = useCallback(() => {
    if (!address || !provider || !feeToken) return

    try {
      const transfer = feeToken.filters.Transfer(address, spender)
      const approve = feeToken.filters.Approval(address, spender)

      provider.on(transfer, updateAllowance)
      provider.on(approve, updateAllowance)

      return () => {
        provider.off(transfer, updateAllowance)
        provider.off(approve, updateAllowance)
      }
    } catch (error) {}
  }, [provider, feeToken, address, spender, updateAllowance])

  useEffect(subscribeToUpdates, [subscribeToUpdates])

  return {
    mutate,
    update,

    get allowance() {
      return result.data ?? ZERO
    },
    get loading() {
      return result.isValidating
    },
    get initialLoading() {
      return result.data == null && result.isValidating
    },
    get error() {
      return result.error
    },
  }
}
