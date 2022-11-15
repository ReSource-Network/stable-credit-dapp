import { Signer } from "@ethersproject/abstract-signer"
import { BaseContract } from "@ethersproject/contracts"
import { Provider } from "@ethersproject/providers"
import { StableCredit__factory } from "../types/factories/StableCredit__factory"
import { ReservePool__factory } from "../types/factories/ReservePool__factory"
import { ERC20__factory } from "../types"
import { FeeManager__factory } from "../types/factories/FeeManager__factory"
import { AccessManager__factory } from "../types/factories/AccessManager__factory"
import { RiskManager__factory } from "../types/factories/RiskManager__factory"

export interface Factory<C extends BaseContract> {
  connect(address: string, signerOrProvider: Signer | Provider): C
}

export const createContractGetter = <C extends BaseContract>(
  factory: Factory<C>,
): ((
  address: string,
  signerOrProvider: Signer | Provider,
  cacheSeed?: number,
) => C) => {
  const providerCache = new WeakMap<Signer | Provider, Record<string, C>>()

  return (address, signerOrProvider, cacheSeed = 0) => {
    const cacheByAddressKey = `${address}-${cacheSeed}`
    let cacheByAddress = providerCache.get(signerOrProvider)
    let contract = cacheByAddress?.[cacheByAddressKey]

    if (!cacheByAddress) {
      cacheByAddress = {}
      providerCache.set(signerOrProvider, cacheByAddress)
    }

    if (!contract) {
      contract = factory.connect(address, signerOrProvider)
      cacheByAddress[cacheByAddressKey] = contract
    }

    return contract
  }
}

export const getStableCreditContract = createContractGetter(
  StableCredit__factory,
)
export const getReservePoolContract = createContractGetter(ReservePool__factory)
export const getFeeTokenContract = createContractGetter(ERC20__factory)
export const getFeeManagerContract = createContractGetter(FeeManager__factory)
export const getRiskManagerContract = createContractGetter(RiskManager__factory)
export const getAccessManagerContract = createContractGetter(
  AccessManager__factory,
)
