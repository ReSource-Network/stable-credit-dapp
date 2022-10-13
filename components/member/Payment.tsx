import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
} from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { Stack, Text } from "@chakra-ui/react"
import { FeeTokenBalance } from "./FeeTokenBalance"
import { ManageMember } from "../../hooks/useGetMember"
import { useAccount } from "wagmi"
import { useRepayCredits } from "../../hooks/useRepayCredits"
import {
  ApprovalState,
  useApproveFeeToken,
} from "../../hooks/useApproveFeeToken"
import { constants } from "ethers/lib/ethers"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { useIsMounted } from "../../hooks/useIsMounted"

export const Payment = ({ getMember }: ManageMember) => {
  const { repay, loading } = useRepayCredits()
  const stableCredit = useStableCreditContract()
  const { approve, approving, approvalState } = useApproveFeeToken(
    constants.MaxUint256,
    stableCredit?.address,
  )
  const isMounted = useIsMounted()
  const { address } = useAccount()

  console.log(approvalState)

  if (address && isMounted && approvalState !== ApprovalState.APPROVED)
    return (
      <Button
        w="100%"
        variant="solid"
        onClick={approve}
        isLoading={approving}
        loadingText="Approving"
      >
        Approve FeeToken
      </Button>
    )

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Make a Payment
      </Text>
      <Formik
        initialValues={{
          amount: 0,
        }}
        onSubmit={async ({ amount }, { resetForm }) => {
          if (!address) return
          await repay(amount)
          await getMember(address)
          resetForm({ values: { amount: 0 } })
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack w="100%" p="1em" borderRadius="lg">
              <FeeTokenBalance />
              <FormControl>
                <FormLabel htmlFor="address">Amount</FormLabel>
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
            </Stack>
            <HStack w="100%" mt="1em">
              <Button w="100%" type="submit">
                Pay
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Stack>
  )
}
