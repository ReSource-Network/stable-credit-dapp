import {
  Box,
  IconButton,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Table,
  Input,
  HStack,
  useDisclosure,
  useBreakpointValue,
  Text,
  Stack,
} from "@chakra-ui/react"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, useColorMode } from "@chakra-ui/react"
import { AddMemberModal } from "./AddMemberModal"
import { UpdateMemberModal } from "./UpdateMemberModal"
import { useState } from "react"
import { useGetMember } from "../../hooks/useGetMember"

export interface Member {
  address: string
  balance: number
  creditLimit: number
  pastDue: Date
  default: Date
}

export const Members = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure()

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure()

  const handleCloseUpdate = () => {
    getMember(searchAddress)
    onUpdateClose()
  }

  const [selectedMember, setSelectedMember] = useState<Member>()
  const selectMember = (member: Member) => {
    setSelectedMember(member)
    onUpdateOpen()
  }

  const [searchAddress, setSearchAddress] = useState("")
  const handleSearchChange = (event) => {
    reset()
    setSearchAddress(event.target.value)
  }
  const { loading, reset, getMember, member: searchedMember } = useGetMember()

  const members = []
  return (
    <Stack w="100%" h="full">
      <Box
        p="2em"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        h="full"
        maxH="80vh"
        overflow="scroll"
        bg={colorMode === "light" ? "#ffffff" : "#262626"}
      >
        <HStack justifyContent="space-between" mb="1em">
          <HStack maxW="40em" w="100%">
            <Input
              value={searchAddress}
              onChange={handleSearchChange}
              placeholder="0x000...000"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  getMember(searchAddress)
                }
              }}
            />
            <IconButton
              ml="0 !important"
              mr="-1em !important"
              size="lg"
              aria-label="search"
              variant="unstyled"
              isLoading={loading}
              icon={<FontAwesomeIcon icon={faSearch} />}
              onClick={() => getMember(searchAddress)}
            />
          </HStack>
          <IconButton
            aria-label="add"
            onClick={onAddOpen}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </HStack>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Member</Th>
                <Th isNumeric>balance</Th>
                <Th isNumeric>limit</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchedMember ? (
                searchedMember?.address == "" ? (
                  <Tr>
                    <Th>No member found...</Th>
                  </Tr>
                ) : (
                  <Tr
                    className={isMobile ? "" : "member-row"}
                    key={searchedMember.address}
                  >
                    <Td>{searchedMember.address}</Td>
                    <Td isNumeric>{searchedMember.balance}</Td>
                    <Td isNumeric>{searchedMember.creditLimit}</Td>
                    <Td w="5em">
                      <Button
                        onClick={() => selectMember(searchedMember)}
                        className={isMobile ? "" : "member-manage-button"}
                        size="sm"
                      >
                        extend
                      </Button>
                    </Td>
                  </Tr>
                )
              ) : (
                members.map((member) => (
                  <></>
                  // <Tr className={isMobile ? "" : "member-row"} key={member.id}>
                  //   <Td>{member.address}</Td>
                  //   <Td isNumeric>{member.balance}</Td>
                  //   <Td isNumeric>{member.creditLimit}</Td>
                  //   <Td w="5em">
                  //     <Button
                  //       onClick={() => selectMember(member)}
                  //       className={isMobile ? "" : "member-manage-button"}
                  //       size="sm"
                  //     >
                  //       extend
                  //     </Button>
                  //   </Td>
                  // </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <AddMemberModal onClose={onAddClose} isOpen={isAddOpen}>
        <></>
      </AddMemberModal>
      <UpdateMemberModal
        onClose={handleCloseUpdate}
        isOpen={isUpdateOpen}
        member={selectedMember}
      >
        <></>
      </UpdateMemberModal>
    </Stack>
  )
}
