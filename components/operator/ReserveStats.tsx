import {
  Box,
  Text,
  Stack,
  HStack,
  Button,
  Divider,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import { faArrowUpFromBracket, faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SourceGlyphSolid } from "../Glyph"
import { VStack } from "@chakra-ui/react"
import { ReserveConfigModal } from "./ReserveConfigModal"
export const ReserveStats = () => {
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure()

  return (
    <>
      <Box
        borderRadius="xl"
        bg={"#e2e2e2"}
        color="#1a202c"
        w={{ md: "auto", base: "100%" }}
      >
        <Box bg={"white"} borderTopRadius="lg" border="1px solid #e2e2e2">
          <HStack justifyContent="space-between" p="1em">
            <Text fontWeight="bold" variant="title" fontSize="2xl">
              RESERVE
            </Text>
            <IconButton
              aria-label="configure"
              size="sm"
              onClick={onConfigOpen}
              icon={<FontAwesomeIcon icon={faGear} />}
            />
          </HStack>
        </Box>
        <VStack p="1em">
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center" textAlign="center">
              <Text fontSize="24px" fontWeight="bold">
                $99.20
              </Text>
              <Text mt="0 !important">Operator Balance</Text>
            </Stack>
            <Stack p="1em" alignItems="center" alignSelf="center">
              <Button
                size="sm"
                leftIcon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
              >
                Withdraw
              </Button>
            </Stack>
          </Stack>
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center" textAlign="center">
              <Text fontSize="24px" fontWeight="bold">
                $120.20
              </Text>
              <Text mt="0 !important">Collateral Reserve:</Text>
            </Stack>
            <Stack p="1em" alignItems="center" textAlign="center">
              <HStack textAlign="center">
                <SourceGlyphSolid />
                <Text fontSize="24px" fontWeight="bold">
                  29
                </Text>
              </HStack>
              <Text mt="0 !important">Swap Sink</Text>
            </Stack>
          </Stack>
        </VStack>
      </Box>
      <ReserveConfigModal onClose={onConfigClose} isOpen={isConfigOpen}>
        <></>
      </ReserveConfigModal>
    </>
  )
}
