import { Contracts } from "../config"
import { useContract } from "./useContract"
import { StableCredit } from "../types/StableCredit"

export const useStableCreditContract = () =>
  useContract(Contracts.STABLE_CREDIT) as StableCredit
