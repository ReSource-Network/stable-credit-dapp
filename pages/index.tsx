import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  Link as ChakraLink,
  SlideFade,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import {
  faArrowsRotate,
  faBackward,
  faGears,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useModal } from "connectkit"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

import {
  useFetchNetworkAddresses,
  useNetworkAddresses,
} from "../state/networkAddresses"

import type { NextPage } from "next"
import {
  useCreditAddrStore,
  useNetworkAddressesStore,
} from "../state/networkAddresses/store"
import shallow from "zustand/shallow"

export const NetworkHomePage: NextPage = () => {
  const boxColor = useColorModeValue("#18202b", "white")
  const router = useRouter()
  const [value, setValue] = useState("")
  const [input, setInput] = useState("")
  const handleChange = (event) => setValue(event.target.value)
  const { address } = useAccount()
  const { setOpen } = useModal()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const boxColor2 = useColorModeValue("#262626", "white")
  const textColor = useColorModeValue("white", "#18202b")
  const { creditAddr, setCreditAddr } = useCreditAddrStore()
  const networkAddresses = useNetworkAddresses()
  const valid = input && !!networkAddresses.accessManager

  useEffect(() => {
    if (!creditAddr) return
    else router.push("/operator")
  }, [creditAddr, router])

  const searchNetwork = () => {
    if (!value) return

    if (!address) {
      setOpen(true)
      return
    }

    setInput(value)
    setCreditAddr(value)
  }

  if (!valid && input)
    return (
      <Flex width="100%" justifyContent="center">
        <Container maxW="container.xl" p={0}>
          <Stack alignItems={"center"} h="100%" justifyContent="center">
            <Text alignSelf={"center"} fontSize="24px" ml="5px" variant="title">
              No credit found
            </Text>
            <HStack>
              <ChakraLink>
                <HStack spacing=".5em">
                  <FontAwesomeIcon icon={faBackward} />
                  <Link href="/">Go back</Link>
                </HStack>
              </ChakraLink>
              <Divider
                ml="1.5em !important"
                mr="1em !important"
                orientation="vertical"
                borderColor="white"
              />
              <ChakraLink>
                <HStack onClick={() => setOpen(true)} spacing=".5em">
                  <FontAwesomeIcon icon={faArrowsRotate} />
                  <Text>Change network</Text>
                </HStack>
              </ChakraLink>
            </HStack>
          </Stack>
        </Container>
      </Flex>
    )

  return (
    <>
      <Head>
        <title>Stable Credit | Home</title>
      </Head>
      {!input || !value ? (
        <Flex width="100%" justifyContent="center">
          <Container maxW="container.xl" p={0}>
            <Stack
              direction={{ md: "row", base: "column" }}
              w="100%"
              h="100%"
              justifyContent="center"
              alignItems="center"
            >
              <HStack w="22em">
                <VStack w="22em">
                  <SlideFade in={true} delay={0.25}>
                    <Text
                      alignSelf="flex-start"
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      Stable Credit Address
                    </Text>
                    <HStack w="22em">
                      <Input
                        variant={"filled"}
                        value={value}
                        onChange={handleChange}
                        placeholder="0x000...000"
                        borderColor={boxColor}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            searchNetwork()
                          }
                        }}
                      />
                      <IconButton
                        ml="0 !important"
                        mr="-1em !important"
                        size="lg"
                        aria-label="menu"
                        variant="unstyled"
                        icon={<FontAwesomeIcon icon={faSearch} />}
                        onClick={searchNetwork}
                      />
                    </HStack>
                  </SlideFade>
                </VStack>
              </HStack>
            </Stack>
          </Container>
        </Flex>
      ) : (
        <Flex width="100%" justifyContent="center">
          <Container maxW="container.xl" p={0}>
            <Stack
              flexDir={{ md: "row", base: "column" }}
              w="100%"
              h="100%"
              justifyContent="center"
              textAlign="center"
            >
              <Link href="/member" passHref>
                <ChakraLink>
                  <Button h="14em" variant="ghost">
                    <Box
                      h="12em"
                      w="12em"
                      backgroundColor={boxColor2}
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
                  borderColor={boxColor2}
                  orientation="vertical"
                  h="12em"
                  mx="3em !important"
                />
              ) : (
                <Divider
                  alignSelf="center"
                  borderColor={boxColor2}
                  orientation="horizontal"
                  w="90%"
                />
              )}
              <Link href="/operator" passHref>
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
            </Stack>
          </Container>
        </Flex>
      )}
    </>
  )
}

export default NetworkHomePage
