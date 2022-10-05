import { Provider } from "@ethersproject/providers"
import { Contract } from "@ethersproject/contracts"
import { Signer } from "ethers"
import { useMemo } from "react"
import { useSigner, useProvider } from "wagmi"

import { CONTRACTS, Contracts } from "../config"

export function getContract(
  signer?: Signer | Provider,
  key?: Contracts,
): Contract | null {
  if (!signer || !key) return null

  let contract

  switch (key) {
  }

  return contract
}

export function useContract(key: Contracts): Contract | null {
  const { data: signer } = useSigner()
  const provider = useProvider()
  return useMemo(() => {
    if (!signer) return getContract(provider, key)

    try {
      return getContract(signer, key)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [key, signer])
}
