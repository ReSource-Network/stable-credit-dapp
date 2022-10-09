import { Flex, Box, LightMode, Center, SlideFade } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { VStack, Button } from "@chakra-ui/react"
import { useState } from "react"
import { Transfer } from "../../components/member/Transfer"
import { Payment } from "../../components/member/Payment"
import { CashOut } from "../../components/member/CashOut"
import { MemberStats } from "../../components/member/MemberStats"

export const Member: NextPage = () => {
  const [showOption, setShowOption] = useState(0)

  return (
    <>
      <Head>
        <title>StableCredit | Member</title>
      </Head>
      <Flex width="100%" mt="7em" justifyContent="center">
        <Box
          minH="75vh"
          borderRadius="3xl"
          bg={"#e2e2e2"}
          color="#1a202c"
          p="2em"
          w="30em"
          m="1em"
        >
          <Center>
            <LightMode>
              <VStack w="100%">
                <MemberStats />
                {showOption == 1 && (
                  <VStack w="100%">
                    <SlideFade
                      style={{ width: "100%" }}
                      in={showOption == 1}
                      offsetY="20px"
                    >
                      <VStack justifyContent="center">
                        <Transfer />
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
                        <Payment />
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
                        <CashOut />
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
                      <Button w="100%" onClick={() => setShowOption(2)}>
                        Make a Payment
                      </Button>
                      <Button w="100%" onClick={() => setShowOption(3)}>
                        Cash out
                      </Button>
                    </VStack>
                  </SlideFade>
                )}
              </VStack>
            </LightMode>
          </Center>
        </Box>
      </Flex>
    </>
  )
}

export default Member
