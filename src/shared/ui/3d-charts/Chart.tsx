"use client"

import { Canvas } from "@react-three/fiber"

export function Chart() {
  return (
    <div className="h-dvh w-full">
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}
