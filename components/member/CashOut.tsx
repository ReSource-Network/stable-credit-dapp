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
import { useState } from "react"
import { Stack, Text, LightMode } from "@chakra-ui/react"
export const CashOut = () => {
  const networkDebt = 1042

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
