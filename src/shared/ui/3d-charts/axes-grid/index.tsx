import type { LineChartProps } from ".."
import { useChartContext } from "../context"
import { AxisLine } from "./AxisLine"

type AxesGridProps = Pick<LineChartProps, "series" | "zAxisLabels" | "axesLabels">

export function AxesGrid({ series, zAxisLabels, axesLabels }: AxesGridProps) {
  const { yAxisProps, gridColor } = useChartContext()

  return (
    <group>
      {!!series.length && (
        <AxisLine axis="x" label={axesLabels?.x} ticks={series.map((s) => s.label)} color={gridColor} />
      )}
      {!!yAxisProps.ticks.length && (
        <AxisLine axis="y" label={axesLabels?.y} ticks={yAxisProps.ticks} color={gridColor} />
      )}
      {!!zAxisLabels.length && <AxisLine axis="z" label={axesLabels?.z} ticks={zAxisLabels} color={gridColor} />}
    </group>
  )
}
