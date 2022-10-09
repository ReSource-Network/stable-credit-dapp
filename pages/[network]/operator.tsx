import { Container, Flex, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { useNetworkAddresses } from "../../hooks/useNetworkAddresses"
import { Members } from "../../components/operator/Members"
import { NetworkStats } from "../../components/operator/NetworkStats"
import { ReserveStats } from "../../components/operator/ReserveStats"

export const Operator: NextPage = () => {
  const { networkAddresses, valid } = useNetworkAddresses()

  return (
    <>
      <Head>
        <title>StableCredit | Operator</title>
      </Head>
      <Flex p="1em" width="100%" justifyContent="center">
        <Container maxW="container.xl" mt="7em" p={0}>
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
        </Container>
      </Flex>
    </>
  )
}

export default Operator
