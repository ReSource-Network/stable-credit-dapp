import { ethers } from "ethers"
import { useCallback, useMemo } from "react"
import { useSigner } from "wagmi"
import shallow from "zustand/shallow"

import { StableCredit__factory } from "../../types"
import {
  NetworkContractAddresses,
  useCreditAddrStore,
  useNetworkAddressesStore,
} from "./store"

export const useNetworkAddresses = () => {
  const { addresses } = useNetworkAddressesStore(
    (store) => ({
      addresses: store.addresses,
    }),
    shallow,
  )

  return addresses
}

export const useFetchNetworkAddresses = () => {
  const { creditAddr } = useCreditAddrStore()
  const { data: signer } = useSigner()

  const { set } = useNetworkAddressesStore(
    (store) => ({
      set: store.set,
    }),
    shallow,
  )

  const validNetworkAddress = ethers.utils.isAddress(creditAddr)

  return useCallback(async () => {
    let addresses = {} as NetworkContractAddresses
    if (!validNetworkAddress || !creditAddr) return set(addresses)
    if (!signer) return
    const stableCredit = StableCredit__factory.connect(creditAddr, signer)

    addresses.stableCredit = creditAddr
    try {
      addresses.accessManager = await stableCredit.access()
      addresses.feeManager = await stableCredit.feeManager()
      addresses.feeToken = await stableCredit.feeToken()
      addresses.reservePool = await stableCredit.reservePool()
    } catch (e) {
      console.log(e)
    }

    set(addresses)
  }, [set, validNetworkAddress, signer, creditAddr])
}
