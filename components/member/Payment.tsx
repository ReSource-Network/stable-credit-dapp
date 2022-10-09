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
import { useState } from "react"
import { Stack, Text } from "@chakra-ui/react"
export const Payment = () => {
  const [loading, setLoading] = useState(false)
  const feeTokenName = "USDC"
  const feeTokenBalance = 123

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Make a Payment
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
              <HStack justifyContent="space-between" my="1em">
                <Text>{feeTokenName} balance:</Text>
                <Text fontSize="lg" fontWeight="bold">
                  ${feeTokenBalance}
                </Text>
              </HStack>
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
