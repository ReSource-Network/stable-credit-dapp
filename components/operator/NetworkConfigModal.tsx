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
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react"
import { Button, Input, HStack, Divider } from "@chakra-ui/react"
import { Formik, Field } from "formik"
import { useUpdateCreditExpiration } from "../../hooks/useUpdateCreditExpiration"

export const NetworkConfigModal = ({ isOpen, onClose }: ModalProps) => {
  const {
    updatePastDue,
    updateExpiration,
    refetch,
    pastDue,
    expiration,
    loading,
  } = useUpdateCreditExpiration()

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
            enableReinitialize
            initialValues={{
              pastDueExpiration: pastDue.toNumber(),
              creditExpiration: expiration.toNumber(),
            }}
            onSubmit={async ({ pastDueExpiration, creditExpiration }) => {
              if (pastDueExpiration != pastDue.toNumber())
                await updatePastDue(pastDueExpiration)
              if (creditExpiration != expiration.toNumber())
                await updateExpiration(creditExpiration)
              refetch()
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl
                  isInvalid={
                    !!errors.pastDueExpiration && touched.pastDueExpiration
                  }
                >
                  <FormLabel htmlFor="pastDueExpiration">
                    Credit past due
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>seconds</InputLeftAddon>
                    <Field
                      as={Input}
                      id="pastDueExpiration"
                      name="pastDueExpiration"
                      type="number"
                      placeholder="0"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl
                  mt="1em"
                  isInvalid={
                    !!errors.creditExpiration && touched.creditExpiration
                  }
                >
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
