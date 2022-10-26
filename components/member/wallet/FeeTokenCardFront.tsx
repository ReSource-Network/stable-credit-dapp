import { Box, BoxProps, Heading, Text } from "@chakra-ui/layout"
import {
  Button,
  HStack,
  Image,
  SkeletonCircle,
  useBreakpointValue,
  useClipboard,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PillPity from "pill-pity"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useFeeTokenContract } from "../../../hooks/useFeeTokenContract"

const innerStyles: BoxProps = {
  p: 6,
  bgColor: "gray.100",
  borderRadius: "inherit",
  border: "7px solid gray",
  h: "full",
}

const defaultStyles: BoxProps = {
  p: "2px",
  h: "full",
  borderRadius: "2xl",
}

interface Props extends BoxProps {
  flip: () => void
  symbol: string
}

export const FeeTokenCardFront = ({ flip, symbol, ...rest }: Props) => {
  const { colorMode } = useColorMode()

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
          opacity=".2"
          zIndex="0"
          marginTop="-3em"
          right="-30px"
        ></HStack>
        <HStack
          position="absolute"
          opacity=".7"
          marginTop="-3em"
          right="1.5em"
          bottom="2em"
        >
          <Image
            color="black"
            w="6em"
            src={"/images/resource-black.svg"}
            alt="Nothing found"
          />
        </HStack>
        <HStack
          position="absolute"
          width="100%"
          paddingRight="3em"
          justifyContent="flex-end"
        >
          <Button size="sm" variant="outline" color="black" onClick={flip}>
            <FontAwesomeIcon color="black" icon={faEllipsis} />
          </Button>
        </HStack>
        <HStack>
          <HStack>
            <Heading size="header" color="black">
              {symbol}
            </Heading>
          </HStack>
        </HStack>
        <HStack></HStack>
      </VStack>
    </Box>
  )
}
