import {
  HStack,
  Collapse,
  Tooltip,
  Button,
  useDisclosure,
  VStack,
  Fade,
  LightMode,
} from "@chakra-ui/react"
import { Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { ManageMember, useGetMember } from "../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { FeeTokenBalance } from "./FeeTokenBalance"

export const MemberStats = ({ getMember, member }: ManageMember) => {
  const { isOpen: isInfoOpen, onToggle: onInfoToggle } = useDisclosure()
  const { address } = useAccount()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      await getMember(address)
    }
    if (address && !member) handler()
  }, [getMember, address])

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
              <LightMode>
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
              </LightMode>
            </Stack>
            <Collapse in={isInfoOpen} animateOpacity>
              <VStack opacity=".5">
                <FeeTokenBalance />
                <HStack>
                  <Text>Past Due Date:</Text>
                  <Text>
                    {member?.pastDue.toLocaleString("en", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    <Tooltip
                      label="Zero out your account by this date to avoid freezing your credit line."
                      aria-label="Past Due Date"
                    >
                      <span>
                        <FontAwesomeIcon size="sm" icon={faInfoCircle} />
                      </span>
                    </Tooltip>
                  </Text>
                </HStack>
                <HStack>
                  <Text>Default Date:</Text>
                  <Text>
                    {member?.default.toLocaleString("en", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
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
