export type Strategy = "cross-exchange" | "triangular"
export type RefreshRate = "1s" | "2s" | "5s" | "10s"
export type State = "on" | "off"

export interface Config {
  exchanges: string[]
  pairs: string[]
  strategies: Strategy[]
  refreshRate: RefreshRate
  nodeColor: string
  lineColor: string
  gridColor: string
  state: State
}

export interface DataResponse {
  key: string
  data: DataResponseValue
}

export interface DataResponseValue {
  bid: number
  ask: number
  bidQty: number
  askQty: number
  timestamp: number
}

export interface MetadataResponse {
  exchanges: string[]
  pairs: string[]
}
