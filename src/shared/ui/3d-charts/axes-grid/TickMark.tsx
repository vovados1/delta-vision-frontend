import { type Vector3Tuple, MathUtils } from "three"
import { Line, Text } from "@react-three/drei"
import type { Axis } from "../types"
import { AXIS_LABEL_BUFFER, TICK_MARK_BUFFER } from "../constants"
import { getXPos } from "../utils"

const axesProps: Record<
  Axis,
  (axisValue: number) => {
    position: Vector3Tuple
    tickStartPosition: Vector3Tuple
    tickEndPosition: Vector3Tuple
    labelPosition: Vector3Tuple
    labelRotation: Vector3Tuple
    labelFontSize: number
  }
> = {
  x: (axisValue: number) => ({
    position: [getXPos(axisValue), 0, 0],
    tickStartPosition: [0, 0, -TICK_MARK_BUFFER],
    tickEndPosition: [0, 0, TICK_MARK_BUFFER],
    labelPosition: [0, 0, 0],
    labelRotation: [0, 0, 0],
    labelFontSize: 0.8,
  }),
  y: (axisValue: number) => ({
    position: [0, axisValue, 0],
    tickStartPosition: [-TICK_MARK_BUFFER / 2, 0, TICK_MARK_BUFFER / 2],
    tickEndPosition: [TICK_MARK_BUFFER / 2, 0, -TICK_MARK_BUFFER / 2],
    labelPosition: [AXIS_LABEL_BUFFER * 0.75, 0, -AXIS_LABEL_BUFFER * 0.75],
    labelRotation: [0, MathUtils.degToRad(45), 0],
    labelFontSize: 0.5,
  }),
  z: (axisValue: number) => ({
    position: [0, 0, axisValue],
    tickStartPosition: [-TICK_MARK_BUFFER, 0, 0],
    tickEndPosition: [TICK_MARK_BUFFER, 0, 0],
    labelPosition: [AXIS_LABEL_BUFFER * 1.5, 0, 0],
    labelRotation: [MathUtils.degToRad(-90), 0, 0],
    labelFontSize: 0.2,
  }),
}

interface TickMarkProps {
  axis: Axis
  axisValue: number
  label?: string
  color?: number | string
}

export function TickMark({ axis, axisValue, label, color = 0xffffff }: TickMarkProps) {
  const { position, tickStartPosition, tickEndPosition, labelPosition, labelRotation, labelFontSize } =
    axesProps[axis](axisValue)

  return (
    <group position={position}>
      <Line points={[tickStartPosition, tickEndPosition]} color={color} />
      {label && (
        <Text position={labelPosition} rotation={labelRotation} color={color} fontSize={labelFontSize}>
          {label}
        </Text>
      )}
    </group>
  )
}
