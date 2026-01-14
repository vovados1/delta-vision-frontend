import { MathUtils, type Vector3Tuple } from "three"
import { Line, Text3D, type Text3DProps } from "@react-three/drei"
import type { Axis } from "../types"
import RobotoTypeFace from "./Roboto_SemiBold_Regular.json"

const LABEL_BUFFER_POS = 0.5

// start, end, textPosition, textRotation
const getAxesProps = (axisMax: number): Record<Axis, [Vector3Tuple, Vector3Tuple, Vector3Tuple, Vector3Tuple]> => ({
  x: [
    [0, 0, 0],
    [axisMax, 0, 0],
    [axisMax - 2.5, 0, -LABEL_BUFFER_POS],
    [MathUtils.degToRad(-90), 0, 0],
  ],
  y: [
    [0, 0, 0],
    [0, axisMax, 0],
    [0, axisMax + LABEL_BUFFER_POS, 0],
    [0, MathUtils.degToRad(45), 0],
  ],
  z: [
    [0, 0, 0],
    [0, 0, axisMax],
    [-LABEL_BUFFER_POS, 0, axisMax],
    [MathUtils.degToRad(-90), 0, MathUtils.degToRad(90)],
  ],
})

interface AxisLineProps {
  axis: Axis
  label: string
  axisMax: number
  color?: number | string
}

export function AxisLine({ axis, label, axisMax, color = 0xffffff }: AxisLineProps) {
  const [start, end, textPosition, textRotation] = getAxesProps(axisMax)[axis]

  return (
    <group>
      <Line points={[start, end]} color={color} />
      <Text3D position={textPosition} rotation={textRotation} font={RobotoTypeFace as unknown as Text3DProps["font"]}>
        {label} ({axis.toUpperCase()})
        <meshNormalMaterial />
      </Text3D>
    </group>
  )
}
