import { useStableCreditContract } from "./useStableCreditContract"
import { useMountedState } from "./useMountedState"
import { useAddTransaction } from "../state/transactions"
import { useCallback, useState } from "react"
import { useAccessManagerContract } from "./useAccessManagerContract"
import { formatStableCredits } from "../functions/bignumber"
import { useToast } from "@chakra-ui/react"
import { useFeeManagerContract } from "./useFeeManagerContract"

export type ManageMember = {
  getMember: (address: string) => Promise<void>
  reset: () => void
  member?: Member
  loading: boolean
}

export interface Member {
  address: string
  balance: number
  available: number
  creditLimit: number
  pastDue: Date
  default: Date
  issued?: Date
  feeRate?: number
}

export const useGetMember = (): ManageMember => {
  const stableCredit = useStableCreditContract()
  const accessManager = useAccessManagerContract()
  const feeManager = useFeeManagerContract()
  const [searching, setSearching] = useMountedState(false)
  const [member, setMember] = useState<Member>()
  const toast = useToast()

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
            available: 0,
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
            available: 0,
            default: new Date(),
            pastDue: new Date(),
          })
        }

        const creditLimit = Number(
          formatStableCredits(await stableCredit.creditLimitOf(address)),
        )
        const memberBalance = await stableCredit.balanceOf(address)

        const creditBalance = await stableCredit.creditBalanceOf(address)

        const available = Number(
          formatStableCredits(
            (await stableCredit.creditLimitLeftOf(address)).add(memberBalance),
          ),
        )

        const terms = await stableCredit.creditTerms(address)

        let balance = 0

        if (memberBalance.eq(0) && creditBalance.gt(0))
          balance = 0 - Number(formatStableCredits(creditBalance))
        else balance = Number(formatStableCredits(memberBalance))

        const feeRate = await feeManager.getMemberFeeRate(address)

        setSearching(false)
        setMember({
          address: address,
          creditLimit,
          balance,
          available,
          default: new Date(terms.defaultDate.toNumber() * 1000),
          pastDue: new Date(terms.pastDueDate.toNumber() * 1000),
          issued: new Date(terms.issueDate.toNumber() * 1000),
          feeRate: feeRate.toNumber() / 10000,
        })
      } catch (e) {
        console.log(e)
      } finally {
        setSearching(false)
      }
    },
    [setSearching, stableCredit, accessManager],
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
