import { Link } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faScaleBalanced,
  faScaleUnbalancedFlip,
} from "@fortawesome/free-solid-svg-icons"
import { useHover } from "react-use"

export const NavLogotypeButton = () => {
  const router = useRouter()
  const element = (hovered) => (
    <Link
      onClick={() => router.push("/")}
      _active={{ boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <FontAwesomeIcon
        icon={hovered ? faScaleUnbalancedFlip : faScaleBalanced}
        fontSize="1.75em"
      />
    </Link>
  )

  const [hoverable, hovered] = useHover(element)

  return hoverable
}
