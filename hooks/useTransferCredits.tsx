import { useStableCreditContract } from "./useStableCreditContract"
import { useSigner } from "wagmi"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useToastControls } from "../state"
import { useCallback } from "react"
import { ethers } from "ethers"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"

export type UseTransferCreditsResponse = {
  transfer: (address: string, amount: number) => Promise<void>
  loading: boolean
}

export const useTransferCredits = (): UseTransferCreditsResponse => {
  const stableCredit = useStableCreditContract()
  const [transfering, setTransfering] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()

  const transfer = useCallback(
    async (address: string, amount: number) => {
      setTransfering(true)

      try {
        const resp = await (stableCredit &&
          stableCredit.transfer(address, parseStableCredits(amount.toString())))

        if (resp)
          addTransaction(resp, {
            summary: `Credits transfered`,
          })

        await resp.wait()
        setTransfering(false)
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
        setTransfering(false)
      }
    },
    [setTransfering, addToast, addTransaction, stableCredit],
  )

  return {
    transfer,
    get loading() {
      return transfering
    },
  }
}
