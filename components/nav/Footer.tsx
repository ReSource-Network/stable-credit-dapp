import { Divider, useBreakpointValue, Container } from "@chakra-ui/react"
import { VStack, Image, Text, Link, HStack } from "@chakra-ui/react"

import colors from "../../styles/theme/foundations/colors"

export const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Container maxW="container.lg" id="mint">
      <VStack alignSelf="center" my="3em">
        <Text fontSize={{ md: "lg", base: "md" }}>Stable Credits</Text>
      </VStack>
    </Container>
  )
}
