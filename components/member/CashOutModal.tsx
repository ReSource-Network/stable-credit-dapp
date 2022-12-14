import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { useEffect, useState } from "react"
import { Stack, Text } from "@chakra-ui/react"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { useAccount } from "wagmi"
import { formatStableCredits } from "../../functions/bignumber"
import { ReferenceTokenBalance } from "./ReferenceTokenBalance"
import { useCashOut } from "../../hooks/useCashOut"
import { ManageMember } from "../../hooks/useGetMember"
import { useReservePoolContract } from "../../hooks/useReservePoolContract"
import { formatEther } from "ethers/lib/utils"
import { useReferenceTokenContract } from "../../hooks/useReferenceTokenContract"
import { useGetTransactions } from "../../state"

export interface MemberModalProps extends ManageMember {
  isOpen: boolean
  onClose: () => void
}

export const CashOutModal = ({
  getMember,
  member,
  isOpen,
  onClose,
}: MemberModalProps) => {
  const stableCredit = useStableCreditContract()
  const [networkDebt, setNetworkDebt] = useState(0)
  const [collateral, setCollateral] = useState(0)
  const [referenceTokenSymbol, setReferenceTokenSymbol] = useState("")
  const { address } = useAccount()
  const { cashOut, loading } = useCashOut()
  const reservePool = useReservePoolContract()
  const referenceToken = useReferenceTokenContract()
  const transactions = useGetTransactions()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setNetworkDebt(
        Number(formatStableCredits(await stableCredit.networkDebt())),
      )
      setCollateral(
        Number(formatEther(await reservePool.reserve(stableCredit.address))),
      )
      setReferenceTokenSymbol(await referenceToken.symbol())
    }
    if (address && stableCredit && reservePool) handler()
  }, [stableCredit, address, reservePool, referenceToken, transactions])

  return (
    <Modal isCentered size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cash Back</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            amount: undefined || 0,
          }}
          onSubmit={async ({ amount }) => {
            if (!address || !amount) return
            await cashOut(amount)
            await getMember(address)
          }}
        >
          {({ handleSubmit, setValues, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody minH="15em">
                <Stack w="100%">
                  <HStack w="100%" py="1em" borderRadius="lg">
                    <FormControl isInvalid={!!errors.amount && touched.amount}>
                      <FormLabel htmlFor="address">Amount</FormLabel>
                      <InputGroup>
                        <InputLeftAddon>$</InputLeftAddon>
                        <Field
                          as={Input}
                          id="amount"
                          name="amount"
                          type="number"
                          placeholder="0"
                          validate={(value) => {
                            let error = "hello"
                            if (value > networkDebt) {
                              error = `${
                                networkDebt > 0 ? "Only " : ""
                              } ${networkDebt} credits eligable for reimbursement`
                              return error
                            }
                            if (value.amount > collateral) {
                              error = `Reserve pool is low. Only ${collateral} ${referenceTokenSymbol} available`
                            }
                          }}
                        />
                        <Button
                          ml="1em"
                          onClick={() => {
                            if (!member) return
                            if (member.balance <= 0) return
                            if (member.balance <= networkDebt)
                              setValues({ amount: Math.abs(member.balance) })
                            else setValues({ amount: networkDebt })
                          }}
                          alignSelf={"center"}
                        >
                          Max
                        </Button>
                      </InputGroup>
                      <FormHelperText>Maximum {networkDebt}</FormHelperText>
                      <FormErrorMessage>{errors.amount}</FormErrorMessage>
                    </FormControl>
                  </HStack>
                  <Stack>
                    <HStack justifyContent="space-between">
                      <Text>Credits: </Text>
                      <Text
                        whiteSpace={"nowrap"}
                        fontSize="lg"
                        fontWeight="bold"
                      >
                        {member?.balance.toLocaleString("en", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </Text>
                    </HStack>
                    <ReferenceTokenBalance />
                  </Stack>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <HStack w="100%" mt="1em">
                  <Button isLoading={loading} w="100%" type="submit">
                    Cash Back
                  </Button>
                </HStack>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}
