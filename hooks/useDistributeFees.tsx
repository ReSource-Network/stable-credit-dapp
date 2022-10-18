import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback } from "react"
import { useToast } from "@chakra-ui/react"
import { useFeeManagerContract } from "./useFeeManagerContract"

export type useDistributeFeesResponse = {
  distribute: () => Promise<void>
  loading: boolean
}

export const useDistributeFees = (): useDistributeFeesResponse => {
  const feeManager = useFeeManagerContract()
  const [distributing, setDistributing] = useMountedState(false)

  const addTransaction = useAddTransaction()
  const toast = useToast()

  const distribute = useCallback(async () => {
    setDistributing(true)

    try {
      const resp = await (feeManager && feeManager.distributeFees())

      await resp.wait()

      if (resp)
        addTransaction(resp, {
          summary: `Fees distributed`,
        })

      setDistributing(false)
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
      setDistributing(false)
    }
  }, [setDistributing, distributing, feeManager])

  return {
    distribute,
    get loading() {
      return distributing
    },
  }
}
