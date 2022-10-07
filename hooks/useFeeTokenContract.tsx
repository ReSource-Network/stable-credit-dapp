import { Contracts } from "../config"
import { ERC20 } from "../types"
import { useContract } from "./useContract"

export const useFeeTokenContract = () =>
  useContract(Contracts.FEE_TOKEN) as ERC20
