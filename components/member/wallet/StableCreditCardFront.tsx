import { Box, BoxProps, Heading } from "@chakra-ui/layout"
import {
  Button,
  HStack,
  Image,
  SkeletonCircle,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PillPity from "pill-pity"
import { useAccount } from "wagmi"

const innerStyles: BoxProps = {
  p: 6,
  bgColor: "gray",
  borderRadius: "inherit",
  h: "full",
}

const defaultStyles: BoxProps = {
  h: "full",
  borderRadius: "2xl",
  bg: "gray",
}

interface Props extends BoxProps {
  symbol: string
  balance: number
  flip: () => void
}

export const StableCreditCardFront = ({ flip, symbol, ...rest }: Props) => {
  return (
    <Box {...defaultStyles} {...rest}>
      <VStack
        {...innerStyles}
        borderRadius="14px"
        justify="space-between"
        align="start"
        position="relative"
        overflow="hidden"
      >
        <HStack
          position="absolute"
          opacity=".7"
          marginTop="-3em"
          right="1.5em"
          bottom="2em"
        >
          <Image
            w="6em"
            src={"/images/resource-white.svg"}
            alt="Nothing found"
          />
        </HStack>
        <HStack width="100%" left="1.5em" top="7em" pos="absolute">
          <PillPity
            w="3em"
            h="2em"
            pattern="circuit-board"
            as={Box}
            justify="center"
            align="center"
            pill="black"
            backgroundSize="100px"
            bgColor="#b0afaf"
            borderRadius={"5px"}
          />
        </HStack>
        <HStack
          position="absolute"
          width="100%"
          paddingRight="3em"
          justifyContent="flex-end"
        >
          <Button size="sm" variant="outline" color="gray.100" onClick={flip}>
            <FontAwesomeIcon icon={faEllipsis} />
          </Button>
        </HStack>
        <HStack>
          <HStack mr={2}>
            {/* <RSDGlyphGradient purple={false} boxSize="40px" /> */}
            <Heading size="header" color="white">
              {symbol}
            </Heading>
          </HStack>
          <Box mx={3} w="1px" bg={"gray"} height="36px" />
        </HStack>
      </VStack>
    </Box>
  )
}
