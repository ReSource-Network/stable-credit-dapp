import { useStableCreditContract } from "./useStableCreditContract"
import { useSigner } from "wagmi"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useToastControls } from "../state"
import { useCallback, useState } from "react"
import { ethers } from "ethers"
import { nanoid } from "../functions/nanoid"
import { Member } from "../components/operator/Members"
import { useAccessManagerContract } from "./useAccessManagerContract"
import { formatStableCredits } from "../functions/bignumber"

export type ManageMember = {
  getMember: (address: string) => Promise<void>
  reset: () => void
  member?: Member
  loading: boolean
}

export const useGetMember = (): ManageMember => {
  const stableCredit = useStableCreditContract()
  const accessManager = useAccessManagerContract()
  const [searching, setSearching] = useMountedState(false)
  const [member, setMember] = useState<Member>()

  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()

  const getMember = useCallback(
    async (address: string) => {
      setSearching(true)

      try {
        if (!accessManager) {
          setSearching(false)
          return setMember({
            address: "",
            creditLimit: 0,
            balance: 0,
            default: new Date(),
            pastDue: new Date(),
          })
        }
        const isMember = await accessManager.isMember(address)
        if (!isMember) {
          setSearching(false)
          return setMember({
            address: "",
            creditLimit: 0,
            balance: 0,
            default: new Date(),
            pastDue: new Date(),
          })
        }

        const creditLimit = Number(
          formatStableCredits(await stableCredit.creditLimitOf(address)),
        )
        const memberBalance = await stableCredit.balanceOf(address)

        const creditBalance = await stableCredit.creditBalanceOf(address)

        const terms = await stableCredit.creditTerms(address)

        let balance = 0

        if (memberBalance.eq(0) && creditBalance.gt(0))
          balance = 0 - Number(formatStableCredits(creditBalance))
        else balance = Number(formatStableCredits(memberBalance))

        setSearching(false)
        setMember({
          address: address,
          creditLimit,
          balance,
          default: new Date(terms.defaultDate.toNumber() * 1000),
          pastDue: new Date(terms.pastDueDate.toNumber() * 1000),
        })
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
        }
      } finally {
        setSearching(false)
      }
    },
    [setSearching, addToast, addTransaction, stableCredit, accessManager],
  )

  return {
    getMember,
    member,
    reset: () => {
      setMember(undefined)
    },
    get loading() {
      return searching
    },
  }
}
