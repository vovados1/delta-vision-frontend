import { MathUtils, type Vector3Tuple } from "three"
import { Line, Text3D, type Text3DProps } from "@react-three/drei"
import type { Axis } from "../types"
import { useChartContext } from "../context"
import RobotoTypeFace from "../resources/Roboto_SemiBold_Regular.json"

// $step is also a buffer
const axesProps: Record<
  Axis,
  (
    axisMax: number,
    step: number
  ) => {
    startPosition: Vector3Tuple
    endPosition: Vector3Tuple
    textPosition: Vector3Tuple
    textRotation: Vector3Tuple
  }
> = {
  x: (axisMax: number, step: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [axisMax, 0, 0],
    textPosition: [-2.5, 0, -0.5],
    textRotation: [MathUtils.degToRad(-90), 0, 0],
  }),
  y: (axisMax: number, step: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [0, axisMax, 0],
    textPosition: [0, axisMax + 0.5, 0],
    textRotation: [0, MathUtils.degToRad(45), 0],
  }),
  z: (axisMax: number, step: number) => ({
    startPosition: [0, 0, 0],
    endPosition: [0, 0, axisMax],
    textPosition: [-0.5, 0, axisMax],
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
  const { step } = useChartContext()
  const { startPosition, endPosition, textPosition, textRotation } = axesProps[axis](axisMax, step)

  return (
    <group>
      <Line points={[startPosition, endPosition]} color={color} />
      {label && (
        <Text3D position={textPosition} rotation={textRotation} font={RobotoTypeFace as unknown as Text3DProps["font"]}>
          {label} ({axis.toUpperCase()})
          <meshNormalMaterial />
        </Text3D>
      )}
    </group>
  )
}
