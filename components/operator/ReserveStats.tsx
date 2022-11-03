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
  Progress,
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
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

export const ReserveStats = () => {
  const { colorMode } = useColorMode()

  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure()

  const reservePool = useReservePoolContract()
  const feeManager = useFeeManagerContract()
  const feeToken = useFeeTokenContract()
  const { withdraw, loading } = useWithdrawOperator()
  const { distribute, loading: distributeLoading } = useDistributeFees()
  const [operatorBalance, setOperatorBalance] = useState(0)
  const [rtd, setRTD] = useState(0)
  const [targetRTD, setTargetRTD] = useState(0)
  const [fees, setFees] = useState(0)
  const [swapSink, setSwapSink] = useState(0)

  useEffect(() => {
    const handler = async () => {
      setOperatorBalance(
        Number(formatEther(await reservePool.operatorBalance())),
      )
      setRTD((await reservePool.RTD()).toNumber() / 10000)
      setTargetRTD((await reservePool.targetRTD()).toNumber() / 10000)
      setSwapSink(
        Number(
          formatEther(await feeToken.balanceOf(await reservePool.swapSink())),
        ),
      )
      setFees(Number(formatEther(await feeManager.collectedFees())))
    }
    if (reservePool && feeManager) handler()
  }, [reservePool, feeManager])

  const handleDistribute = async () => {
    await distribute()
    setOperatorBalance(Number(formatEther(await reservePool.operatorBalance())))
    setRTD((await reservePool.RTD()).toNumber() / 10000)
    setSwapSink(
      Number(
        formatEther(await feeToken.balanceOf(await reservePool.swapSink())),
      ),
    )
    setFees(Number(formatEther(await feeManager.collectedFees())))
  }

  const handleWithdraw = async () => {
    await withdraw()
    setOperatorBalance(Number(formatEther(await reservePool.operatorBalance())))
  }

  const rtdPercent = rtd === 0 ? 0 : (rtd / targetRTD) * 75

  return (
    <>
      <Box
        borderRadius="xl"
        bg={colorMode === "light" ? "#e2e2e2" : "#262626"}
        w={{ md: "25em", base: "100%" }}
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
          <Stack spacing="1em" w="100%">
            <HStack w="100%">
              <VStack
                mt="35px"
                height={"full"}
                placeItems="flex-start"
                spacing="1.5em"
              >
                <Text>RTD</Text>
                <Text>Revenue</Text>
                <Text>Swap</Text>
              </VStack>
              <VStack w="100%" alignItems={"flex-start"}>
                <Tooltip
                  hasArrow
                  placement="top"
                  label={"Target Reserve to Debt Ratio"}
                  aria-label="Target RTD"
                >
                  <Stack
                    alignSelf={"flex-end"}
                    mr="24%"
                    h="40px"
                    alignItems={"flex-end"}
                    zIndex={1000}
                    mb="-10px"
                  >
                    <Stack mr="-12px" alignItems="center">
                      <Text
                        lineHeight={1}
                        textAlign="center"
                        mt="0 !important"
                        fontWeight={"extrabold"}
                        fontSize="sm"
                      >
                        {targetRTD}%
                      </Text>
                      <Text
                        lineHeight={1}
                        textAlign="center"
                        mt="0 !important"
                        fontWeight={"bold"}
                        fontSize="9px"
                        pb="1px"
                      >
                        target
                      </Text>
                      <FontAwesomeIcon
                        style={{ marginTop: "-4px" }}
                        icon={faCaretDown}
                      />
                      <Box
                        mt="0 !important"
                        w="6px"
                        h="45px"
                        backgroundColor={
                          colorMode === "dark" ? "white" : "black"
                        }
                        borderRadius={"3px"}
                      />
                    </Stack>
                  </Stack>
                </Tooltip>
                <Tooltip
                  hasArrow
                  placement="top"
                  label={rtd + "%"}
                  aria-label="RTD"
                >
                  <span style={{ width: "100%" }}>
                    <Progress
                      w="100%"
                      borderRadius={"lg"}
                      value={rtdPercent}
                      height="40px"
                      backgroundColor={
                        colorMode === "dark" ? "#353535" : "#f1f1f1"
                      }
                      colorScheme={rtd >= targetRTD ? "gray" : "yellow"}
                    />
                  </span>
                </Tooltip>
                <Tooltip
                  hasArrow
                  placement="right"
                  label={operatorBalance.toLocaleString("en", {
                    style: "currency",
                    currency: "USD",
                  })}
                  aria-label="operator"
                >
                  <span style={{ width: "50%" }}>
                    <Progress
                      backgroundColor="transparent"
                      w="100%"
                      borderRadius={"lg"}
                      value={
                        operatorBalance === 0
                          ? 5
                          : operatorBalance >= swapSink
                          ? 100
                          : 50
                      }
                      height="40px"
                      colorScheme={"green"}
                    />
                  </span>
                </Tooltip>
                <Tooltip
                  hasArrow
                  placement="bottom"
                  label={swapSink.toLocaleString("en", {
                    style: "currency",
                    currency: "USD",
                  })}
                  aria-label="RTD"
                >
                  <span style={{ width: "50%" }}>
                    <Progress
                      w="100%"
                      backgroundColor="transparent"
                      borderRadius={"lg"}
                      value={
                        swapSink === 0
                          ? 5
                          : swapSink >= operatorBalance
                          ? 100
                          : 12
                      }
                      height="40px"
                      colorScheme={"pink"}
                    />
                  </span>
                </Tooltip>
              </VStack>
            </HStack>
          </Stack>
          {fees > 0 && (
            <Stack w="100%" direction={{ md: "row", base: "column" }}>
              <HStack pt="1em" alignItems="center" textAlign="center">
                <Button
                  size="sm"
                  mr="1em"
                  onClick={handleDistribute}
                  isLoading={distributeLoading}
                  leftIcon={<FontAwesomeIcon icon={faShareNodes} />}
                >
                  Distribute
                </Button>
                <Text fontSize="24px" fontWeight="bold">
                  {fees.toLocaleString("en", {
                    style: "currency",
                    currency: "USD",
                  })}
                  <span style={{ fontSize: "14px", fontWeight: "initial" }}>
                    {" "}
                    Fees
                  </span>
                </Text>
              </HStack>
            </Stack>
          )}
          <Stack w="100%" direction={{ md: "row", base: "column" }}>
            <HStack py="1em" alignItems="center" textAlign="center">
              <Button
                size="sm"
                mr="1em"
                onClick={handleWithdraw}
                isLoading={loading}
                leftIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
              >
                Withdraw
              </Button>
              <Text fontSize="24px" fontWeight="bold">
                {operatorBalance.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
                <span style={{ fontSize: "14px", fontWeight: "initial" }}>
                  {" "}
                  Fees
                </span>
              </Text>
            </HStack>
          </Stack>
        </VStack>
      </Box>
      <ReserveConfigModal onClose={onConfigClose} isOpen={isConfigOpen}>
        <></>
      </ReserveConfigModal>
    </>
  )
}
