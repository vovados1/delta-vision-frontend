"use client"

import { useMemo } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { AxesGrid } from "./axes-grid"
import { clamp } from "./utils"
import type { Series } from "./types"
import { DataSeries } from "./DataSeries"

interface ChartProps {
  zAxisLabels: string[]
  series: Series[]
}

export function Chart({ zAxisLabels, series }: ChartProps) {
  const MIN_AXIS_POS = 5
  const CAMERA_POS_MULTIPLIER = 1.5
  const STEP = 1

  const yAxisProps = useMemo(() => {
    const yAxisValues = series.map((s) => s.values).flat()
    // Potential optimization by removing duplicates
    const reducedYAxisValues = [...new Set(yAxisValues)]
    return reducedYAxisValues.reduce<{ min: number; max: number }>(
      (acc, curr) => {
        if (curr < acc.min) acc.min = curr
        if (curr > acc.max) acc.max = curr
        return acc
      },
      {
        min: reducedYAxisValues[0],
        max: reducedYAxisValues[0],
      }
    )
  }, [series])

  const axisMax = clamp(MIN_AXIS_POS, Infinity, zAxisLabels.length)

  return (
    <div className="h-dvh w-full">
      <Canvas
        camera={{
          position: [axisMax * CAMERA_POS_MULTIPLIER, axisMax * CAMERA_POS_MULTIPLIER, axisMax * CAMERA_POS_MULTIPLIER],
        }}
      >
        <group>
          <AxesGrid axisMax={axisMax} yMin={yAxisProps.min} yMax={yAxisProps.max} />
          <group>
            {series.map((s, i) => (
              <DataSeries
                key={s.label + i}
                series={s}
                yMin={yAxisProps.min}
                yMax={yAxisProps.max}
                startXPosition={STEP + i}
                step={STEP}
              />
            ))}
          </group>
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
