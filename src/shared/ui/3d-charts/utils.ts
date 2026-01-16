import { MathUtils } from "three"
import { BUFFER, Y_AXIS_LIMIT, Z_AXIS_LIMIT } from "./constants"
import type { Series } from "./types"

export const withBufferPoint = (pos: number) => pos + BUFFER

export const getYAxisProps = (series: Series[]) => {
  const yAxisValues = series.flatMap((s) => s.values)
  const deduplicatedAxisValues = [...new Set(yAxisValues)]

  const { minValue, maxValue } = deduplicatedAxisValues.reduce<{ minValue: number; maxValue: number }>(
    (acc, curr) => {
      if (curr < acc.minValue) acc.minValue = curr
      if (curr > acc.maxValue) acc.maxValue = curr
      return acc
    },
    {
      minValue: deduplicatedAxisValues[0],
      maxValue: deduplicatedAxisValues[0],
    }
  )

  const yAxisMax = MathUtils.clamp(0, Y_AXIS_LIMIT, deduplicatedAxisValues.length)
  const yAxisIntervalValue = (maxValue - minValue) / (yAxisMax - 1)

  return {
    axisMax: yAxisMax,
    intervalValue: yAxisIntervalValue,
    minValue,
    maxValue,
    convertValueIntoYPos: (value: number) => (value - minValue) / yAxisIntervalValue,
  }
}

export const limitZAxisLabels = (zAxisLabels: string[]) => zAxisLabels.toReversed().slice(0, Z_AXIS_LIMIT - 1)
