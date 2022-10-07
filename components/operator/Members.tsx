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
} from "@chakra-ui/react"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@chakra-ui/react"
import { AddMemberModal } from "./AddMemberModal"
import { UpdateMemberModal } from "./UpdateMemberModal"
import { useState } from "react"

export interface Member {
  address: string
  balance: number
  creditLimit: number
}

export const Members = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

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

  const [selectedMember, setSelectedMember] = useState<Member>()

  const selectMember = (member: Member) => {
    setSelectedMember(member)
    onUpdateOpen()
  }

  const members = [
    {
      id: "1",
      address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      creditLimit: 1000,
      balance: 130,
    },
    {
      id: "2",
      address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
      creditLimit: 1200,
      balance: -130,
    },
    {
      id: "3",
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      creditLimit: 900,
      balance: 0,
    },
  ]
  return (
    <>
      <Box
        p="2em"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        h="65vh"
      >
        <HStack justifyContent="space-between" mb="1em">
          <HStack maxW="40em" w="100%">
            <Input
              // value={value}
              // onChange={handleChange}
              placeholder="0x000...000"
              // onKeyPress={(event) => {
              //   if (event.key === "Enter") {
              //     searchNetwork()
              //   }
              // }}
            />
            <IconButton
              ml="0 !important"
              mr="-1em !important"
              size="lg"
              aria-label="search"
              variant="unstyled"
              icon={<FontAwesomeIcon icon={faSearch} />}
              // onClick={searchNetwork}
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
              {members.map((member) => (
                <Tr className={isMobile ? "" : "member-row"} key={member.id}>
                  <Td>{member.address}</Td>
                  <Td isNumeric>{member.balance}</Td>
                  <Td isNumeric>{member.creditLimit}</Td>
                  <Td w="5em">
                    <Button
                      onClick={() => selectMember(member)}
                      className={isMobile ? "" : "member-manage-button"}
                      size="sm"
                    >
                      manage
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <AddMemberModal onClose={onAddClose} isOpen={isAddOpen}>
        <></>
      </AddMemberModal>
      <UpdateMemberModal
        onClose={onUpdateClose}
        isOpen={isUpdateOpen}
        member={selectedMember}
      >
        <></>
      </UpdateMemberModal>
    </>
  )
}
