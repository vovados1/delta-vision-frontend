export type Exchange = "binance" | "bybit" | "okx" | "kraken" | "coinbase"
export type Pair = "btc/usdt" | "ltc/usdt"
export type Strategy = "cross-exchange" | "triangular"
export type Period = "1m" | "5m" | "10m"
export type RefreshRate = "live" | "1s" | "2s" | "5s" | "10s"
export type State = "on" | "off"

export interface Config {
  exchanges: Exchange[]
  pairs: Pair[]
  strategies: Strategy[]
  period: Period
  refreshRate: RefreshRate
  nodeColor: string
  lineColor: string
  gridColor: string
  state: State
}

export interface DataResponse {
  key: string
  value: string
}

export interface DataResponseValue {
  bid: number
  ask: number
  bidQty: number
  askQty: number
  timestamp: number
}
