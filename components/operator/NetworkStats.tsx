import {
  Box,
  Text,
  Stack,
  HStack,
  Button,
  Divider,
  IconButton,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { formatStableCredits } from "../../functions/bignumber"
import { useFetchMembers } from "../../hooks/useFetchMembers"
import { useRouter } from "next/router"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"

export const NetworkStats = () => {
  const { colorMode } = useColorMode()
  const stableCredit = useStableCreditContract()
  const feeManager = useFeeManagerContract()
  const [totalSupply, setTotalSupply] = useState(0)
  const [networkDebt, setNetworkDebt] = useState(0)
  const [avgFeeRate, setAvgFeeRate] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const handler = async () => {
      setTotalSupply(
        Number(formatStableCredits(await stableCredit.totalSupply())),
      )
      setNetworkDebt(
        Number(formatStableCredits(await stableCredit.networkDebt())),
      )
      setAvgFeeRate(Number(await feeManager.targetFeeRate()) / 10000)
    }
    if (stableCredit && feeManager) handler()
  }, [stableCredit, feeManager])

  const network = router.query.network as string

  const { network: networkData } = useFetchMembers({
    address: network || "",
    page: 1,
    limit: 1,
  })

  return (
    <>
      <Box
        borderRadius="xl"
        bg={colorMode === "light" ? "#e2e2e2" : "#262626"}
        w="full"
      >
        <Box
          borderTopRadius="lg"
          bg={colorMode === "light" ? "#ffffff" : "#3b3b3b"}
        >
          <HStack justifyContent="space-between" p="1em">
            <Text fontWeight="bold" variant="title" fontSize="2xl">
              NETWORK
            </Text>
          </HStack>
        </Box>
        <Stack>
          <Stack direction={{ md: "row", base: "column" }} alignSelf="center">
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {totalSupply.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text mt="0 !important">Total Supply</Text>
            </Stack>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {networkDebt.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text textAlign={"center"} mt="0 !important">
                Network Debt
              </Text>
            </Stack>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {avgFeeRate}%
              </Text>
              <Text textAlign={"center"} mt="0 !important">
                Target Fee
              </Text>
            </Stack>
          </Stack>
          <Stack
            placeContent="center"
            w="100%"
            direction={{ md: "row", base: "column" }}
            spacing="3em"
          >
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {Number(networkData?.totalMembers || 0)}
              </Text>
              <Text mt="0 !important">Members</Text>
            </Stack>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {networkData?.totalDefaults || 0}
              </Text>
              <Text mt="0 !important">
                Default{networkData?.totalDefaults > 1 ? "s" : ""}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
