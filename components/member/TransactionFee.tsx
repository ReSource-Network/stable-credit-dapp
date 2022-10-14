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
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
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
  const feeToken = useFeeTokenContract()
  const { address } = useAccount()
  const [fee, setFee] = useState(0)
  const [loading, setLoading] = useState(false)
  const [feeTokenSymbol, setFeeSymbol] = useState("")

  const handler = debounce(async () => {
    if (!creditAmount || creditAmount === 0) {
      setLoading(false)
      setSufficient(true)
      if (!feeTokenSymbol) setFeeSymbol(await feeToken.symbol())
      return setFee(0)
    }
    if (!address) return setLoading(false)
    const memberFee = await feeManager.calculateMemberFee(
      address,
      parseStableCredits(creditAmount.toString()),
    )
    setFee(Number(formatEther(memberFee)))
    if (!feeTokenSymbol) setFeeSymbol(await feeToken.symbol())
    const feeTokenBalance = Number(
      formatEther(await feeToken.balanceOf(address)),
    )
    setSufficient(feeTokenBalance >= Number(formatEther(memberFee)))
    setLoading(false)
  }, 500)

  useEffect(() => {
    if (address && feeManager && feeToken) {
      setLoading(true)
      handler()
    }
  }, [feeManager, feeToken, address, creditAmount])

  return (
    <VStack w="100%">
      <HStack justifyContent="space-between" w="100%">
        <Text>Network Fee:</Text>
        <HStack>
          <Text> {feeTokenSymbol}</Text>
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
