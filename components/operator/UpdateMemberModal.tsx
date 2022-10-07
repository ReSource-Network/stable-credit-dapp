import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormControl,
  Text,
  Divider,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react"
import { Button, Input, HStack } from "@chakra-ui/react"
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import React, { useState } from "react"
import { Member } from "./Members"

interface UpdateMemberModalProps extends ModalProps {
  member?: Member
}

export const UpdateMemberModal = ({
  isOpen,
  onClose,
  member,
}: UpdateMemberModalProps) => {
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    onClose()
  }

  console.log(member)

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Update Member:
          <Text fontSize="13px" opacity=".5">
            {member?.address}
          </Text>
          <Divider mt="1em" />
        </ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Formik
            initialValues={{
              creditLimit: member?.creditLimit || 0,
            }}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
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
