import { useToast } from "@chakra-ui/react"
import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useEffect, useState } from "react"
import { config } from "../config"
import { nanoid } from "../functions"
import { formatBN } from "../functions/bignumber"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useMountedState } from "./useMountedState"
import { ERC20__factory } from "../types/factories/ERC20__factory"
import { ERC20 } from "../types/ERC20"
import { useStableCreditContract } from "./useStableCreditContract"
import { ethers } from "ethers"

export type UseCreditExpirationResponse = {
  updatePastDue: (pastDueDays: number) => Promise<void>
  updateExpiration: (expirationDays: number) => Promise<void>
  refetch: () => void
  pastDue: BigNumber
  expiration: BigNumber
  loading: boolean
}

export const useUpdateCreditExpiration = (): UseCreditExpirationResponse => {
  const stableCredit = useStableCreditContract()
  const [updatingPastDue, setUpdatingPastDue] = useMountedState(false)
  const [updatingExpiration, setUpdatingExpiration] = useMountedState(false)
  const [shouldFetch, setShouldFetch] = useMountedState(true)
  const [pastDue, setPastDue] = useState(BigNumber.from(0))
  const [expiration, setExpiration] = useState(BigNumber.from(0))
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()

  const refetch = () => {
    setShouldFetch(true)
  }

  useEffect(() => {
    const handler = async () => {
      setPastDue(await stableCredit.pastDueExpiration())
      setExpiration(await stableCredit.creditExpiration())
      setShouldFetch(false)
    }
    if (stableCredit && shouldFetch) handler()
  }, [stableCredit, shouldFetch])

  const updatePastDue = useCallback(
    async (pastDueSeconds: number) => {
      setUpdatingPastDue(true)

      try {
        const resp = await (stableCredit &&
          stableCredit.setPastDueExpiration(pastDueSeconds))

        addTransaction(resp, {
          summary: `Credit past due updated`,
        })

        await resp.wait()
        setUpdatingPastDue(false)
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
          console.error(`Transaction failed`, e, "approve")
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
        setUpdatingPastDue(false)
      }
    },
    [setUpdatingPastDue, addToast, addTransaction, stableCredit],
  )

  const updateExpiration = useCallback(
    async (expirationSeconds: number) => {
      setUpdatingExpiration(true)

      try {
        const resp = await (stableCredit &&
          stableCredit.setCreditExpiration(expirationSeconds))

        addTransaction(resp, {
          summary: `Credit expiration updated`,
        })

        await resp.wait()
        setUpdatingExpiration(false)
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
          console.error(`Transaction failed`, e, "approve")
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
        setUpdatingExpiration(false)
      }
    },
    [setUpdatingExpiration, addToast, addTransaction, stableCredit],
  )

  return {
    updatePastDue,
    updateExpiration,
    refetch,
    pastDue,
    expiration,
    get loading() {
      return updatingPastDue || updatingExpiration
    },
  }
}
