import { AxisLine } from "./AxisLine"

export function AxesGrid({ axisMax }: { axisMax: number }) {
  return (
    <group>
      <AxisLine axis="x" label="Exchange" axisMax={axisMax} />
      <AxisLine axis="y" label="Price" axisMax={axisMax} />
      <AxisLine axis="z" label="Time" axisMax={axisMax} />
    </group>
  )
}
