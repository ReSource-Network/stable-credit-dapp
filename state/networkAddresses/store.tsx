import create from "zustand"
import { persist } from "zustand/middleware"

export type NetworkContractAddresses = {
  stableCredit: string
  accessManager: string
  feeManager: string
  feeToken: string
  reservePool: string
}

export type NetworkState = {
  addresses: NetworkContractAddresses
  get: () => NetworkContractAddresses
  set: (_addresses: NetworkContractAddresses) => void
}

export const useNetworkAddressesStore = create<NetworkState>(
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

type AddrState = {
  creditAddr: string
}

type AddrAction = {
  setCreditAddr: (firstName: AddrState["creditAddr"]) => void
}

export const useCreditAddrStore = create<AddrState & AddrAction>(
  persist(
    (set) => ({
      creditAddr: "",
      setCreditAddr: (addr) => set(() => ({ creditAddr: addr })),
    }),
    {
      name: "credit-address",
      getStorage: () => localStorage,
    },
  ),
)
