import { useStableCreditContract } from "./useStableCreditContract"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"
import { useToast } from "@chakra-ui/react"

export type UseCreateResponse = {
  updateCreditLine: (address: string, creditLimit: number) => Promise<void>
  loading: boolean
}

export const useUpdateCreditLine = (): UseCreateResponse => {
  const stableCredit = useStableCreditContract()
  const [updating, setUpdating] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const toast = useToast()

  const updateCreditLine = useCallback(
    async (address: string, creditLimit: number) => {
      setUpdating(true)

      try {
        const limit = parseStableCredits(creditLimit.toString())
        const resp = await (stableCredit &&
          stableCredit.updateCreditLimit(address, limit))

        await resp.wait()

        if (resp)
          addTransaction(resp, {
            summary: `Credit Line updated`,
          })

        setUpdating(false)
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
        setUpdating(false)
      }
    },
    [setUpdating, addTransaction, stableCredit],
  )

  return {
    updateCreditLine,
    get loading() {
      return updating
    },
  }
}
