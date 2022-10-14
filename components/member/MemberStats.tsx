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
          <Text fontWeight="bold" fontSize="4xl" variant="title">
            {member?.balance.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          {member && member.creditLimit > 0 && (
            <HStack>
              <Text
                fontSize="lg"
                mt="0 !important"
                alignSelf="center"
                opacity=".5"
              >
                Credit Limit:{" "}
                {member?.creditLimit.toLocaleString("en", {
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
                <FeeTokenBalance />
                <HStack>
                  {nearPastDue && (
                    <FontAwesomeIcon
                      color="yellow"
                      size="sm"
                      icon={faTriangleExclamation}
                    />
                  )}{" "}
                  <Text>past due:</Text>
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
                  <Text>default:</Text>
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
            </Collapse>
          </>
        )}
      </Fade>
    </Stack>
  )
}
