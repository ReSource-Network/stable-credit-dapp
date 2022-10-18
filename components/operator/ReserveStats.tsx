import {
  Box,
  Text,
  Stack,
  HStack,
  Button,
  IconButton,
  useDisclosure,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react"
import {
  faArrowUpFromBracket,
  faGear,
  faInfoCircle,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SourceGlyphSolid } from "../Glyph"
import { VStack } from "@chakra-ui/react"
import { ReserveConfigModal } from "./ReserveConfigModal"
import { useReservePoolContract } from "../../hooks/useReservePoolContract"
import { useEffect, useState } from "react"
import { formatEther } from "@ethersproject/units"
import { useWithdrawOperator } from "../../hooks/useWithdrawOperator"
import { useDistributeFees } from "../../hooks/useDistributeFees"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"
export const ReserveStats = () => {
  const { colorMode } = useColorMode()

  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure()

  const reservePool = useReservePoolContract()
  const ƒeeManager = useFeeManagerContract()
  const { withdraw, loading } = useWithdrawOperator()
  const { distribute, loading: distributeLoading } = useDistributeFees()
  const [operatorBalance, setOperatorBalance] = useState(0)
  const [rtd, setRTD] = useState(0)
  const [fees, setFees] = useState(0)
  const [swapSink, setSwapSink] = useState(0)

  useEffect(() => {
    const handler = async () => {
      setOperatorBalance(
        Number(formatEther(await reservePool.operatorBalance())),
      )
      setRTD((await reservePool.RTD()).toNumber() / 10000)
      setSwapSink(Number(formatEther(await reservePool.swapSink())))
      setFees(Number(formatEther(await ƒeeManager.collectedFees())))
    }
    if (reservePool && ƒeeManager) handler()
  }, [reservePool, ƒeeManager])

  const handleDistribute = async () => {
    await distribute()
    setOperatorBalance(Number(formatEther(await reservePool.operatorBalance())))
    setRTD((await reservePool.RTD()).toNumber() / 10000)
    setSwapSink(Number(formatEther(await reservePool.swapSink())))
    setFees(Number(formatEther(await ƒeeManager.collectedFees())))
  }

  const handleWithdraw = async () => {
    await withdraw()
    setOperatorBalance(Number(formatEther(await reservePool.operatorBalance())))
  }

  return (
    <>
      <Box
        borderRadius="xl"
        bg={colorMode === "light" ? "#e2e2e2" : "#262626"}
        w={{ md: "auto", base: "100%" }}
      >
        <Box
          borderTopRadius="lg"
          bg={colorMode === "light" ? "#ffffff" : "#3b3b3b"}
        >
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
              <Button
                size="sm"
                onClick={handleWithdraw}
                isLoading={loading}
                leftIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
              >
                Withdraw
              </Button>
            </Stack>
          </Stack>
          {fees > 0 && (
            <Stack direction={{ md: "row", base: "column" }}>
              <Stack p="1em" alignItems="center" textAlign="center">
                <Text fontSize="24px" fontWeight="bold">
                  {fees.toLocaleString("en", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Text>
                <Text mt="0 !important">Fees</Text>
              </Stack>
              <Stack p="1em" alignItems="center" alignSelf="center">
                <Button
                  size="sm"
                  onClick={handleDistribute}
                  isLoading={distributeLoading}
                  leftIcon={<FontAwesomeIcon icon={faShareNodes} />}
                >
                  Distribute
                </Button>
              </Stack>
            </Stack>
          )}
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center" textAlign="center">
              <Text fontSize="24px" fontWeight="bold">
                {rtd.toString()}%
              </Text>
              <HStack>
                <Text mt="0 !important">RTD</Text>
                <Tooltip label="Reserve to Debt Ratio" aria-label="RTD">
                  <span>
                    <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                  </span>
                </Tooltip>
              </HStack>
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
