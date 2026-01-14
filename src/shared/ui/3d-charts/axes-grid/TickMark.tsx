import { MathUtils, type Vector3Tuple } from "three"
import type { Axis } from "../types"
import { Line } from "@react-three/drei"

const TICK_MARK_SIZE = 1

// position, rotation
const getAxesProps = (point: number): Record<Axis, [Vector3Tuple, Vector3Tuple]> => ({
  x: [
    [point, 0, 0],
    [0, MathUtils.degToRad(90), 0],
  ],
  y: [
    [0, point, 0],
    [0, MathUtils.degToRad(45), 0],
  ],
  z: [
    [0, 0, point],
    [0, 0, 0],
  ],
})

interface TickMarkProps {
  axis: Axis
  label: string
  // `point` on the axis (that's the reason why it's not a Vector3Tuple)
  point: number
  color?: number | string
}

export function TickMark({ axis, label, point, color = 0xffffff }: TickMarkProps) {
  const [position, rotation] = getAxesProps(point)[axis]

  console.log(position, rotation)

  return (
    <group position={position}>
      <Line
        points={[
          [-TICK_MARK_SIZE, 0, 0],
          [TICK_MARK_SIZE, 0, 0],
        ]}
        rotation={rotation}
        color={color}
      />
      {/* TODO: render text */}
    </group>
  )
}
