import { Box, HStack, Text } from "@chakra-ui/layout"
import { Stack, Tooltip } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Member } from "../../../hooks/useGetMember"
import { useFeeManagerContract } from "../../../hooks/useFeeManagerContract"

export const FeeBar = ({ member }: { member?: Member }) => {
  const [averageFeeRate, setAverageFeeRate] = useState(0)
  const feeManager = useFeeManagerContract()

  useEffect(() => {
    const handler = async () => {
      setAverageFeeRate((await feeManager.averageFeeRate()).toNumber() / 10000)
    }
    if (feeManager) handler()
  }, [feeManager])
  return (
    <Box
      p={"1.5em"}
      mt="1em !important"
      backgroundColor="gray"
      borderRadius="1em"
    >
      <Box backgroundColor="gray" borderRadius="1em">
        <Stack>
          <Text fontWeight={"bold"} color="white">
            Transaction Fees
          </Text>

          <HStack justifyContent="space-between">
            <Tooltip
              hasArrow
              label={
                "Your transaction fee rate changes with your risk score and when network conditions change"
              }
              aria-label="Expiration Date"
            >
              <Text>Your fee rate: </Text>
            </Tooltip>
            <Text whiteSpace={"nowrap"} fontSize="lg" fontWeight="bold">
              {member?.feeRate}%
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Tooltip
              hasArrow
              label={
                "The average fee rate changes with network conditions. Your fee rate will be above or bellow the average depending on your credit risk"
              }
              aria-label="Expiration Date"
            >
              <Text>Average fee rate: </Text>
            </Tooltip>
            <Text whiteSpace={"nowrap"} fontSize="lg" fontWeight="bold">
              {averageFeeRate}%
            </Text>
          </HStack>
        </Stack>
        <Box />
      </Box>
    </Box>
  )
}
