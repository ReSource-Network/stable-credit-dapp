import { Provider } from "@ethersproject/providers"
import { Contract } from "@ethersproject/contracts"
import { Signer } from "ethers"
import { useMemo } from "react"
import { useSigner, useProvider } from "wagmi"

import { Contracts } from "../config"
import {
  getAccessManagerContract,
  getFeeManagerContract,
  getFeeTokenContract,
  getReservePoolContract,
  getStableCreditContract,
} from "../functions/contracts"
import { NetworkContracts, useNetworkAddresses } from "./useNetworkAddresses"

export function getContract(
  networkAddresses: NetworkContracts,
  signer?: Signer | Provider,
  key?: Contracts,
): Contract | null {
  let { stableCredit, accessManager, feeManager, feeToken, reservePool } =
    networkAddresses
  if (
    !signer ||
    !key ||
    !stableCredit ||
    !accessManager ||
    !feeManager ||
    !feeToken ||
    !reservePool
  )
    return null

  let contract

  switch (key) {
    case Contracts.STABLE_CREDIT: {
      contract = getStableCreditContract(stableCredit, signer)
      break
    }
    case Contracts.RESERVE_POOL: {
      contract = getReservePoolContract(reservePool, signer)
      break
    }
    case Contracts.FEE_TOKEN: {
      contract = getFeeTokenContract(feeToken, signer)
      break
    }
    case Contracts.FEE_MANAGER: {
      contract = getFeeManagerContract(feeManager, signer)
      break
    }
    case Contracts.ACCESS_MANAGER: {
      contract = getAccessManagerContract(accessManager, signer)
      break
    }
  }

  return contract
}

export function useContract(key: Contracts): Contract | null {
  const { data: signer } = useSigner()
  const provider = useProvider()
  const { networkAddresses } = useNetworkAddresses()
  return useMemo(() => {
    if (!signer) return getContract(networkAddresses, provider, key)

    try {
      return getContract(networkAddresses, signer, key)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [key, signer, networkAddresses])
}
