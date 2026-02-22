"use client"

import { useMemo } from "react"
import type { Vector3Tuple } from "three"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { AxesGrid } from "./axes-grid"
import type { Axis, Series } from "./types"
import { SeriesGroup } from "./series-group"
import { withBufferPoint, getYAxisProps, limitZAxisLabels, getXPos } from "./utils"
import { ChartContext, type ContextState } from "./context"
import { DEFAULT_GRID_COLOR, DEFAULT_LINE_COLOR, DEFAULT_NODE_COLOR } from "./constants"

export interface LineChartProps {
  // For example: Date
  zAxisLabels: string[]
  // Actual assets (item example: { label: "Binance", values: [1, 5, 1, 2.4, 1, ...] })
  series: Series[]
  // Text Labels for different axes
  axesLabels?: Partial<Record<Axis, string>>
  // Colors
  nodeColor?: number | string
  lineColor?: number | string
  gridColor?: number | string
}

export function LineChart({
  zAxisLabels,
  series,
  axesLabels,
  nodeColor = DEFAULT_NODE_COLOR,
  lineColor = DEFAULT_LINE_COLOR,
  gridColor = DEFAULT_GRID_COLOR,
}: LineChartProps) {
  const yAxisProps = useMemo(() => getYAxisProps(series), [series])
  // Limiting z axis labels (will return last $Z_AXIS_TICK_COUNT number of items)
  const limitedZAxisLabels = useMemo(() => limitZAxisLabels(zAxisLabels), [zAxisLabels])

  const cameraPosition: Vector3Tuple = [
    // X -> series.length + $BUFFER
    withBufferPoint(getXPos(series.length)),
    // Y -> latest serie latest value + $BUFFER (so it's a bit higher by $BUFFER)
    withBufferPoint(yAxisProps.convertValueIntoYPos(series.at(-1)?.values.at(-1) || 0) || 0),
    // Z -> limitedZAxisLabels.length + $BUFFER (basically latest time + $BUFFER)
    withBufferPoint(limitedZAxisLabels.length),
  ]

  console.log(cameraPosition)

  const contextValue = useMemo(
    () =>
      ({
        yAxisProps,
        nodeColor,
        lineColor,
        gridColor,
      }) satisfies ContextState,
    [yAxisProps, nodeColor, lineColor, gridColor]
  )

  return (
    <div className="h-dvh w-full">
      <ChartContext.Provider value={contextValue}>
        <Canvas camera={{ position: cameraPosition }}>
          {/* Render grid / labels / ticks */}
          <AxesGrid series={series} zAxisLabels={zAxisLabels} axesLabels={axesLabels} />
          {/* Render data (nodes / connecting lines) */}
          <SeriesGroup series={series} />
          <OrbitControls />
        </Canvas>
      </ChartContext.Provider>
    </div>
  )
}
