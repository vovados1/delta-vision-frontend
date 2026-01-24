import { MathUtils, type Vector3Tuple } from "three"
import { Line, Text3D, type Text3DProps } from "@react-three/drei"
import type { Axis } from "../types"
import { AXIS_LABEL_BUFFER } from "../constants"
import { TickMark } from "./TickMark"
import { getXPos } from "../utils"
import RobotoTypeFace from "../resources/Roboto_SemiBold_Regular.json"

const axesProps: Record<
  Axis,
  (axisMax: number) => {
    startPosition: Vector3Tuple
    endPosition: Vector3Tuple
    labelPosition: Vector3Tuple
    labelRotation: Vector3Tuple
  }
> = {
  x: (axisMax: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [getXPos(axisMax), 0, 0],
    labelPosition: [getXPos(axisMax) - 8, 0, -AXIS_LABEL_BUFFER],
    labelRotation: [MathUtils.degToRad(-90), 0, 0],
  }),
  y: (axisMax: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [0, axisMax, 0],
    labelPosition: [0, axisMax + AXIS_LABEL_BUFFER, 0],
    labelRotation: [0, MathUtils.degToRad(45), 0],
  }),
  z: (axisMax: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [0, 0, axisMax],
    labelPosition: [-AXIS_LABEL_BUFFER, 0, axisMax],
    labelRotation: [MathUtils.degToRad(-90), 0, MathUtils.degToRad(90)],
  }),
}

interface AxisLineProps {
  axis: Axis
  ticks: string[]
  label?: string
  color?: number | string
}

export function AxisLine({ axis, ticks, label, color = 0xffffff }: AxisLineProps) {
  const { startPosition, endPosition, labelPosition, labelRotation } = axesProps[axis](ticks.length)

  return (
    <group>
      <Line points={[startPosition, endPosition]} color={color} />
      {label && (
        <Text3D
          position={labelPosition}
          rotation={labelRotation}
          font={RobotoTypeFace as unknown as Text3DProps["font"]}
        >
          {label} ({axis.toUpperCase()})
          <meshNormalMaterial />
        </Text3D>
      )}
      {/* Rendering ticks */}
      {ticks.map((value, i) => (
        <TickMark key={`${axis}-${value}`} axis={axis} axisValue={i + 1} label={value} />
      ))}
    </group>
  )
}
