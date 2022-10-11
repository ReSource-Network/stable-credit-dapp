import { useStableCreditContract } from "./useStableCreditContract"
import { useSigner } from "wagmi"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useToastControls } from "../state"
import { useCallback } from "react"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"

export type UseCreateResponse = {
  updateCreditLine: (address: string, creditLimit: number) => Promise<void>
  loading: boolean
}

export const useUpdateCreditLine = (): UseCreateResponse => {
  const stableCredit = useStableCreditContract()
  const [updating, setUpdating] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()

  const updateCreditLine = useCallback(
    async (address: string, creditLimit: number) => {
      setUpdating(true)

      try {
        const limit = parseStableCredits(creditLimit.toString())
        const resp = await (stableCredit &&
          stableCredit.extendCreditLine(address, limit))

        if (resp)
          addTransaction(resp, {
            summary: `Credit Line updated`,
          })

        await resp.wait()
        setUpdating(false)
      } catch (e) {
        if (e && (e as any).code === 4001) {
          console.log("Transaction rejected.")

          addToast({
            toastId: nanoid(),
            content: {
              txn: {
                hash: undefined,
                success: false,
                summary: "Transaction rejected.",
              },
            },
          })
        } else {
          console.error(`Transaction failed`, e, "memberUpdate")
          console.log(`Transaction failed: ${(e as any).message}`)

          addToast({
            toastId: nanoid(),
            content: {
              txn: {
                hash: undefined,
                success: false,
                summary: "Oops. Something went wrong.",
              },
            },
          })
        }
      } finally {
        setUpdating(false)
      }
    },
    [setUpdating, addToast, addTransaction, stableCredit],
  )

  return {
    updateCreditLine,
    get loading() {
      return updating
    },
  }
}
