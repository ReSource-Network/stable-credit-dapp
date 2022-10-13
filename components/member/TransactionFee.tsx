import { HStack } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useCallback, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
import { parseStableCredits } from "../../functions/bignumber"
import { formatEther } from "ethers/lib/utils"
import { debounce } from "lodash"

export const TransactionFee = ({ creditAmount }: { creditAmount?: number }) => {
  const feeManager = useFeeManagerContract()
  const feeToken = useFeeTokenContract()
  const { address } = useAccount()
  const [fee, setFee] = useState(0)
  const [feeTokenSymbol, setFeeSymbol] = useState("")

  const handler = useCallback(
    debounce(async () => {
      if (!creditAmount || creditAmount === 0) return setFee(0)
      if (!address) return
      const memberFee = await feeManager.calculateMemberFee(
        address,
        parseStableCredits(creditAmount.toString()),
      )
      setFee(Number(formatEther(memberFee)))
      setFeeSymbol(await feeToken.symbol())
    }, 1000),
    [feeManager, feeToken, address, creditAmount],
  )

  useEffect(() => {
    if (address && feeManager && feeToken) handler()
  }, [feeManager, feeToken, address, creditAmount])

  return (
    <HStack justifyContent="space-between">
      <Text>Network Fee:</Text>
      <HStack>
        <Text> {feeTokenSymbol}</Text>
        <FontAwesomeIcon color="blue" icon={faCircle} />
        <Text fontSize="lg" fontWeight="bold">
          ${fee}
        </Text>
      </HStack>
    </HStack>
  )
}
