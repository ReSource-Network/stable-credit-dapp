import { Box, BoxProps, HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, Collapse, Link, useColorMode } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FlippableContainer } from "./FlippableContainer"
import { ReferenceTokenCardBack } from "./ReferenceTokenCardBack"
import { ReferenceTokenCardFront } from "./ReferenceTokenCardFront"
import { useAccount } from "wagmi"
import { useReferenceTokenContract } from "../../../hooks/useReferenceTokenContract"
import { useStableCreditContract } from "../../../hooks/useStableCreditContract"
import { formatEther } from "ethers/lib/utils"
import { useInterval } from "../../../hooks/useInterval"
import { useGetTransactions } from "../../../state"

interface Props extends BoxProps {
  showReferenceToken: boolean
  setShowReferenceToken: (val: boolean) => void
}

export const ReferenceTokenCard = ({
  showReferenceToken,
  setShowReferenceToken,
  ...rest
}: Props) => {
  const flipCard = () => setShowReferenceToken(!showReferenceToken)

  const [referenceTokenSymbol, setReferenceTokenSymbol] = useState("")
  const [referenceTokenBalance, setReferenceTokenBalance] = useState(0)
  const [stableCreditSymbol, setStableCreditSymbol] = useState("")
  const referenceToken = useReferenceTokenContract()
  const stableCredit = useStableCreditContract()
  const { address } = useAccount()
  const { colorMode } = useColorMode()
  const transactions = useGetTransactions()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setReferenceTokenSymbol(await referenceToken.symbol())
      setReferenceTokenBalance(
        Number(formatEther(await referenceToken.balanceOf(address))),
      )
      setStableCreditSymbol(await stableCredit.symbol())
    }
    if (address && referenceToken && stableCredit) handler()
  }, [address, referenceToken, stableCredit, transactions])

  useInterval(() => {
    const handler = async () => {
      if (!address) return
      setReferenceTokenSymbol(await referenceToken.symbol())
      setReferenceTokenBalance(
        Number(formatEther(await referenceToken.balanceOf(address))),
      )
      setStableCreditSymbol(await stableCredit.symbol())
    }
    if (address && referenceToken && stableCredit) handler()
  }, 5000)

  return (
    <>
      <Box {...rest} minW={{ base: "none", md: "350px" }}>
        <FlippableContainer
          back={
            <ReferenceTokenCardBack
              referenceTokenBalance={referenceTokenBalance}
              symbol={referenceTokenSymbol}
              flip={flipCard}
            />
          }
          front={
            <ReferenceTokenCardFront
              symbol={referenceTokenSymbol}
              flip={flipCard}
            />
          }
          showFront={!showReferenceToken}
          setShowFront={flipCard}
        />
      </Box>
      <Collapse style={{ width: "100%" }} in={showReferenceToken}>
        <VStack w="100%" mt="1em">
          <VStack
            border="2px solid"
            borderColor={colorMode === "light" ? "gray" : "gray.200"}
            borderRadius="1em"
            padding="1em"
          >
            <Text>
              Use{" "}
              <span style={{ fontWeight: "bold" }}>{referenceTokenSymbol}</span>{" "}
              to pay for transaction fees or repay your credit balance in the{" "}
              <span style={{ fontWeight: "bold" }}>{stableCreditSymbol}</span>{" "}
              network. Fees are pooled together in a network reserve to
              strengthen the network.
            </Text>
            {/* <HStack w="100%" justifyContent="flex-end" mt="1em !important">
              <Link
                textDecoration="none !important"
                target="_blank"
                href={"https://app.resource.finance"}
              >
                <Button colorScheme="primary" size="sm" variant="outline">
                  Stake SOURCE
                </Button>
              </Link>
              <Link
                textDecoration="none !important"
                target="_blank"
                href={"https://resource.finance/how-it-works#get-source"}
              >
                <Button colorScheme="primary" size="sm" variant="outline">
                  Buy SOURCE
                </Button>
              </Link>
            </HStack> */}
          </VStack>
        </VStack>
      </Collapse>
    </>
  )
}
