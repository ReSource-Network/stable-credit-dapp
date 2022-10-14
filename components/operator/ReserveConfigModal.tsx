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
  InputRightAddon,
} from "@chakra-ui/react"
import { Button, Input, HStack, Divider } from "@chakra-ui/react"
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import { useState } from "react"

export const ReserveConfigModal = ({ isOpen, onClose }: ModalProps) => {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    onClose()
  }

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Configure Reserve</ModalHeader>
        <HStack py=".5em" px="1.5em">
          <Divider />
        </HStack>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Formik
            initialValues={{
              estDefaultRate: undefined,
              operatorMargin: undefined,
            }}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel htmlFor="estDefaultRate">
                    Estimated Default Rate
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="estDefaultRate"
                      name="estDefaultRate"
                      type="number"
                      placeholder="0"
                    />
                    <InputRightAddon>%</InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl mt="1em">
                  <FormLabel htmlFor="operatorMargin">
                    Operator Margin
                  </FormLabel>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="operatorMargin"
                      name="operatorMargin"
                      type="number"
                      placeholder="0"
                    />
                    <InputRightAddon>%</InputRightAddon>
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
