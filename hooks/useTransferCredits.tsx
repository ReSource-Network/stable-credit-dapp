import { useStableCreditContract } from "./useStableCreditContract"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"
import { useToast } from "@chakra-ui/react"

export type UseTransferCreditsResponse = {
  transfer: (address: string, amount: number) => Promise<void>
  loading: boolean
}

export const useTransferCredits = (): UseTransferCreditsResponse => {
  const stableCredit = useStableCreditContract()
  const [transfering, setTransfering] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const toast = useToast()

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
        setTransfering(false)
      }
    },
    [setTransfering, addTransaction, stableCredit],
  )

  return {
    transfer,
    get loading() {
      return transfering
    },
  }
}
