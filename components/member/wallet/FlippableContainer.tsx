import { Box, BoxProps } from "@chakra-ui/layout"
import React, { ReactElement, useEffect, useState } from "react"

const frontCardStyles: BoxProps = {
  w: "full",
  position: "absolute",
  sx: {
    backfaceVisibility: "hidden",
  },
}

const backCardStyles: BoxProps = {
  w: "full",
  position: "absolute",
  sx: {
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden",
  },
}

const animatedContainer = (rotation: number): BoxProps => ({
  cursor: "pointer",
  position: "relative",
  h: { base: "200px", md: "250px" },
  transform: `rotateY(${rotation}deg)`,
  sx: {
    transformStyle: "preserve-3d",
    transition: "all 1s ease",
  },
})

interface FlippableContainerProps extends BoxProps {
  front: ReactElement
  back: ReactElement
  showFront?: boolean
  setShowFront?: (boolean) => void
}

export const FlippableContainer = ({
  front,
  back,
  showFront,
  setShowFront,
}: FlippableContainerProps) => {
  const [rotation, setRotation] = useState(0)

  const handlePositionedClick = (event: MouseEvent) => {
    const sideClicked = getWhichSideClicked(event)
    setRotation(rotation + (sideClicked === "left" ? 180 : -180))
    setShowFront?.(!showFront)
  }

  useEffect(() => {
    if (showFront === true && rotation % 360 !== 0) setRotation(rotation + 180)
    if (showFront === false && rotation % 360 === 0) setRotation(rotation - 180)
  }, [rotation, showFront])

  return (
    <Box
      onClick={handlePositionedClick as any}
      {...animatedContainer(rotation)}
    >
      {React.cloneElement(front, { ...frontCardStyles, ...front.props })}
      {React.cloneElement(back, { ...backCardStyles, ...back.props })}
    </Box>
  )
}

const getWhichSideClicked = (event: MouseEvent): "left" | "right" => {
  const bounds = (event.target as any)?.getBoundingClientRect()
  const width = bounds.width
  const x = event.clientX - bounds.left
  return x > width / 2 ? "right" : "left"
}
