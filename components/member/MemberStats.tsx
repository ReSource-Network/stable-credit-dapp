import {
  HStack,
  Collapse,
  Tooltip,
  Button,
  useDisclosure,
  VStack,
  Fade,
  Divider,
  useColorMode,
} from "@chakra-ui/react"
import { Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react"
import { ManageMember } from "../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { FeeTokenBalance } from "./FeeTokenBalance"

export const MemberStats = ({ getMember, member }: ManageMember) => {
  const { isOpen: isInfoOpen, onToggle: onInfoToggle } = useDisclosure()
  const { address } = useAccount()
  const { colorMode } = useColorMode()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      await getMember(address)
    }
    if (address) handler()
  }, [getMember, address])

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

  const nearPastDue = daysToPastDue <= 1
  const nearDefault = daysToDefault <= 1

  return (
    <Stack w="100%">
      <Fade in={true} delay={0.1}>
        <Stack alignItems="center" w="100%">
          <HStack>
            <Text fontSize={"lg"} opacity={".5"} mt="12px">
              Available:
            </Text>
            <Text fontWeight="bold" fontSize="4xl" variant="title">
              {member?.available.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          </HStack>
          {member && (
            <HStack mt="0 !important">
              <Text
                fontSize="lg"
                mt="0 !important"
                alignSelf="center"
                opacity=".5"
                fontWeight={"bold"}
              >
                <span style={{ fontWeight: "initial" }}>Balance: </span>
                {member?.balance.toLocaleString("en", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
            </HStack>
          )}
        </Stack>
        {member && member.creditLimit > 0 && (
          <>
            <Stack>
              <Button
                aria-label="info"
                onClick={onInfoToggle}
                justifyContent="center"
                variant="ghost"
                backgroundColor="transparent !important"
                size="sm"
                rightIcon={
                  <FontAwesomeIcon
                    icon={isInfoOpen ? faCaretUp : faCaretDown}
                  />
                }
              >
                {isInfoOpen ? "Less" : "More"}
              </Button>
            </Stack>
            <Collapse in={isInfoOpen} animateOpacity>
              <VStack
                bg={colorMode === "light" ? "#e2e2e2" : "#373737"}
                borderRadius="xl"
                py=".5em"
              >
                <Stack
                  direction={{ md: "row", base: "column" }}
                  w="100%"
                  p="1em"
                  justifyContent={"space-between"}
                >
                  <VStack>
                    <HStack alignSelf={{ md: "flex-start", base: "center" }}>
                      <Text fontSize={"lg"}>Credit Limit:</Text>
                      <Text fontWeight="bold" fontSize="lg" variant="title">
                        {member?.creditLimit.toLocaleString("en", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </HStack>
                    <FeeTokenBalance />
                  </VStack>
                  <Divider
                    display={{ md: "initial", base: "none" }}
                    orientation="vertical"
                    h="3em"
                  />
                  <VStack
                    alignItems={{ md: "flex-end", base: "center" }}
                    whiteSpace="nowrap"
                  >
                    <HStack whiteSpace="nowrap">
                      {nearPastDue && (
                        <FontAwesomeIcon
                          color="yellow"
                          size="sm"
                          icon={faTriangleExclamation}
                        />
                      )}{" "}
                      <Text>Past Due:</Text>
                      <Text>
                        {daysToPastDue.toLocaleString("en")} days{" "}
                        <Tooltip
                          label="Zero out your account within this time to avoid freezing your credit line."
                          aria-label="Past Due Date"
                        >
                          <span>
                            <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                          </span>
                        </Tooltip>
                      </Text>
                    </HStack>
                    <HStack>
                      {nearDefault && (
                        <FontAwesomeIcon
                          color="yellow"
                          size="sm"
                          icon={faTriangleExclamation}
                        />
                      )}{" "}
                      <Text>Default:</Text>
                      <Text>
                        {daysToDefault.toLocaleString("en")} days{" "}
                        <Tooltip
                          label="A default results in a credit reset and a negative impact on your credit reputation"
                          aria-label="Expiration Date"
                        >
                          <span>
                            <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                          </span>
                        </Tooltip>
                      </Text>
                    </HStack>
                  </VStack>
                </Stack>
              </VStack>
            </Collapse>
          </>
        )}
      </Fade>
    </Stack>
  )
}
