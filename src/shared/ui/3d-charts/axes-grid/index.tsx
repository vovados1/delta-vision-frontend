import { useMemo } from "react"
import type { LineChartProps } from ".."
import { useChartContext } from "../context"
import { AxisLine } from "./AxisLine"
import { SIG_FIGURES_COUNT } from "../constants"

type AxesGridProps = Pick<LineChartProps, "series" | "zAxisLabels" | "axesLabels">

export function AxesGrid({ series, zAxisLabels, axesLabels }: AxesGridProps) {
  const { yAxisProps } = useChartContext()

  const yAxisTicks = useMemo(
    () =>
      Array.from({ length: yAxisProps.axisMax }).map((_, i) =>
        String((yAxisProps.minValue + yAxisProps.intervalValue * i).toFixed(SIG_FIGURES_COUNT))
      ),
    [yAxisProps.axisMax, yAxisProps.minValue, yAxisProps.intervalValue]
  )

  return (
    <group>
      <AxisLine axis="x" label={axesLabels?.x} ticks={series.map((s) => s.label)} />
      <AxisLine axis="y" label={axesLabels?.y} ticks={yAxisTicks} />
      <AxisLine axis="z" label={axesLabels?.z} ticks={zAxisLabels} />
    </group>
  )
}
