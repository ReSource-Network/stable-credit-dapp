import { BigNumber } from "@ethersproject/bignumber"
import { config } from "./config"
import { ERC20__factory } from "../types/factories/ERC20__factory"
import { FeeManager__factory } from "../types/factories/FeeManager__factory"
import { StableCredit__factory } from "../types/factories/StableCredit__factory"
import { ReservePool__factory } from "../types/factories/ReservePool__factory"
import { AccessManager__factory } from "../types/factories/AccessManager__factory"
import { RiskManager__factory } from "../types/factories/RiskManager__factory"
enum Chains {
  MAINNET = "MAINNET",
  ALFAJORES = "ALFAJORES",
  LOCALHOST = "LOCALHOST",
}

export enum ChainId {
  MAINNET = 42220,
  ALFAJORES = 44787,
  LOCALHOST = 31337,
}

export const BlockExplorers = {
  [Chains.MAINNET]: {
    name: "Celo explorer",
    url: "https://explorer.celo.org/",
  },
  [Chains.ALFAJORES]: {
    name: "Alfajores explorer",
    url: "https://alfajores-blockscout.celo-testnet.org/",
  },
}

const CeloMainnet = {
  id: 42220,
  name: "Celo",
  network: "celo",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "https://forno.celo.org",
  },
  blockExplorers: {
    default: { name: "Celo", url: "https://explorer.celo.org/" },
  },
  testnet: false,
}

const Alfajores = {
  id: 44787,
  name: "Alfajores",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "https://alfajores-forno.celo-testnet.org",
  },
  blockExplorers: {
    default: BlockExplorers.ALFAJORES,
  },
  network: "celo alfajores",
  testnet: true,
}

const Localhost = {
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "http://127.0.0.1:8545",
  },
  blockExplorers: { default: BlockExplorers.ALFAJORES },
  network: "hardhat network",
  testnet: true,
}

export const CHAIN_INFO = {
  [ChainId.MAINNET]: CeloMainnet,
  [ChainId.ALFAJORES]: Alfajores,
  [ChainId.LOCALHOST]: Localhost,
}

export type Contract = { [key: string]: { abi: any } }

export enum Contracts {
  FEE_TOKEN = "FEE_TOKEN",
  STABLE_CREDIT = "STABLE_CREDIT",
  RESERVE_POOL = "RESERVE_POOL",
  FEE_MANAGER = "FEE_MANAGER",
  ACCESS_MANAGER = "ACCESS_MANAGER",
  RISK_MANAGER = "RISK_MANAGER",
}

export const CONTRACTS: Contract = {
  [Contracts.FEE_MANAGER]: {
    abi: FeeManager__factory.abi,
  },
  [Contracts.STABLE_CREDIT]: {
    abi: StableCredit__factory.abi,
  },
  [Contracts.RESERVE_POOL]: {
    abi: ReservePool__factory.abi,
  },
  [Contracts.FEE_TOKEN]: {
    abi: ERC20__factory.abi,
  },
  [Contracts.ACCESS_MANAGER]: {
    abi: AccessManager__factory.abi,
  },
  [Contracts.RISK_MANAGER]: {
    abi: RiskManager__factory.abi,
  },
}

export const MINIMUM_LIQUIDITY = BigNumber.from(1000)
export const ZERO = BigNumber.from(0)
export const ONE = BigNumber.from(1)
export const TWO = BigNumber.from(2)
export const THREE = BigNumber.from(3)
export const FOUR = BigNumber.from(4)
export const FIVE = BigNumber.from(5)
export const TEN = BigNumber.from(10)
export const _100 = BigNumber.from(100)
export const _997 = BigNumber.from(997)
export const _1000 = BigNumber.from(1000)
