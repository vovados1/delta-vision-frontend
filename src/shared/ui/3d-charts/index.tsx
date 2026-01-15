"use client"

import { useMemo } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { AxesGrid } from "./axes-grid"
import type { Axis, Series } from "./types"
import type { Vector3Tuple } from "three"
import { withBufferPoint, getYAxisBoundaries, limitZAxisLabels } from "./utils"
import { getYPosForValue } from "./utils"
import { ChartContext, type ContextState } from "./context"

export interface LineChartProps {
  // For example: Date
  zAxisLabels: string[]
  // Actual assets (item example: { label: "Binance", values: [1, 5, 1, 2.4, 1, ...] })
  series: Series[]
  // Distance between ticks (default: 1)
  step?: number
  // Text Labels for different axes
  axesLabels?: Partial<Record<Axis, string>>
}

export function LineChart({ zAxisLabels, series, step = 1, axesLabels }: LineChartProps) {
  const yAxisBoundaries = useMemo(() => getYAxisBoundaries(series), [series])
  // Limiting z axis labels (will return last $Z_AXIS_TICK_COUNT number of items)
  const limitedZAxisLabels = useMemo(() => limitZAxisLabels(zAxisLabels), [zAxisLabels])

  const cameraPosition: Vector3Tuple = [
    // X -> series.length + $BUFFER
    withBufferPoint(series.length, step),
    // Y -> latest serie latest value + $BUFFER (so it's a bit higher by $BUFFER)
    withBufferPoint(getYPosForValue(series.at(-1)?.values.at(-1) || 0, yAxisBoundaries.maxValue, step), step),
    // Z -> limitedZAxisLabels.length + $BUFFER (basically latest time + $BUFFER)
    withBufferPoint(limitedZAxisLabels.length, step),
  ]

  const contextValue = useMemo(
    () =>
      ({
        yAxisBoundaries,
        step,
      }) satisfies ContextState,
    [yAxisBoundaries, step]
  )

  return (
    <div className="h-dvh w-full">
      <ChartContext.Provider value={contextValue}>
        <Canvas camera={{ position: cameraPosition }}>
          <AxesGrid series={series} zAxisLabels={zAxisLabels} axesLabels={axesLabels} />
          <OrbitControls />
        </Canvas>
      </ChartContext.Provider>
    </div>
  )
}
