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
  Stack,
  Text,
  SlideFade,
} from "@chakra-ui/react"
import { Button, Input, HStack, Divider } from "@chakra-ui/react"
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import { useCreateCreditLine } from "../../../hooks/useCreateCreditLine"
import { useEffect, useState } from "react"
import { useFeeManagerContract } from "../../../hooks/useFeeManagerContract"
import { PaymentCapacity } from "./PaymentCapacity"
import { PaymentHistory } from "./PaymentHistory"

export const AddMemberModal = ({ isOpen, onClose }: ModalProps) => {
  const { loading, createCreditLine } = useCreateCreditLine()
  const feeManager = useFeeManagerContract()
  const [targetFeeRate, setTargetFeeRate] = useState<number | undefined>()
  const [step, setStep] = useState(0)

  const handleClose = () => {
    setStep(0)
    onClose()
  }

  useEffect(() => {
    const handler = async () => {
      setTargetFeeRate((await feeManager.targetFeeRate()).toNumber() / 10000)
    }
    if (feeManager) handler()
  }, [feeManager])

  let title = ""
  if (step === 0) title = "Add Member"
  if (step === 1) title = "Member Payment History"
  if (step === 2) title = "Member Payment Capacity"
  if (step === 3) title = "Credit Line Terms"

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent margin="auto">
        <ModalHeader>{title}</ModalHeader>
        <HStack py=".5em" px="1.5em">
          <Divider />
        </HStack>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Formik
            initialValues={{
              address: "",
              creditLimit: undefined,
              pastDueDays: 50,
              defaultDays: 100,
              feeRate: undefined,
            }}
            onSubmit={async (
              { address, creditLimit, pastDueDays, defaultDays, feeRate },
              { resetForm },
            ) => {
              if (!creditLimit || !address || !pastDueDays || !defaultDays)
                return
              await createCreditLine(
                address,
                creditLimit,
                pastDueDays,
                defaultDays,
                feeRate || 0,
              )
              resetForm()
              handleClose()
            }}
          >
            {({
              handleSubmit,
              values,
              setValues,
              validateField,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack>
                  {step === 0 && (
                    <SlideFade in={step === 0} offsetX="100px" offsetY="0">
                      <FormControl mb="1em" isInvalid={!!errors.address}>
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
                    </SlideFade>
                  )}
                  {step === 1 && (
                    <SlideFade in={step === 1} offsetX="100px" offsetY="0">
                      <PaymentHistory />
                    </SlideFade>
                  )}
                  {step === 2 && (
                    <SlideFade in={step === 2} offsetX="100px" offsetY="0">
                      <PaymentCapacity />
                    </SlideFade>
                  )}
                  {step === 3 && (
                    <SlideFade in={step === 3} offsetX="100px" offsetY="0">
                      <Stack>
                        <FormControl isInvalid={!!errors.creditLimit}>
                          <FormLabel htmlFor="creditLimit">
                            Credit Limit
                          </FormLabel>
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
                                if (!value || value <= 0) {
                                  error = "Invalid credit limit"
                                  return error
                                }
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.creditLimit}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          mt="1em"
                          isInvalid={
                            !!errors.pastDueDays && touched.pastDueDays
                          }
                        >
                          <FormLabel htmlFor="pastDueDays">
                            Credit past due
                          </FormLabel>
                          <InputGroup>
                            <InputLeftAddon>days</InputLeftAddon>
                            <Field
                              as={Input}
                              id="pastDueDays"
                              name="pastDueDays"
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
                          <FormErrorMessage>
                            {errors.pastDueDays}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          mt="1em"
                          isInvalid={
                            !!errors.defaultDays && touched.defaultDays
                          }
                        >
                          <FormLabel htmlFor="defaultDays">
                            Credit default
                          </FormLabel>
                          <InputGroup>
                            <InputLeftAddon>days</InputLeftAddon>
                            <Field
                              as={Input}
                              id="defaultDays"
                              name="defaultDays"
                              type="number"
                              placeholder="0"
                              validate={(value) => {
                                let error
                                if (value <= values.pastDueDays) {
                                  error =
                                    "default time must be greater than past due time"
                                  return error
                                }
                              }}
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {errors.defaultDays}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          mt="1em"
                          isInvalid={!!errors.feeRate && touched.feeRate}
                        >
                          <FormLabel htmlFor="feeRate">
                            Transaction Fee Weight
                          </FormLabel>
                          <InputGroup>
                            <InputLeftAddon>%</InputLeftAddon>
                            <Field
                              as={Input}
                              id="feeRate"
                              name="feeRate"
                              type="number"
                              placeholder={targetFeeRate}
                            />
                          </InputGroup>
                          <FormErrorMessage>{errors.feeRate}</FormErrorMessage>
                        </FormControl>
                      </Stack>
                    </SlideFade>
                  )}
                  <HStack justifyContent={"space-between"}>
                    <Text alignSelf={"flex-end"} mb="1em" fontSize={"sm"}>
                      {step + 1} / 4
                    </Text>
                    <HStack mt="1em" justifyContent="flex-end" py="1em">
                      {step === 0 && (
                        <Button
                          isLoading={loading}
                          variant="ghost"
                          onClick={async () => {
                            const error = await validateField("address")
                            // @ts-ignore
                            if (!error) setStep(3)
                          }}
                        >
                          Skip
                        </Button>
                      )}
                      <Button
                        isLoading={loading}
                        variant="ghost"
                        onClick={() => {
                          if (step === 0) return handleClose()
                          setStep(step - 1)
                        }}
                      >
                        {step === 0 ? "Cancel" : "Back"}
                      </Button>
                      <Button
                        w="6em"
                        type={"button"}
                        isLoading={loading}
                        onClick={() => {
                          if (step === 3) return handleSubmit()
                          validateField("address")
                          if (!!errors.address || !values.address) return
                          setStep(step + 1)
                        }}
                      >
                        {step === 3 ? "Add" : "Next"}
                      </Button>
                    </HStack>
                  </HStack>
                </Stack>
              </form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export interface UnderwritingProps {
  creditLimit?: number
  setCreditLimit?: (val: number) => void
  pastDueDays?: number
  setPastDueDays?: (val: number) => void
  defaultDays?: number
  setDefaultDays?: (val: number) => void
  feeRate?: number
  setFeeRate?: (val: number) => void
}
