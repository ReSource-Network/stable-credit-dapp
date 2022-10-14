import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
  FormErrorMessage,
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
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"
import { useEffect, useState } from "react"
import { formatEther } from "ethers/lib/utils"

export const Payment = ({ getMember, member }: ManageMember) => {
  const { repay, loading } = useRepayCredits()
  const stableCredit = useStableCreditContract()
  const { approve, approving, approvalState } = useApproveFeeToken(
    constants.MaxUint256,
    stableCredit?.address,
  )
  const { address } = useAccount()
  const feeToken = useFeeTokenContract()
  const [feeTokenSymbol, setFeeSymbol] = useState("")
  const [feeTokenBalance, setFeeTokenBalance] = useState(0)

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setFeeSymbol(await feeToken.symbol())
      const _feeTokenBalance = Number(
        formatEther(await feeToken.balanceOf(address)),
      )
      setFeeTokenBalance(_feeTokenBalance)
    }
    if (address && feeToken) handler()
  }, [feeToken, address])

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Make a Payment
      </Text>
      {address && approvalState !== ApprovalState.APPROVED ? (
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
            amount: undefined,
          }}
          validateOnChange={true}
          onSubmit={async ({ amount }) => {
            if (!address || !amount) return
            await repay(amount)
            await getMember(address)
          }}
        >
          {({ handleSubmit, setValues, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Stack w="100%" py="1em" borderRadius="lg">
                <FeeTokenBalance />
                <HStack>
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
                          let error
                          if (value > feeTokenBalance) {
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
                      if (Math.abs(member.balance) <= feeTokenBalance)
                        setValues({ amount: Math.abs(member.balance) })
                      else setValues({ amount: feeTokenBalance })
                    }}
                    alignSelf={"flex-end"}
                  >
                    Max
                  </Button>
                </HStack>
              </Stack>
              <HStack w="100%" mt="1em">
                <Button isLoading={loading} w="100%" type="submit">
                  Pay
                </Button>
              </HStack>
            </form>
          )}
        </Formik>
      )}
    </Stack>
  )
}
