import React from "react"
import { Box, BoxProps, Text } from "@chakra-ui/layout"
import { Progress } from "@chakra-ui/progress"
import { HStack } from "@chakra-ui/react"

interface Props extends BoxProps {
  availableCredit: any
  creditLimit: number
}

export const CreditUsageBar = ({
  availableCredit,
  creditLimit,
  ...rest
}: Props) => {
  let creditUsed = creditLimit - parseFloat(availableCredit)
  let percentUsed = Math.abs((creditUsed / creditLimit) * 100) || 0

  if (Number(creditLimit) === 0) {
    percentUsed = 0
    creditUsed = 0
  }

  return (
    <Box p={"1.5em"} {...rest} backgroundColor="gray" borderRadius="1em">
      <Text ml={1} color="white">
        Credit usage
      </Text>
      <Progress
        mt={3}
        colorScheme="gray"
        value={percentUsed}
        data-testid="credit-usage-bar"
      />
      <HStack mt={3}>
        <Text color="white" variant="number">
          {creditUsed.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
        <Text color="white" variant="number">
          /
        </Text>
        <Text color="white" variant="number">
          {creditLimit.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </HStack>
    </Box>
  )
}