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
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import { Stack, Text, LightMode } from "@chakra-ui/react"
import { ManageMember } from "../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { useTransferCredits } from "../../hooks/useTransferCredits"
import { TransactionFee } from "./TransactionFee"

export const Transfer = ({ getMember }: ManageMember) => {
  const { transfer, loading } = useTransferCredits()
  const { address: signerAddress } = useAccount()

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Transfer
      </Text>
      <Formik
        initialValues={{
          address: "",
          amount: undefined,
        }}
        onSubmit={async ({ address, amount }, { resetForm }) => {
          console.log(amount)
          if (!amount || !signerAddress) return
          await transfer(address, amount)
          await getMember(signerAddress)
          // await resetForm({ values: { address: "", amount: 0 } })
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
                <LightMode>
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
                </LightMode>
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
              <TransactionFee creditAmount={values.amount} />
              <Divider my={".5em !important"} />
            </Stack>
            <HStack w="100%" mt="1em">
              <Button isLoading={loading} w="100%" type="submit">
                Send
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Stack>
  )
}
