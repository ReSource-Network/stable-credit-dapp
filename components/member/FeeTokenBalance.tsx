import { HStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Text } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
import { formatEther } from "@ethersproject/units"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useGetTransactions } from "../../state"
import { useInterval } from "../../hooks/useInterval"

export const FeeTokenBalance = () => {
  const { address } = useAccount()
  const feeToken = useFeeTokenContract()
  const [feeTokenBalance, setFeeTokenBalance] = useState(0)
  const [feeTokenSymbol, setFeeTokenSymbol] = useState("")

  const transactions = useGetTransactions()

  // refetch on transaction confirmation

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setFeeTokenBalance(Number(formatEther(await feeToken.balanceOf(address))))
      setFeeTokenSymbol(await feeToken.symbol())
    }
    if (address && feeToken) handler()
  }, [feeToken, address, transactions])

  useInterval(() => {
    const handler = async () => {
      if (!address) return
      setFeeTokenBalance(Number(formatEther(await feeToken.balanceOf(address))))
      setFeeTokenSymbol(await feeToken.symbol())
    }
    if (address && feeToken) handler()
  }, 1000)

  return (
    <HStack justifyContent="space-between">
      <Text whiteSpace={"nowrap"}>{feeTokenSymbol} Balance:</Text>
      <HStack>
        <FontAwesomeIcon color="#38a5fd" icon={faCircle} />
        <Text whiteSpace={"nowrap"} fontSize="lg" fontWeight="bold">
          {feeTokenBalance.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </HStack>
    </HStack>
  )
}
