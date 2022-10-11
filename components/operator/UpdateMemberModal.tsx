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
  Text,
  Divider,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Button, Input, HStack } from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { Member } from "./Members"
import { useUpdateCreditLine } from "../../hooks/useUpdateCreditLine"

interface UpdateMemberModalProps extends ModalProps {
  member?: Member
}

export const UpdateMemberModal = ({
  isOpen,
  onClose,
  member,
}: UpdateMemberModalProps) => {
  const handleClose = () => {
    onClose()
  }

  const { loading, updateCreditLine } = useUpdateCreditLine()

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Extend Credit Limit:
          <Text fontSize="13px" opacity=".5">
            {member?.address}
          </Text>
          <Divider mt="1em" />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              creditLimit: member?.creditLimit || 0,
            }}
            onSubmit={({ creditLimit }) => {
              if (!member) return
              updateCreditLine(member.address, creditLimit)
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  isInvalid={!!errors.creditLimit && touched.creditLimit}
                >
                  <FormLabel htmlFor="creditLimit">Credit Limit</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>$</InputLeftAddon>
                    <Field
                      as={Input}
                      id="creditLimit"
                      name="creditLimit"
                      type="number"
                      placeholder="0"
                      validate={(value) => {
                        let error
                        if (!member) {
                          error = "Invalid member address"
                          return error
                        }
                        if (member && value <= member?.creditLimit) {
                          error = "credit limit can only be extended"
                          return error
                        }
                      }}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.creditLimit}</FormErrorMessage>
                </FormControl>
                <HStack mt="1em" justifyContent="flex-end" py="1em">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button isLoading={loading} variant="ghost" type="submit">
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
