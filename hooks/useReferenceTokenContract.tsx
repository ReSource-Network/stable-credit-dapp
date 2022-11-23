import { Contracts } from "../config"
import { ERC20 } from "../types"
import { useContract } from "./useContract"

export const useReferenceTokenContract = () =>
  useContract(Contracts.FEE_TOKEN) as ERC20
