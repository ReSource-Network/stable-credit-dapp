import { useStableCreditContract } from "./useStableCreditContract"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { nanoid } from "../functions/nanoid"
import { parseStableCredits } from "../functions/bignumber"
import { useToast } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useRiskManagerContract } from "./useRiskManagerContract"

export type UseTransferCreditsResponse = {
  transfer: (address: string, amount: number) => Promise<void>
  loading: boolean
}

export const useTransferCredits = (): UseTransferCreditsResponse => {
  const stableCredit = useStableCreditContract()
  const riskManager = useRiskManagerContract()
  const [transfering, setTransfering] = useMountedState(false)
  const { address: signerAddress } = useAccount()
  const addTransaction = useAddTransaction()
  const toast = useToast()

  const transfer = useCallback(
    async (address: string, amount: number) => {
      setTransfering(true)

      try {
        if (address == signerAddress) throw Error("Recipient can't be Sender")
        const inDefault = await riskManager.inDefault(
          stableCredit.address,
          address,
        )
        const resp = await (stableCredit &&
          stableCredit.transfer(address, parseStableCredits(amount.toString())))

        await resp.wait()

        if (resp)
          addTransaction(resp, {
            summary: inDefault
              ? "Credit line defaulted!"
              : "Credits transfered",
          })

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
