import type { LineChartProps } from ".."
import { useChartContext } from "../context"
import { AxisLine } from "./AxisLine"

type AxesGridProps = Pick<LineChartProps, "series" | "zAxisLabels" | "axesLabels">

export function AxesGrid({ series, zAxisLabels, axesLabels }: AxesGridProps) {
  const { yAxisProps } = useChartContext()

  return (
    <group>
      <AxisLine axis="x" label={axesLabels?.x} axisMax={series.length} />
      <AxisLine axis="y" label={axesLabels?.y} axisMax={yAxisProps.axisMax} />
      <AxisLine axis="z" label={axesLabels?.z} axisMax={zAxisLabels.length} />
    </group>
  )
}
