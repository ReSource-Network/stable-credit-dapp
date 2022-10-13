import {
  HStack,
  Center,
  Stack,
  useColorMode,
  Button,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react"
import { Container, Image, Link as ChakraLink } from "@chakra-ui/react"
import { NavLogotypeButton } from "./logotype"
import { useAccount, useSigner } from "wagmi"
import { ConnectKitButton } from "connectkit"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { useNetworkName } from "../../hooks/useNetworkName"
import { trimAddress } from "../../functions/address"
import { useRouter } from "next/router"
import Link from "next/link"
import {
  useGetNetworkAddresses,
  useFetchNetworkAddresses,
} from "../../state/networkAddresses/index"
import { useEffect } from "react"

export const Header = () => {
  const { connector } = useAccount()
  const { colorMode, toggleColorMode } = useColorMode()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const networkAddresses = useGetNetworkAddresses()
  const fetch = useFetchNetworkAddresses()
  const { name: networkName, loading } = useNetworkName()
  const trimmedAddress = trimAddress(networkAddresses.stableCredit || "", 4)
  const router = useRouter()

  useEffect(() => {
    const handler = async () => {
      await fetch()
    }
    handler()
  }, [router])

  return (
    <Center position="fixed" w="100vw" bgColor="#0000001d" zIndex="100">
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
              <Link href={`/${router.query.network}`} passHref>
                <ChakraLink>
                  <HStack>
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "xl", md: "2xl" }}
                      variant="title"
                      textDecoration="none !important"
                      textOverflow={{ base: "ellipsis", md: "initial" }}
                      overflow={{ base: "hidden", md: "initial" }}
                      whiteSpace={{ base: "nowrap", md: "initial" }}
                      maxW={{ sm: "initial", md: "initial", base: "4em" }}
                    >
                      {networkName}
                    </Text>
                    {!isMobile && (
                      <Text pt="6px" fontSize="lg" ml="5px" variant="title">
                        {trimmedAddress}
                      </Text>
                    )}
                  </HStack>
                </ChakraLink>
              </Link>
            </HStack>
            <HStack>
              <ConnectKitButton showBalance={isMobile ? false : true} />
              {!isMobile && connector?.id == "metaMask" && (
                <Image
                  src="/images/metamask.png"
                  ml="1em !important"
                  alt="metamask"
                  w="2em"
                />
              )}
            </HStack>
          </HStack>
        </Stack>
      </Container>
    </Center>
  )
}
