import { useMemo } from "react"
import { AxisLine } from "./AxisLine"
import { TickMark } from "./TickMark"

interface AxesGridProps {
  axisMax: number
  yMin: number
  yMax: number
}

export function AxesGrid({ axisMax, yMin, yMax }: AxesGridProps) {
  // Max amount of points that are going to be rendered on the Y axis from 0 to the top
  const MAX_Y_POINTS = 15

  // Should get it from above
  const MIN_AXIS_POS = 5

  const yPoints = useMemo<number[]>(() => {
    const nPerPoint = Math.floor(yMax / MAX_Y_POINTS)

    return Array.from({ length: MAX_Y_POINTS }).map((_, i) => (yMin + i * nPerPoint) / MIN_AXIS_POS)
  }, [yMin, yMax])

  console.log(yPoints)

  return (
    <group>
      {/* Drawing axes */}
      <AxisLine axis="x" label="Exchange" axisMax={axisMax} />
      <AxisLine axis="y" label="Price" axisMax={axisMax} />
      <AxisLine axis="z" label="Time" axisMax={axisMax} />

      {/* Drawing ticks (axes legend) */}
      {/* yAxis ticks */}
      <group>
        {yPoints.map((p, i) => (
          <TickMark key={i} axis="y" label="Random" point={p} />
        ))}
      </group>
    </group>
  )
}
