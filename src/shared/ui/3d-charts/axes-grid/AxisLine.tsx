import { MathUtils, type Vector3Tuple } from "three"
import { Line, Text3D, type Text3DProps } from "@react-three/drei"
import type { Axis } from "../types"
import { AXIS_LABEL_BUFFER } from "../constants"
import RobotoTypeFace from "../resources/Roboto_SemiBold_Regular.json"
import { TickMark } from "./TickMark"

// $step is also a buffer
const axesProps: Record<
  Axis,
  (axisMax: number) => {
    startPosition: Vector3Tuple
    endPosition: Vector3Tuple
    textPosition: Vector3Tuple
    textRotation: Vector3Tuple
  }
> = {
  x: (axisMax: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [axisMax, 0, 0],
    textPosition: [0, 0, -AXIS_LABEL_BUFFER],
    textRotation: [MathUtils.degToRad(-90), 0, 0],
  }),
  y: (axisMax: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [0, axisMax, 0],
    textPosition: [0, axisMax + AXIS_LABEL_BUFFER, 0],
    textRotation: [0, MathUtils.degToRad(45), 0],
  }),
  z: (axisMax: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [0, 0, axisMax],
    textPosition: [-AXIS_LABEL_BUFFER, 0, axisMax],
    textRotation: [MathUtils.degToRad(-90), 0, MathUtils.degToRad(90)],
  }),
}

interface AxisLineProps {
  axis: Axis
  axisMax: number
  label?: string
  color?: number | string
}

export function AxisLine({ axis, axisMax, label, color = 0xffffff }: AxisLineProps) {
  const { startPosition, endPosition, textPosition, textRotation } = axesProps[axis](axisMax)

  return (
    <group>
      <Line points={[startPosition, endPosition]} color={color} />
      {label && (
        <Text3D position={textPosition} rotation={textRotation} font={RobotoTypeFace as unknown as Text3DProps["font"]}>
          {label} ({axis.toUpperCase()})
          <meshNormalMaterial />
        </Text3D>
      )}
      {/* Rendering ticks */}
      {Array.from({ length: axisMax }).map((_, i) => (
        <TickMark key={`${axis}-${i}`} axis={axis} axisValue={1 + i} />
      ))}
    </group>
  )
}
