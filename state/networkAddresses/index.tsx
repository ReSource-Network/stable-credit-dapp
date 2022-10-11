import { ContractTransaction, ethers } from "ethers"
import { useCallback, useMemo } from "react"
import shallow from "zustand/shallow"

import { TransactionNotifier } from "../../functions/notifier"

import { NetworkContractAddresses, useNetworkAddressesStore } from "./store"
import { useAccount, useNetwork, useSigner, useProvider } from "wagmi"
import { useRouter } from "next/router"
import { StableCredit, StableCredit__factory } from "../../types"

export const useGetNetworkAddresses = () => {
  const { addresses } = useNetworkAddressesStore(
    (store) => ({
      addresses: store.addresses,
    }),
    shallow,
  )

  return addresses
}

export const useFetchNetworkAddresses = () => {
  const router = useRouter()
  const network = router.query.network as string
  const { data: signer } = useSigner()

  const { set } = useNetworkAddressesStore(
    (store) => ({
      set: store.set,
    }),
    shallow,
  )

  const validNetworkAddress = ethers.utils.isAddress(network)

  return useCallback(async () => {
    let addresses = {} as NetworkContractAddresses
    if (!validNetworkAddress || !network) return set(addresses)
    if (!signer) return
    const stableCredit = StableCredit__factory.connect(network, signer)

    addresses.stableCredit = network
    try {
      addresses.accessManager = await stableCredit.access()
      addresses.feeManager = await stableCredit.feeManager()
      addresses.feeToken = await stableCredit.feeToken()
      addresses.reservePool = await stableCredit.reservePool()
    } catch (e) {
      console.log(e)
    }

    set(addresses)
  }, [set, validNetworkAddress, signer, network])
}
