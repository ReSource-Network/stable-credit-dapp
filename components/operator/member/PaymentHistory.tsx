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
  const [loanPeriods, setLoadPeriods] = useState<number | undefined>()
  const [loanPeriodLength, setLoanPeriodLength] = useState<number | undefined>()
  const [periodDefaults, setPeriodDefaults] = useState<number | undefined>()
  const [loanHistory, setLoanHistory] = useState<number | undefined>()
  return (
    <Stack>
      <InputGroup>
        <Stack w="100%">
          <HStack>
            <FormLabel mb="0 !important">Loan period length</FormLabel>
            <Tooltip label="number of days in each loan period">
              <span>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
            </Tooltip>
          </HStack>
          <InputGroup>
            <InputLeftAddon>days</InputLeftAddon>
            <Input
              value={loanPeriods || 0}
              type="number"
              onChange={(e) => setLoanPeriodLength(Number(e.target.value))}
              placeholder="0"
            />
          </InputGroup>
        </Stack>
      </InputGroup>
      <InputGroup>
        <Stack w="100%">
          <HStack>
            <FormLabel mb="0 !important">Total loan periods</FormLabel>
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
            <FormLabel mb="0 !important">Loan period defaults</FormLabel>
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
