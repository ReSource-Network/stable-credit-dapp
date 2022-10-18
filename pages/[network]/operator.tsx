import { Center, Container, Flex, Stack, Spinner, Text } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { useState, useEffect } from "react"
import { Members } from "../../components/operator/Members"
import { NetworkStats } from "../../components/operator/NetworkStats"
import { ReserveStats } from "../../components/operator/ReserveStats"
import { useAccessManagerContract } from "../../hooks/useAccessManagerContract"
import { useAccount } from "wagmi"
import { useIsOperator, IsOperator } from "../../hooks/useIsOperator"

export const Operator: NextPage = () => {
  const { isOperator, check, loading } = useIsOperator()
  const { address } = useAccount()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      await check(address)
    }
    if (address) handler()
  }, [address, check])

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
          ) : isOperator ? (
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
          ) : (
            <Center>
              <Text variant="title">Operator access only</Text>
            </Center>
          )}
        </Container>
      </Flex>
    </>
  )
}

export default Operator
