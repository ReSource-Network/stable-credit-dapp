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
  Stack,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  Collapse,
  InputLeftAddon,
} from "@chakra-ui/react"
import { Button, Input, HStack, Divider } from "@chakra-ui/react"
import { faBullseye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Formik, Field } from "formik"
import { useEffect, useState } from "react"
import { useFeeManagerContract } from "../../hooks/useFeeManagerContract"
import { useReservePoolContract } from "../../hooks/useReservePoolContract"

export const ReserveConfigModal = ({ isOpen, onClose }: ModalProps) => {
  const [loading, setLoading] = useState(false)
  const feeManager = useFeeManagerContract()
  const reservePool = useReservePoolContract()
  const [defaultFeeRate, setDefaultFeeRate] = useState(0)
  const [minRTD, setMinRTD] = useState(0)

  const [showTooltip, setShowTooltip] = useState(false)
  const [advanced, setAdvanced] = useState(false)

  const [txVolume, setTxVolume] = useState(0)
  const [defaultRate, setDefaultRate] = useState(50)
  const [operatorMargin, setOperatorMargin] = useState(50)

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    const handler = async () => {
      setDefaultFeeRate(
        (await feeManager.defaultFeePercent()).toNumber() / 10000,
      )
      setMinRTD((await reservePool.minRTD()).toNumber() / 10000)
    }
    if (feeManager && reservePool) handler()
  }, [feeManager, reservePool])

  const translateTxVolume = (val: number) => {
    setTxVolume(val)

    var minRTD = 1

    var txFeeRate =
      defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [txFeeRate, minRTD]
  }

  const translateDefaultRate = (val: number) => {
    setDefaultRate(val)

    var minRTD = 1

    var txFeeRate =
      defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [txFeeRate, minRTD]
  }

  const translateOperatorMargin = (val: number) => {
    setOperatorMargin(val)

    var minRTD = 1

    var txFeeRate =
      defaultFeeRate - defaultFeeRate * (val / 100) + defaultFeeRate / 2

    return [txFeeRate, minRTD]
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
              minRTD: undefined || 0,
              txFeeRate: undefined || 0,
            }}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {({ handleSubmit, setValues, values, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <FormControl pb="1em !important">
                  <FormLabel>Estimated Transaction Volume</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>tx</InputLeftAddon>

                    <Input
                      value={txVolume}
                      type="number"
                      onChange={(e) =>
                        translateTxVolume(Number(e.target.value))
                      }
                      placeholder="0"
                    />
                  </InputGroup>
                </FormControl>

                <Stack mb="2em !important">
                  <FormLabel>Estimated Default Rate</FormLabel>
                  <Slider
                    id="slider"
                    defaultValue={50}
                    min={0}
                    max={100}
                    onChange={(v) => {
                      var [txFeeRate, minRTD] = translateDefaultRate(v)
                      setValues({
                        ...values,
                        txFeeRate,
                        minRTD,
                      })
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderMark value={0} mt=".5em" fontSize="sm">
                      0%
                    </SliderMark>
                    <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                      50%
                    </SliderMark>
                    <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                      100%
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      color="white"
                      placement="top"
                      isOpen={showTooltip}
                      label={`${defaultRate}`}
                    >
                      <SliderThumb>
                        <FontAwesomeIcon icon={faBullseye} />
                      </SliderThumb>
                    </Tooltip>
                  </Slider>
                </Stack>
                <Stack mb="2em !important">
                  <FormLabel>Desired Operator Margin</FormLabel>
                  <Slider
                    id="slider"
                    defaultValue={50}
                    min={0}
                    max={100}
                    onChange={(v) => {
                      var [txFeeRate, minRTD] = translateOperatorMargin(v)
                      setValues({
                        ...values,
                        txFeeRate,
                        minRTD,
                      })
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <SliderMark value={0} mt=".5em" fontSize="sm">
                      0%
                    </SliderMark>
                    <SliderMark value={50} mt=".5em" ml="-2em" fontSize="sm">
                      50%
                    </SliderMark>
                    <SliderMark value={100} mt=".5em" ml="-2em" fontSize="sm">
                      100%
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      color="white"
                      placement="top"
                      isOpen={showTooltip}
                      label={`${operatorMargin}`}
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
                  <FormControl>
                    <FormLabel htmlFor="minRTD">
                      Minimum Reserve To Debt Ratio
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="minRTD"
                        name="minRTD"
                        type="number"
                        placeholder={minRTD}
                      />
                      <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl mt="1em">
                    <FormLabel htmlFor="txFeeRate">
                      Default Transaction Fee Rate
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="txFeeRate"
                        name="txFeeRate"
                        type="number"
                        placeholder={defaultFeeRate}
                      />
                      <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Collapse>
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
