import { Y_AXIS_TICK_COUNT, Z_AXIS_TICK_COUNT } from "./constants"
import type { Series } from "./types"

export const withBufferPoint = (pos: number, step: number) => pos + step

export const getYAxisBoundaries = (series: Series[]) => {
  const yAxisValues = series.map((s) => s.values).flat()
  // Potential optimization by removing duplicates
  const reducedYAxisValues = [...new Set(yAxisValues)]
  return reducedYAxisValues.reduce<{ minValue: number; maxValue: number }>(
    (acc, curr) => {
      if (curr < acc.minValue) acc.minValue = curr
      if (curr > acc.maxValue) acc.maxValue = curr
      return acc
    },
    {
      minValue: reducedYAxisValues[0],
      maxValue: reducedYAxisValues[0],
    }
  )
}

export const getYPosForValue = (value: number, yMax: number, step: number) => (value / yMax) * Y_AXIS_TICK_COUNT * step

export const limitZAxisLabels = (zAxisLabels: string[]) => zAxisLabels.toReversed().slice(0, Z_AXIS_TICK_COUNT - 1)
