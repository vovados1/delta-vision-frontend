import { Line } from "@react-three/drei"
import type { Vector3Tuple } from "three"

interface DataLineProps {
  from: Vector3Tuple
  to: Vector3Tuple
  color?: number | string
}

export function DataLine({ from, to, color = 0x16a34a }: DataLineProps) {
  return <Line points={[from, to]} color={color} />
}
