import {
  Flex,
  Box,
  Center,
  SlideFade,
  useColorMode,
  IconButton,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { VStack, Button } from "@chakra-ui/react"
import { useState } from "react"
import { Transfer } from "../../components/member/Transfer"
import { Payment } from "../../components/member/Payment"
import { CashOut } from "../../components/member/CashOut"
import { MemberStats } from "../../components/member/MemberStats"
import { useGetMember } from "../../hooks/useGetMember"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export const Member: NextPage = () => {
  const [showOption, setShowOption] = useState(0)
  const { colorMode } = useColorMode()

  const memberManage = useGetMember()
  const { member, getMember } = memberManage

  // TODO: add option to router param for rerender / address change

  return (
    <>
      <Head>
        <title>StableCredit | Member</title>
      </Head>
      <Flex width="100%" mt="7em" justifyContent="center">
        <Box
          minH="75vh"
          borderRadius="3xl"
          bg={colorMode === "light" ? "#ffffff" : "#262626"}
          p="2em"
          w="30em"
          m="1em"
        >
          {showOption !== 0 && (
            <IconButton
              pos={"absolute"}
              aria-label="back"
              variant={"ghost"}
              onClick={() => setShowOption(0)}
              icon={<FontAwesomeIcon icon={faArrowLeft} />}
            />
          )}
          <Center>
            <VStack w="100%">
              <MemberStats {...memberManage} />
              {showOption == 1 && (
                <VStack w="100%">
                  <SlideFade
                    style={{ width: "100%" }}
                    in={showOption == 1}
                    offsetY="20px"
                  >
                    <VStack justifyContent="center">
                      <Transfer {...memberManage} />
                      <Button
                        variant="ghost"
                        w="100%"
                        onClick={() => setShowOption(0)}
                      >
                        Cancel
                      </Button>
                    </VStack>
                  </SlideFade>
                </VStack>
              )}
              {showOption == 2 && (
                <VStack w="100%">
                  <SlideFade
                    style={{ width: "100%" }}
                    in={showOption == 2}
                    offsetY="20px"
                  >
                    <VStack justifyContent="center">
                      <Payment {...memberManage} />
                      <Button
                        variant="ghost"
                        w="100%"
                        onClick={() => setShowOption(0)}
                      >
                        Cancel
                      </Button>
                    </VStack>
                  </SlideFade>
                </VStack>
              )}
              {showOption == 3 && (
                <VStack w="100%">
                  <SlideFade
                    style={{ width: "100%" }}
                    in={showOption == 3}
                    offsetY="20px"
                  >
                    <VStack justifyContent="center">
                      <CashOut {...memberManage} />
                      <Button
                        variant="ghost"
                        w="100%"
                        onClick={() => setShowOption(0)}
                      >
                        Cancel
                      </Button>
                    </VStack>
                  </SlideFade>
                </VStack>
              )}
              {showOption == 0 && (
                <SlideFade
                  in={showOption == 0}
                  offsetY="20px"
                  style={{ width: "100%" }}
                >
                  <VStack mt="1em" w="100%">
                    <Button w="100%" onClick={() => setShowOption(1)}>
                      Send
                    </Button>
                    {member && member?.balance < 0 && (
                      <Button w="100%" onClick={() => setShowOption(2)}>
                        Make a Payment
                      </Button>
                    )}
                    {member && member?.balance > 0 && (
                      <Button w="100%" onClick={() => setShowOption(3)}>
                        Cash out
                      </Button>
                    )}
                  </VStack>
                </SlideFade>
              )}
            </VStack>
          </Center>
        </Box>
      </Flex>
    </>
  )
}

export default Member
