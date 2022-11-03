import { Box, BoxProps } from "@chakra-ui/layout"
import {
  Button,
  Collapse,
  SlideFade,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { ManageMember, useGetMember } from "../../../hooks/useGetMember"
import { CashOutModal } from "../CashOutModal"
import { PaymentModal } from "../PaymentModal"
import { TransferModal } from "../TransferModal"
import { FeeBar } from "./FeeBar"
import { TimelineBar } from "./TimelineBar"
import { StableCreditCardFront } from "./StableCreditCardFront"
import { StableCreditCardBack } from "./StableCreditCardBack"
import { CreditUsageBar } from "./CreditUsageBar"
import { FlippableContainer } from "./FlippableContainer"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { useStableCreditContract } from "../../../hooks/useStableCreditContract"

interface Props {
  showCredit: boolean
  setShowCredit: (val: boolean) => void
  memberManage: ManageMember
}

export const StableCreditCard = ({
  showCredit,
  setShowCredit,
  memberManage,
  ...rest
}: Props) => {
  const flipCard = () => setShowCredit(!showCredit)
  const {
    isOpen: isTransferOpen,
    onOpen: onTransferOpen,
    onClose: onTransferClose,
  } = useDisclosure()
  const {
    isOpen: isCashOutOpen,
    onOpen: onCashOutOpen,
    onClose: onCashOutClose,
  } = useDisclosure()
  const {
    isOpen: isPaymentOpen,
    onOpen: onPaymentOpen,
    onClose: onPaymentClose,
  } = useDisclosure()
  const [showMore, setShowMore] = useState(false)

  const [symbol, setSymbol] = useState("")
  const stableCredit = useStableCreditContract()

  useEffect(() => {
    const handler = async () => {
      setSymbol(await stableCredit.symbol())
    }

    if (stableCredit) handler()
  }, [stableCredit])

  const { member } = memberManage

  return (
    <>
      <Box {...rest} minW={{ base: "none", md: "350px" }}>
        <FlippableContainer
          front={
            <StableCreditCardFront
              symbol={symbol}
              balance={member?.balance || 0}
              flip={flipCard}
            />
          }
          back={
            <StableCreditCardBack
              symbol={symbol}
              availableCredit={member?.available || 0}
              creditLimit={member?.creditLimit || 0}
              balance={member?.balance || 0}
              inDefault={member?.inDefault || false}
              flip={flipCard}
            />
          }
          showFront={!showCredit}
          setShowFront={flipCard}
        />
      </Box>
      <Collapse style={{ width: "100%" }} in={showCredit}>
        <VStack mt="1em" w="100%" spacing={"1em"}>
          <Button
            variant={"primary"}
            borderRadius={"full"}
            w="100%"
            onClick={onTransferOpen}
          >
            Send
          </Button>
          {member && member?.balance < 0 && (
            <Button
              variant={"primary"}
              w="100%"
              borderRadius={"full"}
              onClick={onPaymentOpen}
            >
              Make a Payment
            </Button>
          )}
          {member && member?.balance > 0 && (
            <Button
              variant={"primary"}
              borderRadius={"full"}
              w="100%"
              onClick={onCashOutOpen}
            >
              Cash back
            </Button>
          )}
          <Button
            backgroundColor="transparent !important"
            variant={"ghost"}
            onClick={() => setShowMore(!showMore)}
            rightIcon={
              <FontAwesomeIcon icon={showMore ? faCaretUp : faCaretDown} />
            }
          >
            {showMore ? "Less" : "More"}
          </Button>
        </VStack>

        <Collapse style={{ width: "100%" }} in={showMore && showCredit}>
          <CreditUsageBar
            mt="1em"
            w="100%"
            balance={member?.balance || 0}
            creditLimit={member?.creditLimit ?? 0}
          />
          <TimelineBar member={member} />
          <FeeBar member={member} />
        </Collapse>
      </Collapse>
      <TransferModal
        {...memberManage}
        onClose={onTransferClose}
        isOpen={isTransferOpen}
      />
      <PaymentModal
        {...memberManage}
        onClose={onPaymentClose}
        isOpen={isPaymentOpen}
      />
      <CashOutModal
        {...memberManage}
        onClose={onCashOutClose}
        isOpen={isCashOutOpen}
      />
    </>
  )
}
