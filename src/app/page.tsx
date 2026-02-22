"use client"

import { useEffect, useRef, useState } from "react"
import { LineChart } from "~/shared/ui/3d-charts"
import type { Series } from "~/shared/ui/3d-charts/types"
import { Sidebar } from "./_components/sidebar"
import type { Config, DataResponse, DataResponseValue } from "./types"

// epoch in ms
const zAxisLabels = []

const series: Series[] = [
  {
    label: "Binance",
    values: [],
  },
  {
    label: "ByBit",
    values: [],
  },
  // {
  //   label: "OKX",
  //   values: [400, 350, 600],
  // },
]

export default function Home() {
  const [config, setConfig] = useState<Config>({
    exchanges: [],
    pairs: [],
    strategies: [],
    period: "1m",
    refreshRate: "live",
    nodeColor: "#22c55e",
    lineColor: "#16a34a",
    gridColor: "#ffffff",
    state: "off",
  })
  // const [series, setSeries] = useState<Series[]>([])
  // const [zAxisLabels, setZAxisLabels] = useState<number[]>([])
  // const subscribedRef = useRef<string[]>([])
  // const wsRef = useRef(new WebSocket(`ws://localhost:7000/data`))

  // console.log(series, zAxisLabels)

  // useEffect(() => {
  //   const ws = wsRef.current
  //   if (!ws) return

  //   ws.onmessage = (_msg) => {
  //     const message = JSON.parse(_msg.data) as DataResponse
  //     const value = JSON.parse(message.value) as DataResponseValue

  //     // Guard against invalid values that would cause NaN in geometry
  //     if (!Number.isFinite(value.ask) || !Number.isFinite(value.timestamp)) {
  //       console.warn("Received invalid data:", value)
  //       return
  //     }

  //     setSeries((prev) => {
  //       const serieExists = prev.find((p) => p.label === message.key)

  //       return serieExists
  //         ? prev.map((p) => (p.label === message.key ? { label: p.label, values: [...p.values, value.ask] } : p))
  //         : [...prev, { label: message.key, values: [value.ask] }]
  //     })

  //     setZAxisLabels((prev) => [...prev, value.timestamp + Math.random()])
  //   }

  //   return ws.close
  // }, [])

  // useEffect(() => {
  //   const ws = wsRef.current
  //   const subscribed = subscribedRef.current
  //   if (!ws || !subscribed) return

  //   config.exchanges.forEach((exchange) =>
  //     config.pairs.forEach((pair) => {
  //       const key = `${exchange}_${pair}`
  //       if (subscribed.includes(key)) return
  //       ws.send(JSON.stringify({ action: "subscribe", key }))
  //     })
  //   )
  // }, [config.exchanges, config.pairs])

  return (
    <>
      <LineChart
        series={series}
        zAxisLabels={zAxisLabels.map((z) => z.toString())}
        // zAxisLabels={zAxisLabels.toSorted().map((epochTime) => new Date(epochTime).toLocaleString())}
        axesLabels={{ x: "Exchange", y: "Price", z: "Time" }}
        nodeColor={config.nodeColor}
        lineColor={config.lineColor}
        gridColor={config.gridColor}
      />
      <Sidebar config={config} onUpdate={(changes) => setConfig((prev) => ({ ...prev, ...changes }))} />
    </>
  )
}
