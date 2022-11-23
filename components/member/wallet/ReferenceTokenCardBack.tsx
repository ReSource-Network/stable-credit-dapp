import { Box, BoxProps, Heading, Text } from "@chakra-ui/layout"
import {
  Button,
  HStack,
  Image,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "@chakra-ui/react"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReferenceTokenBalance } from "../ReferenceTokenBalance"

const defaultStyles: BoxProps = {
  h: "full",
  borderRadius: "2xl",
}

interface Props extends BoxProps {
  flip: () => void
  referenceTokenBalance: number
  symbol: string
}

export const ReferenceTokenCardBack = ({
  flip,
  referenceTokenBalance,
  symbol,
  ...rest
}: Props) => {
  const { colorMode } = useColorMode()

  const innerStyles: BoxProps = {
    p: 6,
    bgColor: colorMode === "light" ? "gray.900" : "gray.100",
    borderRadius: "inherit",
    h: "full",
  }
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
          <Text
            color={colorMode === "light" ? "white" : "black"}
            variant="title"
            w="100%"
          >
            {symbol} Balance
          </Text>

          <Text color={colorMode === "light" ? "white" : "black"}>
            {referenceTokenBalance.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}
