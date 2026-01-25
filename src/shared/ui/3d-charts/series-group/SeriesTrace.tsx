import type { Vector3Tuple } from "three"
import type { Series } from "../types"
import { DataPoint } from "./DataPoint"
import { DataLine } from "./DataLine"
import { X_AXIS_STEP } from "../constants"
import { useChartContext } from "../context"

interface SeriesTraceProps {
  seriesItem: Series
  index: number
}

export function SeriesTrace({ seriesItem, index }: SeriesTraceProps) {
  const { yAxisProps } = useChartContext()

  const X_POSITION = X_AXIS_STEP * (index + 1)
  const position: Vector3Tuple = [X_POSITION, 0, 0]

  return (
    <group position={position}>
      {/* Rendering datapoints (nodes) */}
      {seriesItem.values.map((value, valueIndex) => (
        <DataPoint
          key={`datapoint-${seriesItem.label}-${value}-${valueIndex}`}
          label={seriesItem.label}
          value={value}
          position={[0, yAxisProps.convertValueIntoYPos(value), valueIndex + 1]}
        />
      ))}

      {/* Rendering lines connecting datapoints (nodes) */}
      {seriesItem.values.length > 1 &&
        seriesItem.values
          .slice(0, -1)
          .map((value, valueIndex) => (
            <DataLine
              key={`line-${seriesItem.label}-${value}-${valueIndex}`}
              from={[0, yAxisProps.convertValueIntoYPos(value), valueIndex + 1]}
              to={[0, yAxisProps.convertValueIntoYPos(seriesItem.values[valueIndex + 1]), valueIndex + 2]}
            />
          ))}
    </group>
  )
}
