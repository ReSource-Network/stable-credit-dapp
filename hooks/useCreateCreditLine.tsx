import { useStableCreditContract } from "./useStableCreditContract"
import { useSigner } from "wagmi"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useToastControls } from "../state"
import { useCallback } from "react"
import { ethers } from "ethers"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"

export type UseCreateResponse = {
  createCreditLine: (address: string, creditLimit: number) => Promise<void>
  loading: boolean
}

export const useCreateCreditLine = (): UseCreateResponse => {
  const stableCredit = useStableCreditContract()
  const [creating, setCreating] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()

  const createCreditLine = useCallback(
    async (address: string, creditLimit: number) => {
      setCreating(true)

      try {
        const limit = parseStableCredits(creditLimit.toString())
        const resp = await (stableCredit &&
          stableCredit.createCreditLine(address, limit, 0))

        if (resp)
          addTransaction(resp, {
            summary: `Member Created`,
          })

        await resp.wait()
        setCreating(false)
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
          console.error(`Transaction failed`, e, "memberCreate")
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
        setCreating(false)
      }
    },
    [setCreating, addToast, addTransaction, stableCredit],
  )

  return {
    createCreditLine,
    get loading() {
      return creating
    },
  }
}
