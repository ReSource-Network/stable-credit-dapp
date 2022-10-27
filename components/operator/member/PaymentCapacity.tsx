import {
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Tooltip,
} from "@chakra-ui/react"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { UnderwritingProps } from "./AddMemberModal"

export const PaymentCapacity = ({}: UnderwritingProps) => {
  const [availableIncome, setAvailableIncome] = useState(0)
  const [productionValue, setProductionValue] = useState(0)
  const [turnoverRate, setTurnoverRate] = useState(0)
  const [unmetDemand, setUnmetDemand] = useState(0)
  return (
    <Stack>
      <Stack w="100%">
        <HStack>
          <FormLabel mb="0 !important">Available Income</FormLabel>
          <Tooltip label="Total income available for next loan period">
            <span>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          </Tooltip>
        </HStack>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            value={availableIncome}
            type="number"
            onChange={(e) => setAvailableIncome(Number(e.target.value))}
            placeholder="0"
          />
        </InputGroup>
      </Stack>
      <Stack w="100%">
        <HStack>
          <FormLabel mb="0 !important">Gross production</FormLabel>
          <Tooltip label="Gross production value available for next loan period">
            <span>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          </Tooltip>
        </HStack>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            value={productionValue}
            type="number"
            onChange={(e) => setProductionValue(Number(e.target.value))}
            placeholder="0"
          />
        </InputGroup>
      </Stack>
      <Stack w="100%">
        <HStack>
          <FormLabel mb="0 !important">Turnover rate</FormLabel>
          <Tooltip label="Inventory turnover rate from previous period">
            <span>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          </Tooltip>
        </HStack>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            value={turnoverRate}
            type="number"
            onChange={(e) => setTurnoverRate(Number(e.target.value))}
            placeholder="0"
          />
        </InputGroup>
      </Stack>
      <Stack w="100%">
        <HStack>
          <FormLabel mb="0 !important">Unmet demand</FormLabel>
          <Tooltip label="Unmet demand value from previous period">
            <span>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          </Tooltip>
        </HStack>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            value={unmetDemand}
            type="number"
            onChange={(e) => setUnmetDemand(Number(e.target.value))}
            placeholder="0"
          />
        </InputGroup>
      </Stack>
    </Stack>
  )
}
