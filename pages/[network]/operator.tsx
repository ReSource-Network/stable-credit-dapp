import {
  Container,
  Flex,
  Text,
  VStack,
  Button,
  HStack,
  Stack,
} from "@chakra-ui/react"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import type { NextPage } from "next"
import Head from "next/head"
import { trimAddress } from "../../functions/address"
import { useNetworkAddresses } from "../../hooks/useNetworkAddresses"
import { useNetworkName } from "../../hooks/useNetworkName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Members } from "../../components/operator/Members"
import { NetworkStats } from "../../components/operator/NetworkStats"
import { ReserveStats } from "../../components/operator/ReserveStats"
import { Link } from "@chakra-ui/react"
import { useRouter } from "next/router"

export const Operator: NextPage = () => {
  const { networkAddresses, valid } = useNetworkAddresses()
  const { name: networkName, loading } = useNetworkName()
  const trimmedAddress = trimAddress(networkAddresses.stableCredit || "", 4)
  const router = useRouter()

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
