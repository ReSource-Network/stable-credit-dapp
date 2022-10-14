import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { useToast } from "@chakra-ui/react"
import { useReservePoolContract } from "./useReservePoolContract"

export type useWithdrawOperatorResponse = {
  withdraw: () => Promise<void>
  loading: boolean
}

export const useWithdrawOperator = (): useWithdrawOperatorResponse => {
  const reservePool = useReservePoolContract()
  const [withdrawing, setWithdrawing] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const toast = useToast()

  const withdraw = useCallback(async () => {
    setWithdrawing(true)

    try {
      const operatorBalance = await reservePool.operatorBalance()
      if (operatorBalance.eq(0)) return

      const resp = await (reservePool &&
        reservePool.withdrawOperator(operatorBalance))

      await resp.wait()

      if (resp)
        addTransaction(resp, {
          summary: `Operator withdraw`,
        })

      setWithdrawing(false)
    } catch (e) {
      if (e && (e as any).code === 4001) {
        console.log("Transaction rejected.")

        toast({
          position: "top-right",
          title: "Transaction rejected",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      } else {
        console.error(`Transaction failed`, e, "memberCreate")
        console.log(`Transaction failed: ${(e as any).message}`)

        toast({
          position: "top-right",
          title: "Oops. Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      }
    } finally {
      setWithdrawing(false)
    }
  }, [setWithdrawing, withdrawing, reservePool])

  return {
    withdraw,
    get loading() {
      return withdrawing
    },
  }
}
