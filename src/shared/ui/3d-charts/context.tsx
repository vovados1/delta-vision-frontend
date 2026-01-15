import { createContext, useContext } from "react"
import type { getYAxisBoundaries } from "./utils"

export interface ContextState {
  yAxisBoundaries: ReturnType<typeof getYAxisBoundaries>
  step: number
}

const initialState: ContextState = {
  yAxisBoundaries: { minValue: 0, maxValue: 0 },
  step: 0,
}

export const ChartContext = createContext<ContextState>(initialState)

export function useChartContext() {
  return useContext(ChartContext)
}
