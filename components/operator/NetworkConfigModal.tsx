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
import { useState } from "react"

export const NetworkConfigModal = ({ isOpen, onClose }: ModalProps) => {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Configure Network</ModalHeader>
        <HStack py=".5em" px="1.5em">
          <Divider />
        </HStack>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Formik
            initialValues={{
              creditExpiration: 0,
              pastDueExpiration: 0,
            }}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="pastDueExpiration">
                    Credit past due
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>days</InputLeftAddon>
                    <Field
                      as={Input}
                      id="pastDueExpiration"
                      name="pastDueExpiration"
                      type="number"
                      placeholder="0"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt="1em">
                  <FormLabel htmlFor="creditExpiration">
                    Credit expiration
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>days</InputLeftAddon>
                    <Field
                      as={Input}
                      id="creditExpiration"
                      name="creditExpiration"
                      type="number"
                      placeholder="0"
                    />
                  </InputGroup>
                </FormControl>
                <HStack mt="1em" justifyContent="flex-end" py="1em">
                  <Button isLoading={loading} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="ghost" type="submit">
                    Update
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
