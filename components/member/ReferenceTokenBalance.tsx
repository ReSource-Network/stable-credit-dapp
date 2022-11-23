import { HStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Text } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useReferenceTokenContract } from "../../hooks/useReferenceTokenContract"
import { formatEther } from "@ethersproject/units"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useGetTransactions } from "../../state"
import { useInterval } from "../../hooks/useInterval"

export const ReferenceTokenBalance = () => {
  const { address } = useAccount()
  const referenceToken = useReferenceTokenContract()
  const [referenceTokenBalance, setReferenceTokenBalance] = useState(0)
  const [referenceTokenSymbol, setReferenceTokenSymbol] = useState("")

  const transactions = useGetTransactions()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setReferenceTokenBalance(
        Number(formatEther(await referenceToken.balanceOf(address))),
      )
      setReferenceTokenSymbol(await referenceToken.symbol())
    }
    if (address && referenceToken) handler()
  }, [referenceToken, address, transactions])

  useInterval(() => {
    const handler = async () => {
      if (!address) return
      setReferenceTokenBalance(
        Number(formatEther(await referenceToken.balanceOf(address))),
      )
      setReferenceTokenSymbol(await referenceToken.symbol())
    }
    if (address && referenceToken) handler()
  }, 1000)

  return (
    <HStack justifyContent="space-between">
      <Text whiteSpace={"nowrap"}>{referenceTokenSymbol}:</Text>
      <HStack>
        <FontAwesomeIcon color="#38a5fd" icon={faCircle} />
        <Text whiteSpace={"nowrap"} fontSize="lg" fontWeight="bold">
          {referenceTokenBalance.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </HStack>
    </HStack>
  )
}
