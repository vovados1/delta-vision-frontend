import { Line } from "@react-three/drei"
import type { Series } from "./types"
import type { Vector3Tuple } from "three"

interface DataSeriesProps {
  series: Series
  yMin: number
  yMax: number
  startXPosition: number
  step?: number
}

export function DataSeries({ series, yMin, yMax, startXPosition, step = 1 }: DataSeriesProps) {
  // const pointsPositions = series.map((point) => )
  const startPosition: Vector3Tuple = [startXPosition, 0, 0]

  return (
    <group position={startPosition}>
      {/* {series.values.map((point) => (
        <Line />
      ))} */}
    </group>
  )
}
