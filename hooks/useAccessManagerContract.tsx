import { Contracts } from "../config"
import { useContract } from "./useContract"
import { AccessManager } from "../types/AccessManager"

export const useAccessManagerContract = () =>
  useContract(Contracts.ACCESS_MANAGER) as AccessManager
