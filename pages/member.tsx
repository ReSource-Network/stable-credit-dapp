import {
  Flex,
  Box,
  Center,
  SlideFade,
  useColorMode,
  IconButton,
  Collapse,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { VStack } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useGetMember } from "../hooks/useGetMember"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { StableCreditCard } from "../components/member/wallet/StableCreditCard"
import { FeeTokenCard } from "../components/member/wallet/FeeTokenCard"
import { useAccount } from "wagmi"
import { useInterval } from "react-use"

export const Member: NextPage = () => {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const [showStableCredit, setShowStableCredit] = useState(false)
  const [showFeeToken, setShowFeeToken] = useState(false)
  const { address } = useAccount()
  const { show } = router.query
  const memberManage = useGetMember()
  const { getMember } = memberManage

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

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      await getMember(address)
    }
    if (address) handler()
  }, [getMember, address])

  useInterval(() => {
    const handler = async () => {
      if (!address) return
      await getMember(address)
    }
    if (address) handler()
  }, 1000)

  return (
    <>
      <Head>
        <title>StableCredit | Member</title>
      </Head>
      <Flex width="100%" justifyContent="center">
        <Box
          minH="75vh"
          borderRadius="3xl"
          p="2em"
          w="30em"
          m="1em"
          mt="4em !important"
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
            <VStack w="100%" spacing={!showFeeToken ? "2em" : "0em"}>
              <Collapse style={{ width: "100%" }} in={!showFeeToken}>
                <StableCreditCard
                  memberManage={memberManage}
                  showCredit={showStableCredit}
                  setShowCredit={setShowStableCredit}
                />
              </Collapse>

              <Collapse style={{ width: "100%" }} in={!showStableCredit}>
                <FeeTokenCard
                  showFeeToken={showFeeToken}
                  setShowFeeToken={setShowFeeToken}
                />
              </Collapse>
            </VStack>
          </Center>
        </Box>
      </Flex>
    </>
  )
}

export default Member
