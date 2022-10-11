import { useStableCreditContract } from "./useStableCreditContract"
import { useSigner } from "wagmi"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useToastControls } from "../state"
import { useCallback } from "react"
import { ethers } from "ethers"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"

export type UseRepayCreditsResponse = {
  repay: (amount: number) => Promise<void>
  loading: boolean
}

export const useRepayCredits = (): UseRepayCreditsResponse => {
  const stableCredit = useStableCreditContract()
  const [repaying, setRepaying] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()

  const repay = useCallback(
    async (amount: number) => {
      setRepaying(true)

      try {
        const resp = await (stableCredit &&
          stableCredit.repayCreditBalance(
            parseStableCredits(amount.toString()),
          ))

        if (resp)
          addTransaction(resp, {
            summary: `Credit Repayed`,
          })

        await resp.wait()
        setRepaying(false)
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
          console.error(`Transaction failed`, e, "transferCredits")
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
        setRepaying(false)
      }
    },
    [setRepaying, addToast, addTransaction, stableCredit],
  )

  return {
    repay,
    get loading() {
      return repaying
    },
  }
}
