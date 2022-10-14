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

export const Transfer = ({ getMember }: ManageMember) => {
  const { transfer, loading } = useTransferCredits()
  const { address: signerAddress } = useAccount()
  const { feeManager: feeManagerAddress } = useNetworkAddresses()
  const [feeTokenSymbol, setFeeSymbol] = useState("")
  const [feesPaused, setFeesPaused] = useState(false)
  const [sufficient, setSufficient] = useState(false)
  const feeToken = useFeeTokenContract()
  const feeManager = useFeeManagerContract()

  const { approve, approving, approvalState } = useApproveFeeToken(
    constants.MaxUint256,
    feeManagerAddress,
  )

  useEffect(() => {
    const handler = async () => {
      if (!signerAddress) return
      setFeeSymbol(await feeToken.symbol())
      setFeesPaused(await feeManager.paused())
    }
    if (signerAddress && feeToken && feeManager) handler()
  }, [feeToken, feeManager, signerAddress])

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Transfer
      </Text>
      {signerAddress && approvalState !== ApprovalState.APPROVED ? (
        <Button
          w="100%"
          variant="solid"
          onClick={approve}
          isLoading={approving}
          loadingText="Approving"
        >
          Approve {feeTokenSymbol}
        </Button>
      ) : (
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
              <Stack w="100%" p="1em" borderRadius="lg">
                <FormControl
                  mb="1em"
                  isInvalid={!!errors.address && touched.address}
                >
                  <FormLabel htmlFor="address">Recipient Address</FormLabel>
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
            </form>
          )}
        </Formik>
      )}
    </Stack>
  )
}
