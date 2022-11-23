import {
  color,
  FormControl,
  FormErrorMessage,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"
import { useReferenceTokenContract } from "../../hooks/useReferenceTokenContract"
import { parseStableCredits } from "../../functions/bignumber"
import { formatEther } from "ethers/lib/utils"
import { debounce } from "lodash"

export const TransactionFee = ({
  creditAmount,
  sufficient,
  setSufficient,
}: {
  creditAmount?: number
  sufficient: boolean
  setSufficient: (val: boolean) => void
}) => {
  const feeManager = useFeeManagerContract()
  const referenceToken = useReferenceTokenContract()
  const { address } = useAccount()
  const [fee, setFee] = useState(0)
  const [loading, setLoading] = useState(false)
  const [referenceTokenSymbol, setFeeSymbol] = useState("")

  const handler = debounce(async () => {
    if (!creditAmount || creditAmount === 0) {
      setLoading(false)
      setSufficient(true)
      if (!referenceTokenSymbol) setFeeSymbol(await referenceToken.symbol())
      return setFee(0)
    }
    if (!address) return setLoading(false)
    const memberFee = await feeManager.calculateMemberFee(
      address,
      parseStableCredits(creditAmount.toString()),
    )
    setFee(Number(formatEther(memberFee)))
    if (!referenceTokenSymbol) setFeeSymbol(await referenceToken.symbol())
    const referenceTokenBalance = Number(
      formatEther(await referenceToken.balanceOf(address)),
    )
    setSufficient(referenceTokenBalance >= Number(formatEther(memberFee)))
    setLoading(false)
  }, 500)

  useEffect(() => {
    if (address && feeManager && referenceToken) {
      setLoading(true)
      handler()
    }
  }, [feeManager, referenceToken, address, creditAmount])

  return (
    <VStack w="100%">
      <HStack justifyContent="space-between" w="100%">
        <Text>Transaction Fee:</Text>
        <HStack>
          <Text> {referenceTokenSymbol}</Text>
          <FontAwesomeIcon color="#38a5fd" icon={faCircle} />
          {loading ? (
            <Spinner />
          ) : (
            <Text fontSize="lg" fontWeight="bold">
              ${fee}
            </Text>
          )}
        </HStack>
      </HStack>

      {!loading && (
        <FormControl isInvalid={!sufficient}>
          <FormErrorMessage>Insufficient Funds</FormErrorMessage>
        </FormControl>
      )}
    </VStack>
  )
}
