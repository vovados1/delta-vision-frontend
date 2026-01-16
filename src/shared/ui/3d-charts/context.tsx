import { createContext, useContext } from "react"
import type { getYAxisProps } from "./utils"

export interface ContextState {
  yAxisProps: ReturnType<typeof getYAxisProps>
}

const initialState: ContextState = {
  yAxisProps: {
    axisMax: 0,
    intervalValue: 0,
    minValue: 0,
    maxValue: 0,
    convertValueIntoYPos: (value: number) => value,
  },
}

export const ChartContext = createContext<ContextState>(initialState)

export function useChartContext() {
  return useContext(ChartContext)
}
