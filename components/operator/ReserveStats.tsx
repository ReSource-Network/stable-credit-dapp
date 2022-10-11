import {
  Box,
  Text,
  Stack,
  HStack,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { faArrowUpFromBracket, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SourceGlyphSolid } from "../Glyph"
import { VStack, LightMode } from "@chakra-ui/react"
import { ReserveConfigModal } from "./ReserveConfigModal"
import { useReservePoolContract } from "../../hooks/useReservePoolContract"
import { useEffect, useState } from "react"
import { formatEther } from "@ethersproject/units"
export const ReserveStats = () => {
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure()

  const reservePool = useReservePoolContract()
  const [operatorBalance, setOperatorBalance] = useState(0)
  const [ltv, setLTV] = useState(0)
  const [swapSink, setSwapSink] = useState(0)

  useEffect(() => {
    const handler = async () => {
      setOperatorBalance(
        Number(formatEther(await reservePool.operatorBalance())),
      )
      setLTV((await reservePool.LTV()).toNumber() / 10000)
      setSwapSink(Number(formatEther(await reservePool.swapSink())))
    }
    if (reservePool) handler()
  }, [reservePool])

  return (
    <>
      <Box
        borderRadius="xl"
        bg={"#e2e2e2"}
        color="#1a202c"
        w={{ md: "auto", base: "100%" }}
      >
        <Box bg={"white"} borderTopRadius="lg" border="1px solid #e2e2e2">
          <HStack justifyContent="space-between" p="1em">
            <Text fontWeight="bold" variant="title" fontSize="2xl">
              RESERVE
            </Text>
            <IconButton
              aria-label="configure"
              size="sm"
              onClick={onConfigOpen}
              icon={<FontAwesomeIcon icon={faGear} />}
            />
          </HStack>
        </Box>
        <VStack p="1em">
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center" textAlign="center">
              <Text fontSize="24px" fontWeight="bold">
                {operatorBalance.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text mt="0 !important">Operator</Text>
            </Stack>
            <Stack p="1em" alignItems="center" alignSelf="center">
              <LightMode>
                <Button
                  size="sm"
                  leftIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
                >
                  Withdraw
                </Button>
              </LightMode>
            </Stack>
          </Stack>
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center" textAlign="center">
              <Text fontSize="24px" fontWeight="bold">
                {ltv.toString()}%
              </Text>
              <Text mt="0 !important">LTV</Text>
            </Stack>
            <Stack p="1em" alignItems="center" textAlign="center">
              <HStack textAlign="center">
                <SourceGlyphSolid />
                <Text fontSize="24px" fontWeight="bold">
                  {swapSink.toLocaleString("en")}
                </Text>
              </HStack>
              <Text mt="0 !important">Swap Sink</Text>
            </Stack>
          </Stack>
        </VStack>
      </Box>
      <ReserveConfigModal onClose={onConfigClose} isOpen={isConfigOpen}>
        <></>
      </ReserveConfigModal>
    </>
  )
}
