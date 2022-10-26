import { Box, BoxProps, HStack, Text } from "@chakra-ui/layout"
import React from "react"

const barBaseStyles: BoxProps = {
  position: "absolute",
  borderRadius: "4px",
  height: "4px",
}

const negativeBarStyles: BoxProps = {
  right: "50%",
  maxWidth: "50%",
  borderRightRadius: 0,
  bgColor: "black.main",
}

const positiveBarStyles: BoxProps = {
  left: "50%",
  maxWidth: "50%",
  borderLeftRadius: 0,
  bgColor: "green.main",
}

const centerTickStyles: BoxProps = {
  pos: "absolute",
  top: "-2px",
  left: "0",
  right: "0",
  mx: "auto",
  w: "2px",
  h: "8px",
}

interface Props extends BoxProps {
  balance: number
  creditLimit: number
}

export const BalanceBar = ({ balance, creditLimit, ...rest }: Props) => {
  const isNegative = balance < 0
  const isPositive = balance > 0
  const percent = getPercent(balance, creditLimit)

  return (
    <Box
      p={"1.5em"}
      mt="1em !important"
      pb="4em"
      {...rest}
      backgroundColor="gray"
      borderRadius="1em"
      {...rest}
    >
      <Text ml={1} color="white">
        Balance
      </Text>
      <Box position="relative" mt={3}>
        <Bar bgColor="black" opacity={0.2} w="50%" left="0" />
        <Bar bgColor="green.main" opacity={0.2} w="50%" right="0" />
        {isNegative && (
          <Bar
            data-testid="negative-balance-bar"
            {...negativeBarStyles}
            w={`${percent / 2}%`}
          />
        )}
        {isPositive && (
          <Bar
            data-testid="positive-balance-bar"
            {...positiveBarStyles}
            w={`${percent / 2}%`}
          />
        )}
        <Box position="relative" mt={3}>
          <Bar bgColor="black" opacity={0.2} w="50%" left="0" />
          <Bar bgColor="green.main" opacity={0.2} w="50%" right="0" />
          {isNegative && (
            <Bar
              data-testid="negative-balance-bar"
              {...negativeBarStyles}
              w={`${percent / 2}%`}
            />
          )}
          {isPositive && (
            <Bar
              data-testid="positive-balance-bar"
              {...positiveBarStyles}
              w={`${percent / 2}%`}
            />
          )}
          <Box
            {...centerTickStyles}
            bgColor={isPositive ? "green.main" : "black"}
          />
          <HStack justify="space-between" w="full" top="16px" pos="absolute">
            <Text left={0} variant="number" color="white">
              {`-${creditLimit.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}`}
            </Text>
            <Text color={isPositive ? "green.main" : "black"}>
              {balance.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
            <Text right={0} variant="number" color="white">
              {`+${(balance < 0 ? 0 : balance).toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}`}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

const getPercent = (accountBalance: number, creditLimit: number) => {
  if (typeof accountBalance === "string" && typeof creditLimit === "string") {
    // todo: this is hacky... need to figure out proper types for Decimal across client / API
    return getPercent(parseFloat(accountBalance), parseFloat(creditLimit))
  }
  if (Math.abs(accountBalance) > 0 && creditLimit === 0) return 100
  return Math.abs((accountBalance / creditLimit) * 100) || 0
}

const Bar = (props: BoxProps) => {
  return <Box {...barBaseStyles} {...props} />
}
