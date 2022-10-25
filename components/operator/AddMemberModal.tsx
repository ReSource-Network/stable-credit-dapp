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
  Slider,
  SliderMark,
  SliderTrack,
  Tooltip,
  SliderFilledTrack,
  SliderThumb,
  Stack,
  Box,
  Text,
  Collapse,
} from "@chakra-ui/react"
import { Button, Input, HStack, Divider } from "@chakra-ui/react"
import { ethers } from "ethers"
import { Formik, Field } from "formik"
import { useCreateCreditLine } from "../../hooks/useCreateCreditLine"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBullseye, faCircle } from "@fortawesome/free-solid-svg-icons"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"

export const AddMemberModal = ({ isOpen, onClose }: ModalProps) => {
  const { loading, createCreditLine } = useCreateCreditLine()
  const feeManager = useFeeManagerContract()

  const [advanced, setAdvanced] = useState(false)

  const [history, setHistory] = useState(50)
  const [reliablity, setReliablity] = useState(50)
  const [payCap, setPayCap] = useState(50)
  const [prodCap, setProdCap] = useState(50)
  const [consumptionCap, setConsumptionCap] = useState(50)

  const [defaultFeeRate, setDefaultFeeRate] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    const handler = async () => {
      setDefaultFeeRate(
        (await feeManager.defaultFeePercent()).toNumber() / 10000,
      )
    }
    if (feeManager) handler()
  }, [feeManager])

  const translateHistory = (val: number) => {
    setHistory(val)
    var pastDueDays = 1,
      defaultDays = 2,
      feeRate = 1

    pastDueDays = pastDueDays * val + 10
    defaultDays = defaultDays * val + 10

    feeRate = defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [pastDueDays, defaultDays, feeRate]
  }

  const translateReliablity = (val: number) => {
    setReliablity(val)
    var pastDueDays = 1,
      defaultDays = 2,
      feeRate = 1

    pastDueDays = pastDueDays * val + 10
    defaultDays = defaultDays * val + 10

    feeRate = defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [pastDueDays, defaultDays, feeRate]
  }
  const translatePayCap = (val: number) => {
    setPayCap(val)
    var pastDueDays = 1,
      defaultDays = 2,
      feeRate = 1

    pastDueDays = pastDueDays * val + 10
    defaultDays = defaultDays * val + 10

    feeRate = defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [pastDueDays, defaultDays, feeRate]
  }
  const translateProdCap = (val: number) => {
    setProdCap(val)
    var pastDueDays = 1,
      defaultDays = 2,
      feeRate = 1

    pastDueDays = pastDueDays * val + 10
    defaultDays = defaultDays * val + 10

    feeRate = defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [pastDueDays, defaultDays, feeRate]
  }
  const translateConsuptionCap = (val: number) => {
    setConsumptionCap(val)
    var pastDueDays = 1,
      defaultDays = 2,
      feeRate = 1

    pastDueDays = pastDueDays * val + 10
    defaultDays = defaultDays * val + 10

    feeRate = defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [pastDueDays, defaultDays, feeRate]
  }

  return (
    <Modal isCentered size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent margin="auto">
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
              pastDueDays: 50,
              defaultDays: 100,
              feeRate: defaultFeeRate,
            }}
            onSubmit={({
              address,
              creditLimit,
              pastDueDays,
              defaultDays,
              feeRate,
            }) => {
              if (
                !creditLimit ||
                !address ||
                !pastDueDays ||
                !defaultDays ||
                !feeRate
              )
                return
              createCreditLine(
                address,
                creditLimit,
                pastDueDays,
                defaultDays,
                feeRate,
              )
            }}
          >
            {({ handleSubmit, values, setValues, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Stack>
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

                  <Stack mb="2em !important">
                    <FormLabel htmlFor="creditLimit">History Score</FormLabel>

                    <Slider
                      id="slider"
                      defaultValue={50}
                      min={0}
                      max={100}
                      onChange={(v) => {
                        var [pastDueDays, defaultDays, feeRate] =
                          translateHistory(v)
                        setValues({
                          ...values,
                          pastDueDays,
                          defaultDays,
                          feeRate,
                        })
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <SliderMark value={0} mt=".5em" fontSize="sm">
                        Low
                      </SliderMark>
                      <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                        Medium
                      </SliderMark>
                      <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                        High
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${history}`}
                      >
                        <SliderThumb>
                          <FontAwesomeIcon icon={faBullseye} />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  </Stack>
                  <Stack mb="2em !important">
                    <FormLabel htmlFor="creditLimit">
                      Reliability Score
                    </FormLabel>

                    <Slider
                      id="slider"
                      defaultValue={50}
                      min={0}
                      max={100}
                      onChange={(v) => {
                        var [pastDueDays, defaultDays, feeRate] =
                          translateReliablity(v)
                        setValues({
                          ...values,
                          pastDueDays,
                          defaultDays,
                          feeRate,
                        })
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <SliderMark value={0} mt=".5em" fontSize="sm">
                        Low
                      </SliderMark>
                      <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                        Medium
                      </SliderMark>
                      <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                        High
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${reliablity}`}
                      >
                        <SliderThumb>
                          <FontAwesomeIcon icon={faBullseye} />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  </Stack>
                  <Stack mb="2em !important">
                    <FormLabel htmlFor="creditLimit">
                      Payment Capacity Score
                    </FormLabel>

                    <Slider
                      id="slider"
                      defaultValue={50}
                      min={0}
                      max={100}
                      onChange={(v) => {
                        var [pastDueDays, defaultDays, feeRate] =
                          translatePayCap(v)
                        setValues({
                          ...values,
                          pastDueDays,
                          defaultDays,
                          feeRate,
                        })
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <SliderMark value={0} mt=".5em" fontSize="sm">
                        Low
                      </SliderMark>
                      <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                        Medium
                      </SliderMark>
                      <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                        High
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${payCap}`}
                      >
                        <SliderThumb>
                          <FontAwesomeIcon icon={faBullseye} />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  </Stack>
                  <Stack mb="2em !important">
                    <FormLabel htmlFor="creditLimit">
                      Production Capacity Score
                    </FormLabel>

                    <Slider
                      id="slider"
                      defaultValue={50}
                      min={0}
                      max={100}
                      onChange={(v) => {
                        var [pastDueDays, defaultDays, feeRate] =
                          translateProdCap(v)
                        setValues({
                          ...values,
                          pastDueDays,
                          defaultDays,
                          feeRate,
                        })
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <SliderMark value={0} mt=".5em" fontSize="sm">
                        Low
                      </SliderMark>
                      <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                        Medium
                      </SliderMark>
                      <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                        High
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${prodCap}`}
                      >
                        <SliderThumb>
                          <FontAwesomeIcon icon={faBullseye} />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  </Stack>
                  <Stack mb="2em !important">
                    <FormLabel htmlFor="creditLimit">
                      Consumption Capacity Score
                    </FormLabel>

                    <Slider
                      id="slider"
                      defaultValue={50}
                      min={0}
                      max={100}
                      onChange={(v) => {
                        var [pastDueDays, defaultDays, feeRate] =
                          translateConsuptionCap(v)
                        setValues({
                          ...values,
                          pastDueDays,
                          defaultDays,
                          feeRate,
                        })
                      }}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <SliderMark value={0} mt=".5em" fontSize="sm">
                        Low
                      </SliderMark>
                      <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                        Medium
                      </SliderMark>
                      <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                        High
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        color="white"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${consumptionCap}`}
                      >
                        <SliderThumb>
                          <FontAwesomeIcon icon={faBullseye} />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  </Stack>

                  <Divider opacity="1" mt="2em !important" />
                  <Stack>
                    <Button
                      w="fit-content"
                      alignSelf={"center"}
                      onClick={() => setAdvanced(!advanced)}
                      variant={"ghost"}
                      mt="1em !important"
                      size="sm"
                    >
                      {advanced ? "Hide " : "Show "}Advanced
                    </Button>
                  </Stack>
                  <Collapse in={advanced} animateOpacity>
                    <Stack>
                      <FormControl>
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
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl
                        mt="1em"
                        isInvalid={!!errors.pastDueDays && touched.pastDueDays}
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
                              if (!advanced) return
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
                        isInvalid={!!errors.defaultDays && touched.defaultDays}
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
                              if (!values.pastDueDays || !advanced) return
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
                          Transaction Fee Rate
                        </FormLabel>
                        <InputGroup>
                          <InputLeftAddon>%</InputLeftAddon>
                          <Field
                            as={Input}
                            id="feeRate"
                            name="feeRate"
                            type="number"
                            placeholder="0"
                          />
                        </InputGroup>
                        <FormErrorMessage>{errors.feeRate}</FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </Collapse>
                  <HStack mt="1em" justifyContent="flex-end" py="1em">
                    <Button isLoading={loading} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button isLoading={loading} variant="ghost" type="submit">
                      Create
                    </Button>
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
