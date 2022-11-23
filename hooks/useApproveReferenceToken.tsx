import { useToast } from "@chakra-ui/react"
import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useMemo } from "react"
import { config } from "../config"
import { nanoid } from "../functions"
import { formatBN } from "../functions/bignumber"
import { useAddTransaction } from "../state/transactions"
import { useAllowanceFeetoken } from "./useAllowanceReferenceToken"

import { useMountedState } from "./useMountedState"
import { useAccount } from "wagmi"
import { useReferenceTokenContract } from "./useReferenceTokenContract"

export type UseApproveResponse = {
  approve: () => Promise<void>
  approving: boolean
  initialLoading: boolean
  approvalState: ApprovalState
  allowance: BigNumber
  loading: boolean
  error: unknown
}

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

export const useApproveReferenceToken = (
  amount: BigNumber,
  spender: string,
): UseApproveResponse => {
  const { address } = useAccount()
  const referenceToken = useReferenceTokenContract()

  const [approving, setApproving] = useMountedState(false)
  const {
    allowance,
    loading,
    error,
    initialLoading,
    update: updateAllowance,
  } = useAllowanceFeetoken(spender, address)
  const addTransaction = useAddTransaction()
  const toast = useToast()

  const approvalState: ApprovalState = useMemo(() => {
    if (!amount || !spender) return ApprovalState.UNKNOWN

    if (!allowance) return ApprovalState.UNKNOWN

    return allowance.lt(amount)
      ? loading
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amount, allowance, loading, spender])

  const approve = useCallback(async () => {
    setApproving(true)

    try {
      const resp = await (referenceToken &&
        referenceToken.approve(spender, amount))

      const symbol = await referenceToken.symbol()

      await resp.wait()

      addTransaction(resp, {
        summary: `Approved ${symbol}`,
        approval: { tokenAddress: referenceToken.address, spender },
      })

      await updateAllowance()
      setApproving(false)
    } catch (e) {
      if (e && (e as any).code === 4001) {
        console.log("Transaction rejected.")

        toast({
          position: "top-right",
          title: "Transaction rejected",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      } else {
        console.error(`Transaction failed`, e, "approve")
        console.log(`Transaction failed: ${(e as any).message}`)

        toast({
          position: "top-right",
          title: "Oops. Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      setApproving(false)
    }
  }, [
    spender,
    amount,
    setApproving,
    addTransaction,
    updateAllowance,
    referenceToken,
  ])

  return {
    approve,
    approving,
    allowance,
    approvalState,
    initialLoading,

    get loading() {
      return loading
    },
    get error() {
      return error
    },
  }
}
