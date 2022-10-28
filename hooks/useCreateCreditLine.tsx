import { useStableCreditContract } from "./useStableCreditContract"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { parseStableCredits } from "../functions/bignumber"
import { useToast } from "@chakra-ui/react"

export type UseCreateResponse = {
  createCreditLine: (
    address: string,
    creditLimit: number,
    pastDueDays: number,
    defaultDays: number,
    feeRate: number,
  ) => Promise<boolean>
  loading: boolean
}

export const useCreateCreditLine = (): UseCreateResponse => {
  const stableCredit = useStableCreditContract()
  const [creating, setCreating] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const toast = useToast()

  const createCreditLine = useCallback(
    async (
      address: string,
      creditLimit: number,
      pastDueDays: number,
      defaultDays: number,
      feeRate: number,
    ) => {
      setCreating(true)
      try {
        console.log(Math.ceil(pastDueDays * 60 * 60 * 24))

        const limit = parseStableCredits(creditLimit.toString())
        const resp = await (stableCredit &&
          stableCredit.createCreditLine(
            address,
            limit,
            Math.ceil(pastDueDays * 60 * 60 * 24),
            Math.ceil(defaultDays * 60 * 60 * 24),
            Math.ceil(feeRate * 10000),
            0,
          ))

        await resp.wait()

        if (resp)
          addTransaction(resp, {
            summary: `Member Created`,
          })

        setCreating(false)
        return true
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
        return false
      } finally {
        setCreating(false)
      }
    },
    [setCreating, addTransaction, stableCredit],
  )

  return {
    createCreditLine,
    get loading() {
      return creating
    },
  }
}
