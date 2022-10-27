import { Box, BoxProps, HStack, Text } from "@chakra-ui/layout"
import { Progress, Stack, Tooltip, VStack } from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useGetMember } from "../../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import { useInterval } from "react-use"

export const TermBar = () => {
  const { address } = useAccount()
  const { member, getMember } = useGetMember()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      await getMember(address)
    }
    if (address) handler()
  }, [getMember, address])

  useInterval(() => {
    const handler = async () => {
      if (!address) return
      await getMember(address)
    }
    if (address) handler()
  }, 100000)

  const now = new Date()

  const daysToPastDue =
    Math.ceil(
      ((member?.pastDue.getTime() || now.getTime()) - now.getTime()) /
        (1000 * 3600 * 24),
    ) || 0

  const daysToDefault =
    Math.ceil(
      ((member?.default.getTime() || now.getTime()) - now.getTime()) /
        (1000 * 3600 * 24),
    ) || 0

  const daysInPeriod =
    Math.ceil(
      (member?.default?.getTime()! - member?.issued?.getTime()!) /
        (1000 * 3600 * 24),
    ) || 0

  const daysPassed =
    Math.ceil(
      (now.getTime()! - member?.issued?.getTime()!) / (1000 * 3600 * 24),
    ) || 0

  const nearPastDue = daysToPastDue <= 1
  const nearDefault = daysToDefault <= 1

  const isPastDue = daysToPastDue <= 0
  const inDefault = daysToDefault <= 0

  const color = !!isPastDue ? "yellow" : !!inDefault ? "red" : "gray"

  let pastDuePercent = Math.abs((daysToPastDue / daysInPeriod) * 100) || 0
  let defaultPercent = Math.abs((daysToDefault / daysInPeriod) * 100) || 0
  let nowPercent = Math.abs((daysPassed / daysInPeriod) * 100) || 0

  console.log("days to default: ", daysToDefault)
  console.log("days to past due: ", daysToPastDue)
  console.log("total days: ", daysInPeriod)

  console.log(pastDuePercent)
  console.log(defaultPercent)
  console.log(nowPercent)

  return (
    <Box
      p={"1.5em"}
      mt="1em !important"
      backgroundColor="gray"
      borderRadius="1em"
    >
      <Box mb="2em" backgroundColor="gray" borderRadius="1em">
        <Stack>
          <Text ml={1} color="white">
            Credit Terms
          </Text>

          <Progress mt={3} colorScheme={color} value={nowPercent} />

          <Stack
            zIndex={5}
            alignItems={"flex-end"}
            h="1em"
            mt="-18px !important"
            width={`${pastDuePercent}%`}
            bgColor="transparent"
          >
            <Tooltip
              label={`${daysToPastDue} days till past due. Zero out your account within this time to avoid freezing your credit line.`}
              aria-label="Past Due Date"
            >
              <span>
                <FontAwesomeIcon
                  opacity=".7"
                  color="yellow"
                  size="md"
                  icon={faClock}
                />
              </span>
            </Tooltip>
          </Stack>
          <Stack
            alignItems={"flex-end"}
            zIndex={1}
            h="1em"
            mt="-16px !important"
            width={"100%"}
            bgColor="transparent"
          >
            <Tooltip
              label={`${daysToDefault} days till default. A default results in a credit reset and a negative impact on your credit reputation`}
              aria-label="Expiration Date"
            >
              <span>
                <FontAwesomeIcon
                  opacity=".7"
                  color="red"
                  size="md"
                  icon={faClock}
                />
              </span>
            </Tooltip>
          </Stack>
        </Stack>
        <Box />
      </Box>
    </Box>
  )
}
