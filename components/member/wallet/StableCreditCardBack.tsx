import { Image } from "@chakra-ui/image"
import { Box, BoxProps, Heading, Text, VStack } from "@chakra-ui/layout"
import { Button, HStack, LightMode, useBreakpointValue } from "@chakra-ui/react"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const innerStyles: BoxProps = {
  p: 6,
  bgColor: "gray",
  borderRadius: "inherit",
  h: "full",
}

const defaultStyles: BoxProps = {
  p: "2px",
  h: "full",
  borderRadius: "2xl",
  bg: "gray",
}

interface Props extends BoxProps {
  availableCredit: number
  creditLimit: number
  balance: number
  flip: () => void
}
export const StableCreditCardBack = ({
  availableCredit,
  flip,
  creditLimit,
  balance,
  ...rest
}: Props) => {
  return (
    <Box {...defaultStyles} {...rest}>
      <VStack
        {...innerStyles}
        borderRadius="14px"
        justify="space-between"
        align="start"
      >
        <HStack width="100%" left="0" top="1.5em" pos="absolute">
          <Box
            width="100%"
            bgColor="gray.900"
            h={{ md: "3em", base: "2em" }}
          ></Box>
        </HStack>

        <HStack zIndex={1} w="100%">
          <HStack>
            <Heading color="white" size="header">
              RSD
            </Heading>
          </HStack>
          <HStack width="100%" justifyContent="flex-end">
            <Button size="sm" variant="outline" color="white" onClick={flip}>
              <FontAwesomeIcon color="white" icon={faEllipsis} />
            </Button>
          </HStack>
        </HStack>

        <VStack alignItems="flex-start" w="100%">
          <HStack w="100%">
            <Text variant="title" w="100%" color="white">
              RSD available:
            </Text>
            <Text w="auto" fontSize="20px" variant="number" color="white">
              {availableCredit.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          </HStack>
          <HStack w="100%">
            <Text variant="title" w="100%" color="white">
              total credit limit:
            </Text>
            <Text w="auto" fontSize="20px" variant="number" color="white">
              {creditLimit.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          </HStack>
          <HStack w="100%" mt="-0.25em !important">
            <Text variant="caption" mt="0" w="100%" color="white">
              balance:
            </Text>
            <Text
              fontSize="12px"
              w="auto"
              variant="number"
              size="lg"
              color="white"
            >
              {balance.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
}
