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
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NetworkConfigModal } from "./NetworkConfigModal"
export const NetworkStats = () => {
  const {
    isOpen: isConfigOpen,
    onOpen: onConfigOpen,
    onClose: onConfigClose,
  } = useDisclosure()

  return (
    <>
      <Box borderRadius="xl" bg={"#e2e2e2"} color="#1a202c" w="full">
        <Box bg={"white"} borderTopRadius="lg" border="1px solid #e2e2e2">
          <HStack justifyContent="space-between" p="1em">
            <Text fontWeight="bold" variant="title" fontSize="2xl">
              NETWORK
            </Text>
            <IconButton
              aria-label="configure"
              size="sm"
              onClick={onConfigOpen}
              icon={<FontAwesomeIcon icon={faGear} />}
            />
          </HStack>
        </Box>
        <Stack>
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                1,000
              </Text>
              <Text mt="0 !important">Members</Text>
            </Stack>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                $3,000.00
              </Text>
              <Text mt="0 !important">Total Supply</Text>
            </Stack>
          </Stack>
          <Stack direction={{ md: "row", base: "column" }}>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                12
              </Text>
              <Text mt="0 !important">Defaults</Text>
            </Stack>
            <Stack p="1em" alignItems="center">
              <Text fontSize="24px" fontWeight="bold">
                $0.00
              </Text>
              <Text mt="0 !important">Network Debt</Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <NetworkConfigModal onClose={onConfigClose} isOpen={isConfigOpen}>
        <></>
      </NetworkConfigModal>
    </>
  )
}
