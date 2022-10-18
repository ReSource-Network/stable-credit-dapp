import { mode } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

function variantLedger(props: Dict) {
  return {
    container: {
      borderRadius: "2xl",
      top: "5em",
    },
  }
}

const variants = {
  solid: variantLedger,
}

export default {
  variants,
}
