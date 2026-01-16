import type { Vector3Tuple } from "three"
import { Line } from "@react-three/drei"
import type { Axis } from "../types"
import { TICK_MARK_BUFFER } from "../constants"
import { getXPos } from "../utils"

const axesProps: Record<
  Axis,
  (axisValue: number) => {
    startPosition: Vector3Tuple
    endPosition: Vector3Tuple
    labelPosition: Vector3Tuple
    labelRotation: Vector3Tuple
  }
> = {
  x: (axisValue: number) => ({
    startPosition: [getXPos(axisValue), 0, -TICK_MARK_BUFFER],
    endPosition: [getXPos(axisValue), 0, TICK_MARK_BUFFER],
    labelPosition: [0, 0, 0],
    labelRotation: [0, 0, 0],
  }),
  y: (axisValue: number) => ({
    startPosition: [-TICK_MARK_BUFFER / 2, axisValue, TICK_MARK_BUFFER / 2],
    endPosition: [TICK_MARK_BUFFER / 2, axisValue, -TICK_MARK_BUFFER / 2],
    labelPosition: [0, 0, 0],
    labelRotation: [0, 0, 0],
  }),
  z: (axisValue: number) => ({
    startPosition: [-TICK_MARK_BUFFER, 0, axisValue],
    endPosition: [TICK_MARK_BUFFER, 0, axisValue],
    labelPosition: [0, 0, 0],
    labelRotation: [0, 0, 0],
  }),
}

interface TickMarkProps {
  axis: Axis
  axisValue: number
  color?: number | string
}

export function TickMark({ axis, axisValue, color = 0xffffff }: TickMarkProps) {
  const { startPosition, endPosition, labelPosition, labelRotation } = axesProps[axis](axisValue)

  return (
    <group>
      <Line points={[startPosition, endPosition]} color={color} />
    </group>
  )
}
