import {
  HStack,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
  FormLabel,
  Button,
  FormControl,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import { useState } from "react"
import { Stack, Text } from "@chakra-ui/react"
export const Transfer = () => {
  const [loading, setLoading] = useState(false)

  return (
    <Stack w="100%">
      <Text alignSelf="center" fontWeight="bold" fontSize="2xl" variant="title">
        Transfer
      </Text>
      <Formik
        initialValues={{
          address: "",
          amount: 0,
        }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack w="100%" bgColor="white" p="1em" borderRadius="lg">
              <FormControl
                mb="1em"
                isInvalid={!!errors.address && touched.amount}
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

                    console.log(value)
                    console.log(ethers.utils.isAddress(value))
                    return error
                  }}
                />
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              </FormControl>
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
                Send
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Stack>
  )
}
