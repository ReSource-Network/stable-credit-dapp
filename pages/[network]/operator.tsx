import {
  Center,
  Container,
  Flex,
  Stack,
  Spinner,
  Text,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { useState, useEffect } from "react"
import { MembersTable } from "../../components/operator/MembersTable"
import { NetworkStats } from "../../components/operator/NetworkStats"
import { ReserveStats } from "../../components/operator/ReserveStats"
import { useAccount } from "wagmi"
import { useIsOperator, IsOperator } from "../../hooks/useIsOperator"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBackward } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"

export const Operator: NextPage = () => {
  const { isOperator, check, loading } = useIsOperator()
  const { address } = useAccount()
  const router = useRouter()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      await check(address)
    }
    if (address) handler()
  }, [address, check])

  if (!isOperator)
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
              <MembersTable />
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
