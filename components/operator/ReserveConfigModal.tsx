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
  const [targetFeeRate, setTargetFeeRate] = useState<undefined | number>()
  const [targetRTD, setTargetRTD] = useState<undefined | number>()

  const [showTooltip, setShowTooltip] = useState(false)
  const [advanced, setAdvanced] = useState(false)

  const [txVolume, setTxVolume] = useState<undefined | number>()
  const [defaultRate, setDefaultRate] = useState(50)
  const [operatorMargin, setOperatorMargin] = useState(50)

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    const handler = async () => {
      setTargetFeeRate((await feeManager.targetFeeRate()).toNumber() / 10000)
      setTargetRTD((await reservePool.targetRTD()).toNumber() / 10000)
    }
    if (feeManager && reservePool) handler()
  }, [feeManager, reservePool])

  const translateTxVolume = (val: number) => {
    setTxVolume(val)

    var targetRTD = 1

    var targetRTD = 1

    var txFeeRate =
      (targetFeeRate || 0) -
      (targetFeeRate || 0) * (val / 100) +
      (targetFeeRate || 0) / 2

    return [txFeeRate, targetRTD]
  }

  const translateDefaultRate = (val: number) => {
    setDefaultRate(val)

    var targetRTD = 1

    var targetRTD = 1

    var txFeeRate =
      (targetFeeRate || 0) -
      (targetFeeRate || 0) * (val / 100) +
      (targetFeeRate || 0) / 2

    return [txFeeRate, targetRTD]
  }

  const translateOperatorMargin = (val: number) => {
    setOperatorMargin(val)

    var targetRTD = 1

    var targetRTD = 1

    var txFeeRate =
      (targetFeeRate || 0) -
      (targetFeeRate || 0) * (val / 100) +
      (targetFeeRate || 0) / 2

    return [txFeeRate, targetRTD]
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
              targetRTD: undefined || 0,
              txFeeRate: targetFeeRate,
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
                      var [txFeeRate, targetRTD] = translateDefaultRate(v)
                      setValues({
                        ...values,
                        txFeeRate,
                        targetRTD,
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
                      var [txFeeRate, targetRTD] = translateOperatorMargin(v)
                      setValues({
                        ...values,
                        txFeeRate,
                        targetRTD,
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
                    <FormLabel htmlFor="targetRTD">
                      Target Reserve To Debt Ratio
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="targetRTD"
                        name="targetRTD"
                        type="number"
                        placeholder={targetRTD}
                      />
                      <InputRightAddon>%</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                  <FormControl mt="1em">
                    <FormLabel htmlFor="txFeeRate">
                      Target Transaction Fee Rate
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={Input}
                        id="txFeeRate"
                        name="txFeeRate"
                        type="number"
                        placeholder={targetFeeRate}
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
