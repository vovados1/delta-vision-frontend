import { Line as ThreeLine } from "@react-three/drei"
import type { Vector3Tuple } from "three"
import { DEFAULT_LINE_COLOR } from "../constants"

interface LineProps {
  from: Vector3Tuple
  to: Vector3Tuple
  color?: number | string
}

export function Line({ from, to, color = DEFAULT_LINE_COLOR }: LineProps) {
  return <ThreeLine points={[from, to]} color={color} />
}
