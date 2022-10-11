import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { useEffect, useState } from "react"
import { Stack, Text, LightMode } from "@chakra-ui/react"
import { useStableCreditContract } from "../../hooks/useStableCreditContract"
import { useAccount } from "wagmi"
import { formatStableCredits } from "../../functions/bignumber"
export const CashOut = () => {
  const stableCredit = useStableCreditContract()
  const [networkDebt, setNetworkDebt] = useState(0)
  const { address } = useAccount()

  useEffect(() => {
    const handler = async () => {
      if (!address) return
      setNetworkDebt(
        Number(formatStableCredits(await stableCredit.networkDebt())),
      )
    }
    if (address && stableCredit) handler()
  }, [stableCredit, address])

  return (
    <Stack w="100%">
      <LightMode>
        <Text
          alignSelf="center"
          fontWeight="bold"
          fontSize="2xl"
          variant="title"
        >
          Cash Out
        </Text>
        <Formik
          initialValues={{
            amount: 0,
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Stack w="100%" bgColor="white" p="1em" borderRadius="lg">
                <FormControl>
                  <FormLabel htmlFor="address">Amount</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>$</InputLeftAddon>
                    <Field
                      as={Input}
                      borderColor="#dcdcdc !important"
                      _placeholder={{ color: "gray.300" }}
                      id="amount"
                      name="amount"
                      type="number"
                      placeholder="0"
                    />
                  </InputGroup>
                  <FormHelperText>Maximum {networkDebt}</FormHelperText>
                </FormControl>
              </Stack>
              <HStack w="100%" mt="1em">
                <Button w="100%" type="submit">
                  Cash Out
                </Button>
              </HStack>
            </form>
          )}
        </Formik>
      </LightMode>
    </Stack>
  )
}
