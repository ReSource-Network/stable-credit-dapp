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
  Stack,
} from "@chakra-ui/react"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, useColorMode } from "@chakra-ui/react"
import { AddMemberModal } from "./member/AddMemberModal"
import { UpdateMemberModal } from "./UpdateMemberModal"
import { useState } from "react"
import { useGetMember } from "../../hooks/useGetMember"
import { useRouter } from "next/router"
import { useFetchMembers } from "../../hooks/useFetchMembers"
import { ethers } from "ethers"
import { formatStableCredits } from "../../functions/bignumber"
import Pagination from "../Pagination"

const pageSize = 5

export interface Member {
  address: string
  balance: number
  available: number
  creditLimit: number
  pastDue: Date
  default: Date
  issued?: Date
}

export const MembersTable = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { colorMode } = useColorMode()
  const router = useRouter()

  const [page, setPage] = useState(1)
  const network = router.query.network as string

  const { network: networkData, refetch } = useFetchMembers({
    address: network || "",
    page,
    limit: pageSize,
  })

  let members
  if (networkData?.members) {
    members = networkData?.members.map((member) => {
      return {
        address: member.address,
        balance: Number(
          formatStableCredits(ethers.utils.parseUnits(member.balance, "wei")),
        ),
        available: 0,
        creditLimit: Number(
          formatStableCredits(
            ethers.utils.parseUnits(member.creditLimit, "wei"),
          ),
        ),
        pastDue: new Date(),
        default: new Date(),
      }
    })
  }

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

  const handleCloseUpdate = async () => {
    if (searchAddress) getMember(searchAddress)
    setTimeout(async () => {
      await refetch()
    }, 1000)
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
                if (!searchAddress) return
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
              onClick={() => {
                if (!searchAddress) return
                getMember(searchAddress)
              }}
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
                    <Td isNumeric>
                      {searchedMember.balance.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Td>
                    <Td isNumeric>
                      {searchedMember.creditLimit.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Td>
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
                members?.map((member: Member) => (
                  <Tr
                    className={isMobile ? "" : "member-row"}
                    key={member.address}
                  >
                    <Td>{member.address}</Td>
                    <Td isNumeric>
                      {member.balance.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Td>
                    <Td isNumeric>
                      {member.creditLimit.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Td>
                    <Td w="5em">
                      <Button
                        onClick={() => selectMember(member)}
                        className={isMobile ? "" : "member-manage-button"}
                        size="sm"
                      >
                        extend
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
          <Stack w="100%" mt="1em" alignItems={"flex-end"}>
            <Pagination
              my={4}
              total={Number(networkData?.totalMembers)}
              current={page}
              pageSize={pageSize}
              handleChange={(p) => setPage(p)}
            />
          </Stack>
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
