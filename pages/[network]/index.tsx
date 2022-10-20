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
  HStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { Divider, Stack, Spinner } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackward, faGears, faUser } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import Link from "next/link"
import {
  useFetchNetworkAddresses,
  useNetworkAddresses,
} from "../../state/networkAddresses/index"
import { useEffect } from "react"

export const NetworkHomePage: NextPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const boxColor = useColorModeValue("#262626", "white")
  const textColor = useColorModeValue("white", "#18202b")
  const router = useRouter()
  const networkAddresses = useNetworkAddresses()
  const valid = !!networkAddresses.accessManager

  if (!valid)
    return (
      <Flex width="100%" justifyContent="center">
        <Container maxW="container.xl" p={0}>
          <Stack alignItems={"center"} h="100%" justifyContent="center">
            <Text alignSelf={"center"} fontSize="24px" ml="5px" variant="title">
              No network found
            </Text>
            <ChakraLink>
              <HStack spacing=".5em">
                <FontAwesomeIcon icon={faBackward} />
                <Link href="/">Go back</Link>
              </HStack>
            </ChakraLink>
          </Stack>
        </Container>
      </Flex>
    )

  return (
    <>
      <Head>
        <title>Stable Credit | Home</title>
      </Head>
      <Flex width="100%" justifyContent="center">
        <Container maxW="container.xl" p={0}>
          <Stack
            direction={{ md: "row", base: "column" }}
            w="100%"
            h="100%"
            justifyContent="center"
            textAlign="center"
          >
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
          </Stack>
        </Container>
      </Flex>
    </>
  )
}

export async function getServerSidePath(context) {
  const network = context.query.network

  return {
    paths: [{ network }],
  }
}

export default NetworkHomePage
