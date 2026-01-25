import type { Vector3Tuple } from "three"

interface DataPointProps {
  label: string
  value: number
  position: Vector3Tuple
  color?: number | string
}

export function DataPoint({ label, value, position, color = 0x22c55e }: DataPointProps) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}
