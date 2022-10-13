import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react"
import { Button, Input, HStack, Divider } from "@chakra-ui/react"
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import { useCreateCreditLine } from "../../hooks/useCreateCreditLine"

export const AddMemberModal = ({ isOpen, onClose }: ModalProps) => {
  const { loading, createCreditLine } = useCreateCreditLine()

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Member</ModalHeader>
        <HStack py=".5em" px="1.5em">
          <Divider />
        </HStack>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Formik
            initialValues={{
              address: "",
              creditLimit: undefined,
              pastDueSeconds: undefined,
              defaultSeconds: undefined,
            }}
            onSubmit={({
              address,
              creditLimit,
              pastDueSeconds,
              defaultSeconds,
            }) => {
              if (!creditLimit || !pastDueSeconds || !defaultSeconds) return
              createCreditLine(
                address,
                creditLimit,
                pastDueSeconds,
                defaultSeconds,
              )
            }}
          >
            {({ handleSubmit, values, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  mb="1em"
                  isInvalid={!!errors.address && touched.creditLimit}
                >
                  <FormLabel htmlFor="address">Address</FormLabel>
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
                  <FormLabel htmlFor="creditLimit">Credit Limit</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>$</InputLeftAddon>
                    <Field
                      as={Input}
                      id="creditLimit"
                      name="creditLimit"
                      type="number"
                      placeholder="0"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  mt="1em"
                  isInvalid={!!errors.pastDueSeconds && touched.pastDueSeconds}
                >
                  <FormLabel htmlFor="pastDueSeconds">
                    Credit past due
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>seconds</InputLeftAddon>
                    <Field
                      as={Input}
                      id="pastDueSeconds"
                      name="pastDueSeconds"
                      type="number"
                      placeholder="0"
                      validate={(value) => {
                        let error
                        if (value <= 0) {
                          error = "past due time must be greater than 0"
                          return error
                        }
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.pastDueSeconds}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt="1em"
                  isInvalid={!!errors.defaultSeconds && touched.defaultSeconds}
                >
                  <FormLabel htmlFor="defaultSeconds">Credit default</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>seconds</InputLeftAddon>
                    <Field
                      as={Input}
                      id="defaultSeconds"
                      name="defaultSeconds"
                      type="number"
                      placeholder="0"
                      validate={(value) => {
                        let error
                        if (!values.pastDueSeconds) return
                        if (value <= values.pastDueSeconds) {
                          error =
                            "default time must be greater than past due time"
                          return error
                        }
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.defaultSeconds}</FormErrorMessage>
                </FormControl>
                <HStack mt="1em" justifyContent="flex-end" py="1em">
                  <Button isLoading={loading} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button isLoading={loading} variant="ghost" type="submit">
                    Create
                  </Button>
                </HStack>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
