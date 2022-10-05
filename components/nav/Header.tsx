import {
  HStack,
  Center,
  Stack,
  useColorMode,
  Button,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Container, Image } from "@chakra-ui/react"
import { NavLogotypeButton } from "./logotype"
import { useAccount } from "wagmi"
import { ConnectKitButton } from "connectkit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

export const Header = () => {
  const { connector } = useAccount()
  const { colorMode, toggleColorMode } = useColorMode()
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Center position="fixed" w="100vw" zIndex="100">
      <Container maxW="container.xl" p={0}>
        <Stack
          p="1em"
          top={0}
          w="100%"
          zIndex={6}
          backdropFilter="blur(8px)"
          alignItems="center"
        >
          <HStack h={10} w="100%" justifyContent="space-between">
            <HStack>
              <NavLogotypeButton />
              <Button variant="ghost" onClick={toggleColorMode}>
                <FontAwesomeIcon
                  icon={colorMode === "light" ? faMoon : faSun}
                  size="lg"
                />
              </Button>
            </HStack>
            <HStack>
              <ConnectKitButton showBalance={true} />
            </HStack>
          </HStack>
        </Stack>
      </Container>
    </Center>
  )
}
