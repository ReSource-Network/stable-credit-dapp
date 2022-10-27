import {
  HStack,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
  Divider,
  List,
  ListItem,
  Link,
  UnorderedList,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  Skeleton,
} from "@chakra-ui/react"
import { constants, ethers } from "ethers"
import { Formik, Field } from "formik"
import { Stack, Text } from "@chakra-ui/react"
import { ManageMember } from "../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { useTransferCredits } from "../../hooks/useTransferCredits"
import { TransactionFee } from "./TransactionFee"
import {
  ApprovalState,
  useApproveFeeToken,
} from "../../hooks/useApproveFeeToken"
import { useNetworkAddresses } from "../../state/networkAddresses"
import { useEffect, useState } from "react"
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { useRouter } from "next/router"
import { MemberModalProps } from "./CashOutModal"

export const TransferModal = ({
  getMember,
  isOpen,
  onClose,
}: MemberModalProps) => {
  const { transfer, loading } = useTransferCredits()
  const { address: signerAddress } = useAccount()
  const { feeManager: feeManagerAddress } = useNetworkAddresses()
  const [feeTokenSymbol, setFeeSymbol] = useState("")
  const [feesPaused, setFeesPaused] = useState(false)
  const [sufficient, setSufficient] = useState(false)
  const [isPastDue, setIsPastDue] = useState(false)
  const feeToken = useFeeTokenContract()
  const feeManager = useFeeManagerContract()
  const stableCredit = useStableCreditContract()
  const router = useRouter()

  const { approve, approving, approvalState } = useApproveFeeToken(
    constants.MaxUint256,
    feeManagerAddress,
  )

  const toPayment = () => {
    router.query.show = "payment"
    router.push(router)
  }

  useEffect(() => {
    const handler = async () => {
      if (!signerAddress) return
      setFeeSymbol(await feeToken.symbol())
      setFeesPaused(await feeManager.paused())
      setIsPastDue(await stableCredit.isPastDue(signerAddress))
    }
    if (signerAddress && feeToken && feeManager && stableCredit) handler()
  }, [feeToken, feeManager, signerAddress])

  return (
    <Modal isCentered size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Transfer Credits</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            address: "",
            amount: undefined,
          }}
          onSubmit={async ({ address, amount }, { resetForm }) => {
            if (!amount || !signerAddress) return
            if (!feesPaused && !sufficient) return
            await transfer(address, amount)
            await getMember(signerAddress)
          }}
        >
          {({ handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Stack minH="15em">
                  {isPastDue ? (
                    <Stack>
                      <Divider mb="1em" />
                      <Text>
                        Your account is{" "}
                        <span style={{ fontStyle: "italic" }}>past due.</span>{" "}
                        To unfreeze your credit line, reduce your debt to zero.
                      </Text>
                      <UnorderedList ml="2em !important">
                        <ListItem>
                          Aquire more credits from other network members.
                        </ListItem>
                        <ListItem>
                          Make a credit{" "}
                          <Link
                            textDecoration={"underline"}
                            onClick={toPayment}
                            fontWeight={"bold"}
                          >
                            payment.
                          </Link>
                        </ListItem>
                      </UnorderedList>
                      <Divider mt="1em !important" />
                    </Stack>
                  ) : signerAddress &&
                    approvalState !== ApprovalState.APPROVED ? (
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
                        <Text>Approve USDC for network transaction fees.</Text>
                      </Stack>
                    </Stack>
                  ) : (
                    <Stack w="100%" p="1em" borderRadius="lg">
                      <FormControl
                        mb="1em"
                        isInvalid={!!errors.address && touched.address}
                      >
                        <FormLabel htmlFor="address">
                          Recipient Address
                        </FormLabel>
                        <Field
                          as={Input}
                          id="address"
                          name="address"
                          type="address"
                          placeholder="0x000...000"
                          validate={(value) => {
                            let error
                            if (!ethers.utils.isAddress(value)) {
                              error = "Invalid address"
                            }
                            return error
                          }}
                        />
                        <FormErrorMessage>{errors.address}</FormErrorMessage>
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="amount">Amount</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>$</InputLeftAddon>
                          <Field
                            as={Input}
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="0"
                          />
                        </InputGroup>
                      </FormControl>
                      <Divider mt={"1em !important"} />
                      <TransactionFee
                        creditAmount={values.amount}
                        sufficient={sufficient}
                        setSufficient={setSufficient}
                      />
                      <Divider my={".5em !important"} />
                    </Stack>
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter>
                {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button> */}
                {signerAddress && approvalState !== ApprovalState.APPROVED ? (
                  <Button
                    w="100%"
                    mb="1em"
                    variant="solid"
                    onClick={approve}
                    isLoading={approving}
                    loadingText="Approving"
                  >
                    Approve {feeTokenSymbol}
                  </Button>
                ) : (
                  <HStack w="100%" mt="1em">
                    <Button
                      isDisabled={!sufficient}
                      isLoading={loading}
                      w="100%"
                      type="submit"
                    >
                      Send
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
