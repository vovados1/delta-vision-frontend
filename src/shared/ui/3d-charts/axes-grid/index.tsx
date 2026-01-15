import { useMemo } from "react"
import type { LineChartProps } from ".."
import { useChartContext } from "../context"
import { AxisLine } from "./AxisLine"
import { Y_AXIS_TICK_COUNT } from "../constants"
import { MathUtils } from "three"

type AxesGridProps = Pick<LineChartProps, "series" | "zAxisLabels" | "axesLabels">

export function AxesGrid({ series, zAxisLabels, axesLabels }: AxesGridProps) {
  const { yAxisBoundaries } = useChartContext()

  // Ugly look for now
  const yAxisProps = useMemo(() => {
    const axisValues = series.map((s) => s.values).flat()
    const deduplicatedAxisValues = [...new Set(axisValues)]

    const axisMax = MathUtils.clamp(0, Y_AXIS_TICK_COUNT, deduplicatedAxisValues.length)
    const axisStep = (yAxisBoundaries.maxValue - yAxisBoundaries.minValue) / axisMax

    return { axisMax, axisStep }
  }, [series, yAxisBoundaries])

  return (
    <group>
      <AxisLine axis="x" label={axesLabels?.x} axisMax={series.length} />
      <AxisLine axis="y" label={axesLabels?.y} axisMax={yAxisProps.axisMax} />
      <AxisLine axis="z" label={axesLabels?.z} axisMax={zAxisLabels.length} />
    </group>
  )
}
