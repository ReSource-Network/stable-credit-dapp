import { Styles, mode } from "@chakra-ui/theme-tools"

export const styles: Styles = {
  global: (props) => ({
    "html, #__next": {
      height: "100%",
    },
    "html, body": {
      width: "100vw",
      height: "100vh",
      bg: mode("#f1f1f1", "#141214")(props),
    },
    _focusVisible: {
      boxShadow: "0 0 0 3px #d8b2ff !important",
    },
  }),
}
