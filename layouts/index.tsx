import { Flex, useColorModeValue as mode } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Header } from "../components"
import { Footer } from "../components/nav/Footer"

export const Layout = ({ children }: { children?: ReactNode }) => (
  <>
    <Header />
    <Flex
      zIndex={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      as="main"
    >
      {children}
    </Flex>
  </>
)
