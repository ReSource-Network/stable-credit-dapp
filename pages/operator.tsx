import {
  Center,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react"
import { faBackward } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

import { Members } from "../components/operator/Members"
import { NetworkStats } from "../components/operator/NetworkStats"
import { ReserveStats } from "../components/operator/ReserveStats"
import { useIsOperator } from "../hooks/useIsOperator"

import type { NextPage } from "next"
import { useCreditAddrStore } from "../state/networkAddresses/store"

export const Operator: NextPage = () => {
  const { address } = useAccount()
  const { creditAddr } = useCreditAddrStore()
  const { verifyRole, isOperator, loading } = useIsOperator()
  const router = useRouter()

  useEffect(() => {
    if (!creditAddr) router.push("/")
    verifyRole(address || "")
  }, [address, creditAddr, router])

  if (!isOperator && !loading)
    return (
      <Flex width="100%" justifyContent="center">
        <Container maxW="container.xl" p={0}>
          <Stack alignItems={"center"} h="100%" justifyContent="center">
            <Text alignSelf={"center"} fontSize="24px" ml="5px" variant="title">
              Operator access only
            </Text>
            <ChakraLink>
              <HStack spacing=".5em">
                <FontAwesomeIcon icon={faBackward} />
                <Link href={`/${router.query.network}`}>Go back</Link>
              </HStack>
            </ChakraLink>
          </Stack>
        </Container>
      </Flex>
    )

  return (
    <>
      <Head>
        <title>StableCredit | Operator</title>
      </Head>
      <Flex pt="5em !important" p="1em" width="100%" alignSelf={"flex-start"}>
        <Container maxW="container.xl" p={0}>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Stack
              direction={{ md: "row", base: "column" }}
              spacing="1em"
              alignItems="flex-start"
              mt="2em"
            >
              <Members />
              <Stack spacing="1em" w={{ md: "initial", base: "100%" }}>
                <NetworkStats />
                <ReserveStats />
              </Stack>
            </Stack>
          )}
        </Container>
      </Flex>
    </>
  )
}

export default Operator
