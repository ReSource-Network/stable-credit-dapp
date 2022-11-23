import create from "zustand"
import { persist } from "zustand/middleware"

export type NetworkContractAddresses = {
  stableCredit: string
  accessManager: string
  feeManager: string
  referenceToken: string
  reservePool: string
  riskManager: string
}

export type NetworkAddressesStoreState = {
  addresses: NetworkContractAddresses
  get: () => NetworkContractAddresses
  set: (_addresses: NetworkContractAddresses) => void
}

export const useNetworkAddressesStore = create<NetworkAddressesStoreState>(
  persist(
    (set, get) => ({
      addresses: {} as NetworkContractAddresses,
      get: () => get().addresses,
      set: (_addresses: NetworkContractAddresses) =>
        set({ addresses: _addresses }),
    }),
    {
      name: "network-addresses",
      getStorage: () => localStorage,
    },
  ),
)
