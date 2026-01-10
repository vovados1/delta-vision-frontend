"use client"

import { Line, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { AxesGrid } from "./axes-grid"

const data = [
  { timestamp: 1736280000000, value: 42.7 },
  { timestamp: 1735848000000, value: 91.2 },
  { timestamp: 1736539200000, value: 33.5 },
  { timestamp: 1736020800000, value: 67.8 },
  { timestamp: 1736712000000, value: 12.4 },
  { timestamp: 1735675200000, value: 88.1 },
  { timestamp: 1736366400000, value: 55.9 },
  { timestamp: 1735934400000, value: 29.3 },
  { timestamp: 1736625600000, value: 76.4 },
  { timestamp: 1736107200000, value: 44.6 },
  { timestamp: 1735761600000, value: 63.2 },
  { timestamp: 1736452800000, value: 19.7 },
  { timestamp: 1736193600000, value: 18.3 },
  { timestamp: 1735588800000, value: 82.5 },
  { timestamp: 1736798400000, value: 51.8 },
  { timestamp: 1735502400000, value: 37.1 },
  { timestamp: 1736884800000, value: 94.6 },
  { timestamp: 1735416000000, value: 71.3 },
  { timestamp: 1736971200000, value: 25.9 },
  { timestamp: 1735329600000, value: 58.4 },
]

export function Chart() {
  const axisMax = 5

  return (
    <div className="h-dvh w-full">
      <Canvas camera={{ position: [axisMax, axisMax, axisMax] }}>
        <AxesGrid axisMax={axisMax} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
