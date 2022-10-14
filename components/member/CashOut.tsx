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
} from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { useEffect, useState } from "react"
import { Stack, Text } from "@chakra-ui/react"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { useAccount } from "wagmi"
import { formatStableCredits } from "../../functions/bignumber"
import { FeeTokenBalance } from "./FeeTokenBalance"
import { useCashOut } from "../../hooks/useCashOut"
import { ManageMember } from "../../hooks/useGetMember"
import { useReservePoolContract } from "../../hooks/useReservePoolContract"
import { formatEther } from "ethers/lib/utils"
import { useFeeTokenContract } from "../../hooks/useFeeTokenContract"

export const CashOut = ({ getMember, member }: ManageMember) => {
  const stableCredit = useStableCreditContract()
  const [networkDebt, setNetworkDebt] = useState(0)
  const [collateral, setCollateral] = useState(0)
  const [feeTokenSymbol, setFeeTokenSymbol] = useState("")
  const { address } = useAccount()
  const { cashOut, loading } = useCashOut()
  const reservePool = useReservePoolContract()
  const feeToken = useFeeTokenContract()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setNetworkDebt(
        Number(formatStableCredits(await stableCredit.networkDebt())),
      )
      setCollateral(Number(formatEther(await reservePool.collateral())))
      setFeeTokenSymbol(await feeToken.symbol())
    }
    if (address && stableCredit && reservePool) handler()
  }, [stableCredit, address, reservePool, feeToken])

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Cash Out
      </Text>
      <Formik
        initialValues={{
          amount: undefined,
        }}
        onSubmit={async ({ amount }) => {
          if (!address || !amount) return
          await cashOut(amount)
          await getMember(address)
        }}
      >
        {({ handleSubmit, setValues, values, errors, touched }) => (
          <form onSubmit={handleSubmit}>
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
                      let error
                      if (value > networkDebt) {
                        error = `There are only ${networkDebt} credits available to reimburse`
                        return error
                      }
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.amount}</FormErrorMessage>
                <FormHelperText>Maximum {networkDebt}</FormHelperText>
              </FormControl>
              <Button
                mt="6px !important"
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
            </HStack>
            {values.amount && values.amount > collateral && (
              <FormControl mb="1em" isInvalid={true}>
                <FormErrorMessage>
                  <Text mr={"2px"}>Reserve pool is low. Only</Text>
                  <Text fontWeight={"bold"}>
                    {collateral} {feeTokenSymbol}
                  </Text>
                  <Text ml={"2px"}> available.</Text>
                </FormErrorMessage>
              </FormControl>
            )}
            <FeeTokenBalance />

            <HStack w="100%" mt="1em">
              <Button isLoading={loading} w="100%" type="submit">
                Cash Out
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Stack>
  )
}
