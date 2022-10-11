import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
} from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { useState, useEffect } from "react"
import { Stack, Text, LightMode } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
import { formatEther } from "@ethersproject/units"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

export const FeeTokenBalance = () => {
  const { address } = useAccount()
  const feeToken = useFeeTokenContract()
  const [feeTokenBalance, setFeeTokenBalance] = useState(0)
  const [feeTokenName, setFeeTokenName] = useState("")

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setFeeTokenBalance(Number(formatEther(await feeToken.balanceOf(address))))
      setFeeTokenName(await feeToken.name())
    }
    if (address && feeToken) handler()
  }, [feeToken, address])

  return (
    <HStack justifyContent="space-between">
      <Text fontWeight="bold">{feeTokenName} balance:</Text>
      <HStack>
        <FontAwesomeIcon color="blue" icon={faCircle} />
        <Text fontSize="lg" fontWeight="bold">
          ${feeTokenBalance}
        </Text>
      </HStack>
    </HStack>
  )
}
