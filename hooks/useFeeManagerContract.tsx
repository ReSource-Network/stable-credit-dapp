import { Contracts } from "../config"
import { useContract } from "./useContract"
import { FeeManager } from "../types/FeeManager"

export const useFeeManagerContract = () =>
  useContract(Contracts.FEE_MANAGER) as FeeManager
