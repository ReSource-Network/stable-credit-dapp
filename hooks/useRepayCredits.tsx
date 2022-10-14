import { useStableCreditContract } from "./useStableCreditContract"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"
import { useToast } from "@chakra-ui/react"

export type UseRepayCreditsResponse = {
  repay: (amount: number) => Promise<void>
  loading: boolean
}

export const useRepayCredits = (): UseRepayCreditsResponse => {
  const stableCredit = useStableCreditContract()
  const [repaying, setRepaying] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const toast = useToast()

  const repay = useCallback(
    async (amount: number) => {
      setRepaying(true)

      try {
        const resp = await (stableCredit &&
          stableCredit.repayCreditBalance(
            parseStableCredits(amount.toString()),
          ))

        await resp.wait()

        if (resp)
          addTransaction(resp, {
            summary: `Credit Repayed`,
          })

        setRepaying(false)
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
        setRepaying(false)
      }
    },
    [setRepaying, addTransaction, stableCredit],
  )

  return {
    repay,
    get loading() {
      return repaying
    },
  }
}
