import { Box, BoxProps, HStack, Text, VStack } from "@chakra-ui/layout"
import { Button, Collapse, Link, useColorMode } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FlippableContainer } from "./FlippableContainer"
import { FeeTokenCardBack } from "./FeeTokenCardBack"
import { FeeTokenCardFront } from "./FeeTokenCardFront"
import { useAccount } from "wagmi"
import { useFeeTokenContract } from "../../../hooks/useFeeTokenContract"
import { useStableCreditContract } from "../../../hooks/useStableCreditContract"
import { formatEther } from "ethers/lib/utils"

interface Props extends BoxProps {
  showFeeToken: boolean
  setShowFeeToken: (val: boolean) => void
}

export const FeeTokenCard = ({
  showFeeToken,
  setShowFeeToken,
  ...rest
}: Props) => {
  const flipCard = () => setShowFeeToken(!showFeeToken)

  const [feeTokenSymbol, setFeeTokenSymbol] = useState("")
  const [feeTokenBalance, setFeeTokenBalance] = useState(0)
  const [stableCreditSymbol, setStableCreditSymbol] = useState("")
  const feeToken = useFeeTokenContract()
  const stableCredit = useStableCreditContract()
  const { address } = useAccount()
  const { colorMode } = useColorMode()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setFeeTokenSymbol(await feeToken.symbol())
      setFeeTokenBalance(Number(formatEther(await feeToken.balanceOf(address))))
      setStableCreditSymbol(await stableCredit.symbol())
    }
    if (address && feeToken && stableCredit) handler()
  }, [address, feeToken, stableCredit])

  return (
    <>
      <Box {...rest} minW={{ base: "none", md: "350px" }}>
        <FlippableContainer
          back={
            <FeeTokenCardBack
              feeTokenBalance={feeTokenBalance}
              symbol={feeTokenSymbol}
              flip={flipCard}
            />
          }
          front={<FeeTokenCardFront symbol={feeTokenSymbol} flip={flipCard} />}
          showFront={!showFeeToken}
          setShowFront={flipCard}
        />
      </Box>
      <Collapse style={{ width: "100%" }} in={showFeeToken}>
        <VStack w="100%" mt="1em">
          <VStack
            border="2px solid"
            borderColor={colorMode === "light" ? "gray" : "gray.200"}
            borderRadius="1em"
            padding="1em"
          >
            <Text>
              Use <span style={{ fontWeight: "bold" }}>{feeTokenSymbol}</span>{" "}
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
