import { createContext, useContext } from "react"
import type { getYAxisProps } from "./utils"
import { DEFAULT_GRID_COLOR, DEFAULT_LINE_COLOR, DEFAULT_NODE_COLOR } from "./constants"

export interface ContextState {
  yAxisProps: ReturnType<typeof getYAxisProps>
  nodeColor: number | string
  lineColor: number | string
  gridColor: number | string
}

const initialState: ContextState = {
  yAxisProps: {
    ticks: [],
    convertValueIntoYPos: (value: number) => value,
  },
  nodeColor: DEFAULT_NODE_COLOR,
  lineColor: DEFAULT_LINE_COLOR,
  gridColor: DEFAULT_GRID_COLOR,
}

export const ChartContext = createContext<ContextState>(initialState)

export function useChartContext() {
  return useContext(ChartContext)
}
