import type { Vector3Tuple } from "three"
import { DEFAULT_NODE_COLOR } from "../constants"

interface NodeProps {
  label: string
  value: number
  position: Vector3Tuple
  color?: number | string
}

export function Node({ label, value, position, color = DEFAULT_NODE_COLOR }: NodeProps) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}
