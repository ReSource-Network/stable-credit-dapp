import {
  Container,
  Flex,
  Text,
  Box,
  Button,
  Center,
  useColorModeValue,
  useBreakpointValue,
  Link as ChakraLink,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { Divider, Stack, Spinner } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGears, faUser } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useNetworkAddresses } from "../../hooks/useNetworkAddresses"
import Link from "next/link"

export const NetworkHomePage: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const boxColor = useColorModeValue("#18202b", "white")
  const textColor = useColorModeValue("white", "#18202b")
  const router = useRouter()
  const { loading, valid } = useNetworkAddresses()

  if (!valid)
    return (
      <Flex width="100%" mt="5em" justifyContent="center">
        <Container maxW="container.xl" mt="25vh" p={0}>
          <Stack
            direction={{ md: "row", base: "column" }}
            w="100%"
            h="100%"
            justifyContent="center"
          >
            <Text fontSize="24px" ml="5px" variant="title">
              No network found
            </Text>
          </Stack>
        </Container>
      </Flex>
    )

  return (
    <>
      <Head>
        <title>Stable Credit | Home</title>
      </Head>
      <Flex width="100%" mt="5em" justifyContent="center">
        <Container maxW="container.xl" mt="25vh" p={0}>
          <Stack
            direction={{ md: "row", base: "column" }}
            w="100%"
            h="100%"
            justifyContent="center"
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <Link href={`/${router.query.network}/member`} passHref>
                  <ChakraLink>
                    <Button h="14em" variant="ghost">
                      <Box
                        h="12em"
                        w="12em"
                        backgroundColor={boxColor}
                        borderRadius="lg"
                        p="2em"
                      >
                        <Center h="100%">
                          <FontAwesomeIcon icon={faUser} color={textColor} />
                          <Text
                            fontSize="24px"
                            ml="5px"
                            variant="title"
                            color={textColor}
                          >
                            Members
                          </Text>
                        </Center>
                      </Box>
                    </Button>
                  </ChakraLink>
                </Link>
                {!isMobile ? (
                  <Divider
                    alignSelf="center"
                    borderColor={boxColor}
                    orientation="vertical"
                    h="12em"
                    mx="3em !important"
                  />
                ) : (
                  <Divider
                    alignSelf="center"
                    borderColor={boxColor}
                    orientation="horizontal"
                    w="90%"
                  />
                )}
                <Link href={`/${router.query.network}/operator`} passHref>
                  <ChakraLink>
                    <Button h="14em" variant="ghost">
                      <Box
                        h="12em"
                        w="12em"
                        backgroundColor={boxColor}
                        borderRadius="lg"
                        p="2em"
                      >
                        <Center h="100%">
                          <FontAwesomeIcon icon={faGears} color={textColor} />
                          <Text
                            fontSize="24px"
                            ml="5px"
                            variant="title"
                            color={textColor}
                          >
                            Operators
                          </Text>
                        </Center>
                      </Box>
                    </Button>
                  </ChakraLink>
                </Link>
              </>
            )}
          </Stack>
        </Container>
      </Flex>
    </>
  )
}

export default NetworkHomePage
