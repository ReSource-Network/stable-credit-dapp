import { Contracts } from "../config"
import { useContract } from "./useContract"
import { RiskManager } from "../types/RiskManager"

export const useRiskManagerContract = () =>
  useContract(Contracts.RISK_MANAGER) as RiskManager
