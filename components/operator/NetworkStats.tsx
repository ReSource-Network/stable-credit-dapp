import {
  Box,
  Text,
  Stack,
  HStack,
  Button,
  Divider,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { NetworkConfigModal } from "./NetworkConfigModal"
import { formatStableCredits } from "../../functions/bignumber"
import { ManageMember } from "../../hooks/useGetMember"

export const NetworkStats = () => {
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure()

  const stableCredit = useStableCreditContract()
  const [totalSupply, setTotalSupply] = useState(0)
  const [networkDebt, setNetworkDebt] = useState(0)

  useEffect(() => {
    const handler = async () => {
      setTotalSupply(
        Number(formatStableCredits(await stableCredit.totalSupply())),
      )
      setNetworkDebt(
        Number(formatStableCredits(await stableCredit.networkDebt())),
      )
    }
    if (stableCredit) handler()
  }, [stableCredit])

  const memberCount = 1000

  return (
    <>
      <Box borderRadius="xl" bg={"#e2e2e2"} color="#1a202c" w="full">
        <Box bg={"white"} borderTopRadius="lg" border="1px solid #e2e2e2">
          <HStack justifyContent="space-between" p="1em">
            <Text fontWeight="bold" variant="title" fontSize="2xl">
              NETWORK
            </Text>
            <IconButton
              aria-label="configure"
              size="sm"
              onClick={onConfigOpen}
              icon={<FontAwesomeIcon icon={faGear} />}
            />
          </HStack>
        </Box>
        <Stack>
          <Stack direction={{ md: "row", base: "column" }} alignSelf="center">
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {memberCount.toLocaleString("en")}
              </Text>
              <Text mt="0 !important">Members</Text>
            </Stack>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {totalSupply.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text mt="0 !important">Total Supply</Text>
            </Stack>
          </Stack>
          <Stack alignSelf="center" direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                {networkDebt.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text mt="0 !important">Network Debt</Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <NetworkConfigModal onClose={onConfigClose} isOpen={isConfigOpen}>
        <></>
      </NetworkConfigModal>
    </>
  )
}
