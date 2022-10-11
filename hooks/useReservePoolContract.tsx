import { Contracts } from "../config"
import { useContract } from "./useContract"
import { ReservePool } from "../types/ReservePool"

export const useReservePoolContract = () =>
  useContract(Contracts.RESERVE_POOL) as ReservePool
