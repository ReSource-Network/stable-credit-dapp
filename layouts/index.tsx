import { Flex, useColorModeValue as mode, useColorMode } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Header } from "../components"
import PillPity from "pill-pity"

export const Layout = ({ children }: { children?: ReactNode }) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Header />
      <Flex
        zIndex={1}
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        as="main"
        height={"100%"}
      >
        <PillPity
          w="100%"
          h="100%"
          pattern="topography"
          as={Flex}
          justify="center"
          align="center"
          pill={colorMode === "light" ? "#141214" : "#f1f1f1"}
          pity={0.07}
          bgColor={colorMode === "light" ? "#f1f1f1" : "#141214"}
        >
          {children}
        </PillPity>
      </Flex>
    </>
  )
}
