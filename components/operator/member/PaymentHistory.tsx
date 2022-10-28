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

export const PaymentHistory = ({}: UnderwritingProps) => {
  const [loanPeriods, setLoadPeriods] = useState(0)
  const [periodDefaults, setPeriodDefaults] = useState(0)
  const [loanHistory, setLoanHistory] = useState(0)
  return (
    <Stack>
      <InputGroup>
        <Stack w="100%">
          <HStack>
            <FormLabel mb="0 !important">Available income</FormLabel>
            <Tooltip label="Total known number of loan periods">
              <span>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </Tooltip>
          </HStack>
          <Input
            value={loanPeriods}
            type="number"
            onChange={(e) => setLoadPeriods(Number(e.target.value))}
            placeholder="0"
          />
        </Stack>
      </InputGroup>
      <InputGroup>
        <Stack w="100%">
          <HStack>
            <FormLabel mb="0 !important">Gross production value</FormLabel>
            <Tooltip label="Total known loan periods in default">
              <span>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </Tooltip>
          </HStack>
          <Input
            value={periodDefaults}
            type="number"
            onChange={(e) => setPeriodDefaults(Number(e.target.value))}
            placeholder="0"
          />
        </Stack>
      </InputGroup>
      <Stack w="100%">
        <HStack>
          <FormLabel mb="0 !important">Total loan history</FormLabel>
          <Tooltip label="Total value of loans accross all periods">
            <span>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
          </Tooltip>
        </HStack>
        <InputGroup>
          <InputLeftAddon>$</InputLeftAddon>
          <Input
            value={loanHistory}
            type="number"
            onChange={(e) => setLoanHistory(Number(e.target.value))}
            placeholder="0"
          />
        </InputGroup>
      </Stack>
    </Stack>
  )
}
