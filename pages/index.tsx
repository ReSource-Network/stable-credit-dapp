import {
  Container,
  Flex,
  Input,
  IconButton,
  Text,
  useColorModeValue,
  useBreakpointValue,
  Fade,
  Slide,
  SlideFade,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { Divider, Stack, HStack, VStack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGears, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useAccount } from "wagmi"
import { useModal } from "connectkit"

export const NetworkHomePage: NextPage = () => {
  const boxColor = useColorModeValue("#18202b", "white")
  const textColor = useColorModeValue("white", "#18202b")
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [value, setValue] = useState("")
  const handleChange = (event) => setValue(event.target.value)
  const { address } = useAccount()
  const { setOpen } = useModal()

  const searchNetwork = () => {
    if (!value) return
    if (!address) {
      setOpen(true)
      return
    }
    router.push(`/${value}`)
  }

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
    </>
  )
}

export default NetworkHomePage
