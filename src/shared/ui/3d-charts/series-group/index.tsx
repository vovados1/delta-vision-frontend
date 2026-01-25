import type { Series } from "../types"
import { SeriesTrace } from "./SeriesTrace"

interface SeriesGroupProps {
  series: Series[]
}

export function SeriesGroup({ series }: SeriesGroupProps) {
  return (
    <group>
      {series.map((seriesItem, index) => (
        <SeriesTrace key={seriesItem.label} seriesItem={seriesItem} index={index} />
      ))}
    </group>
  )
}
