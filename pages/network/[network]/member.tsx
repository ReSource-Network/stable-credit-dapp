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
import { useState, useEffect } from "react"
import { Transfer } from "../../../components/member/Transfer"
import { Payment } from "../../../components/member/Payment"
import { CashOut } from "../../../components/member/CashOut"
import { MemberStats } from "../../../components/member/MemberStats"
import { useGetMember } from "../../../hooks/useGetMember"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"

export const Member: NextPage = () => {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const memberManage = useGetMember()
  const { member, getMember } = memberManage

  const { show } = router.query

  const handleChangeOption = (option?: string) => {
    if (!option) {
      delete router.query.show
      router.push(router)
      return
    } else {
      router.query.show = option
      router.push(router)
    }
  }

  return (
    <>
      <Head>
        <title>StableCredit | Member</title>
      </Head>
      <Flex width="100%" justifyContent="center">
        <Box
          minH="75vh"
          borderRadius="3xl"
          bg={colorMode === "light" ? "#ffffff" : "#262626"}
          p="2em"
          w="30em"
          m="1em"
        >
          {!!show && (
            <IconButton
              mt="-1em"
              ml="-1em"
              pos={"absolute"}
              aria-label="back"
              variant={"ghost"}
              onClick={() => handleChangeOption()}
              icon={<FontAwesomeIcon icon={faArrowLeft} />}
            />
          )}
          <Center>
            <VStack w="100%">
              <MemberStats {...memberManage} />
              {show == "send" && (
                <VStack w="100%">
                  <SlideFade
                    style={{ width: "100%" }}
                    in={show == "send"}
                    offsetY="20px"
                  >
                    <VStack justifyContent="center">
                      <Transfer {...memberManage} />
                      <Button
                        variant="ghost"
                        w="100%"
                        onClick={() => handleChangeOption()}
                      >
                        Cancel
                      </Button>
                    </VStack>
                  </SlideFade>
                </VStack>
              )}
              {show == "payment" && (
                <VStack w="100%">
                  <SlideFade
                    style={{ width: "100%" }}
                    in={show === "payment"}
                    offsetY="20px"
                  >
                    <VStack justifyContent="center">
                      <Payment {...memberManage} />
                      <Button
                        variant="ghost"
                        w="100%"
                        onClick={() => handleChangeOption()}
                      >
                        Cancel
                      </Button>
                    </VStack>
                  </SlideFade>
                </VStack>
              )}
              {show === "cashout" && (
                <VStack w="100%">
                  <SlideFade
                    style={{ width: "100%" }}
                    in={show === "cashout"}
                    offsetY="20px"
                  >
                    <VStack justifyContent="center">
                      <CashOut {...memberManage} />
                      <Button
                        variant="ghost"
                        w="100%"
                        onClick={() => handleChangeOption()}
                      >
                        Cancel
                      </Button>
                    </VStack>
                  </SlideFade>
                </VStack>
              )}
              {!show && (
                <SlideFade in={!show} offsetY="20px" style={{ width: "100%" }}>
                  <VStack mt="1em" w="100%">
                    <Button w="100%" onClick={() => handleChangeOption("send")}>
                      Send
                    </Button>
                    {member && member?.balance < 0 && (
                      <Button
                        w="100%"
                        onClick={() => handleChangeOption("payment")}
                      >
                        Make a Payment
                      </Button>
                    )}
                    {member && member?.balance > 0 && (
                      <Button
                        w="100%"
                        onClick={() => handleChangeOption("cashout")}
                      >
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
