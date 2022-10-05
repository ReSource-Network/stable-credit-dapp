import {
  Container,
  Flex,
  Text,
  Box,
  Button,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { HStack, Divider, Stack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faGears, faUser } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"

export const HomePage: NextPage = () => {
  const boxColor = useColorModeValue("#18202b", "white")
  const textColor = useColorModeValue("white", "#18202b")
  const router = useRouter()
  const isMobile = useBreakpointValue({ base: true, md: false })

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
            <Button
              onClick={() => router.push("/member")}
              h="14em"
              variant="ghost"
            >
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
            <Button
              h="14em"
              variant="ghost"
              onClick={() => router.push("/operator")}
            >
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
          </Stack>
        </Container>
      </Flex>
    </>
  )
}

export default HomePage
