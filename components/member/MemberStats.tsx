import {
  HStack,
  Collapse,
  Tooltip,
  Button,
  useDisclosure,
  VStack,
  Fade,
} from "@chakra-ui/react"
import { Stack, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
export const MemberStats = () => {
  const { isOpen: isInfoOpen, onToggle: onInfoToggle } = useDisclosure()
  const router = useRouter()
  const network = router.query.network as string
  const balance = 1023.3
  const limit = 1000
  const pastDueDate = new Date("Jan 22 2023")
  const defaultDate = new Date("Feb 22 2023")

  return (
    <Stack w="100%">
      <Fade in={true} delay={0.5}>
        <Stack alignItems="center" w="100%">
          <Text fontWeight="bold" fontSize="4xl" variant="title">
            {balance.toLocaleString("en", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <HStack>
            <Text
              fontSize="lg"
              mt="0 !important"
              alignSelf="center"
              opacity=".5"
            >
              Credit Limit:{" "}
              {limit.toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          </HStack>
        </Stack>
        <Stack>
          <Button
            aria-label="info"
            onClick={onInfoToggle}
            justifyContent="center"
            variant="ghost"
            backgroundColor="transparent !important"
            size="sm"
            rightIcon={
              <FontAwesomeIcon icon={isInfoOpen ? faCaretUp : faCaretDown} />
            }
          >
            {isInfoOpen ? "Less" : "More"}
          </Button>
        </Stack>
        <Collapse in={isInfoOpen} animateOpacity>
          <VStack opacity=".5">
            <HStack>
              <Text>Past Due Date:</Text>
              <Text>
                {pastDueDate.toLocaleString("en", {
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
                {defaultDate.toLocaleString("en", {
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
      </Fade>
    </Stack>
  )
}
