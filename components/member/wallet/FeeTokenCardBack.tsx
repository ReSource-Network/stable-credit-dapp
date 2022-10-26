import { Box, BoxProps, Heading, Text } from "@chakra-ui/layout"
import {
  Button,
  HStack,
  Image,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FeeTokenBalance } from "../FeeTokenBalance"

const innerStyles: BoxProps = {
  p: 6,
  bgColor: "gray.100",
  borderRadius: "inherit",
  h: "full",
}

const defaultStyles: BoxProps = {
  h: "full",
  borderRadius: "2xl",
}

interface Props extends BoxProps {
  flip: () => void
  feeTokenBalance: number
  symbol: string
}

export const FeeTokenCardBack = ({
  flip,
  feeTokenBalance,
  symbol,
  ...rest
}: Props) => {
  return (
    <Box {...defaultStyles} {...rest}>
      <HStack width="100%" left="0" top="1.5em" pos="absolute">
        <Box
          zIndex={1}
          width="100%"
          bgColor="gray"
          h={{ md: "3em", base: "2em" }}
        ></Box>
      </HStack>
      <VStack
        {...innerStyles}
        borderRadius="14px"
        justify="space-between"
        align="start"
        position="relative"
        overflow="hidden"
      >
        <HStack zIndex={1} w="100%" mt={".5em !important"}>
          <HStack>
            <Heading color="white" size="header">
              {symbol}
            </Heading>
          </HStack>
          <HStack width="100%" justifyContent="flex-end">
            <Button color="white" size="sm" variant="outline" onClick={flip}>
              <FontAwesomeIcon color="black.900" icon={faEllipsis} />
            </Button>
          </HStack>
        </HStack>

        <HStack w="100%">
          <Text color="black" variant="title" w="100%">
            {symbol} Balance
          </Text>

          <Text color="black">
            {feeTokenBalance.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
