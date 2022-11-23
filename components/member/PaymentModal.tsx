import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  Skeleton,
} from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { Stack, Text } from "@chakra-ui/react"
import { ReferenceTokenBalance } from "./ReferenceTokenBalance"
import { ManageMember } from "../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { useRepayCredits } from "../../hooks/useRepayCredits"
import {
  ApprovalState,
  useApproveReferenceToken,
} from "../../hooks/useApproveReferenceToken"
import { constants } from "ethers/lib/ethers"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { useReferenceTokenContract } from "../../hooks/useReferenceTokenContract"
import { useEffect, useState } from "react"
import { formatEther } from "ethers/lib/utils"
import { MemberModalProps } from "./CashOutModal"

export const PaymentModal = ({
  getMember,
  member,
  isOpen,
  onClose,
}: MemberModalProps) => {
  const { repay, loading } = useRepayCredits()
  const stableCredit = useStableCreditContract()
  const { approve, approving, approvalState } = useApproveReferenceToken(
    constants.MaxUint256,
    stableCredit?.address,
  )
  const { address } = useAccount()
  const referenceToken = useReferenceTokenContract()
  const [referenceTokenSymbol, setFeeSymbol] = useState("")
  const [referenceTokenBalance, setReferenceTokenBalance] = useState(0)

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setFeeSymbol(await referenceToken.symbol())
      const _referenceTokenBalance = Number(
        formatEther(await referenceToken.balanceOf(address)),
      )
      setReferenceTokenBalance(_referenceTokenBalance)
    }
    if (address && referenceToken) handler()
  }, [referenceToken, address])

  return (
    <Modal isCentered size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Make a Payment</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            amount: undefined || 0,
          }}
          validateOnChange={true}
          onSubmit={async ({ amount }, { resetForm }) => {
            if (!address || !amount) return
            await repay(amount)
            await getMember(address)
            resetForm()
          }}
        >
          {({ handleSubmit, setValues, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack w="100%" minH="15em">
                  {address && approvalState !== ApprovalState.APPROVED ? (
                    <Stack>
                      <Stack spacing="1em" opacity=".2">
                        <Skeleton
                          startColor="gray.700"
                          endColor="gray.500"
                          height="30px"
                        />
                        <Skeleton
                          startColor="gray.700"
                          endColor="gray.500"
                          height="30px"
                        />
                        <Skeleton
                          startColor="gray.700"
                          endColor="gray.500"
                          height="30px"
                        />
                      </Stack>
                      <Stack marginTop="2em" alignItems={"center"}>
                        <Text>Approve USDC for making a credit payment.</Text>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack h="full" w="100%" py="1em" borderRadius="lg">
                      <Stack>
                        <HStack justifyContent="space-between">
                          <Text>Credit balance: </Text>
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
                      <HStack>
                        <FormControl
                          isInvalid={!!errors.amount && touched.amount}
                        >
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
                                let error
                                if (value > referenceTokenBalance) {
                                  error = "Insufficient Funds"
                                }
                                return error
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.amount}</FormErrorMessage>
                        </FormControl>
                        <Button
                          onClick={() => {
                            if (!member) return
                            if (member.balance >= 0) return
                            if (
                              Math.abs(member.balance) <= referenceTokenBalance
                            )
                              setValues({ amount: Math.abs(member.balance) })
                            else setValues({ amount: referenceTokenBalance })
                          }}
                          alignSelf={"flex-end"}
                        >
                          Max
                        </Button>
                      </HStack>
                    </Stack>
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter>
                {address && approvalState !== ApprovalState.APPROVED ? (
                  <Button
                    w="100%"
                    mb="1em"
                    variant="solid"
                    onClick={approve}
                    isLoading={approving}
                    loadingText="Approving"
                  >
                    Approve {referenceTokenSymbol}
                  </Button>
                ) : (
                  <HStack w="100%" mt="1em">
                    <Button isLoading={loading} w="100%" type="submit">
                      Pay
                    </Button>
                  </HStack>
                )}
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}
