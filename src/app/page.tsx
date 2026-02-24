"use client"

import { useEffect, useRef, useState } from "react"
import { LineChart } from "~/shared/ui/3d-charts"
import type { Series } from "~/shared/ui/3d-charts/types"
import { Sidebar } from "./_components/sidebar"
import { useLatest } from "~/shared/lib/hooks"
import type { Config, DataResponse } from "./types"
import { limitArr } from "~/shared/lib/utils"
import {
  DEFAULT_GRID_COLOR,
  DEFAULT_LINE_COLOR,
  DEFAULT_NODE_COLOR,
  Z_AXIS_TICKS_LIMIT,
} from "~/shared/ui/3d-charts/constants"

export default function Home() {
  const [config, setConfig] = useState<Config>({
    exchanges: [],
    pairs: [],
    strategies: [],
    refreshRate: "1s",
    nodeColor: `#${DEFAULT_NODE_COLOR.toString(16)}`,
    lineColor: `#${DEFAULT_LINE_COLOR.toString(16)}`,
    gridColor: `#${DEFAULT_GRID_COLOR.toString(16)}`,
    state: "off",
  })
  const [series, setSeries] = useState<Series[]>([])
  const [zAxisLabels, setZAxisLabels] = useState<string[]>([])
  const wsRef = useRef<WebSocket | null>(null)
  const configRef = useLatest(config)
  const isRunningRef = useRef(false)

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/data/stream`)
    wsRef.current = ws

    ws.onmessage = (_msg) => {
      try {
        const message = JSON.parse(_msg.data) as DataResponse
        if (!message.key || !message.data) throw new Error("Unexpected response format")

        setSeries((prev) => {
          const serieExists = prev.find((p) => p.label === message.key)

          return serieExists
            ? prev.map((p) =>
                p.label === message.key
                  ? { ...p, values: limitArr([...p.values, message.data.ask], Z_AXIS_TICKS_LIMIT) }
                  : p
              )
            : [...prev, { label: message.key, values: [message.data.ask] }]
        })

        setZAxisLabels((prev) => {
          const newZAxisLabels = [...new Set([...prev, message.data.timestamp])]
            .toSorted()
            .map((epochTime) => new Date(epochTime).toLocaleString())

          return limitArr(newZAxisLabels, Z_AXIS_TICKS_LIMIT)
        })
      } catch (e) {
        console.error(e)
      }
    }

    return () => {
      ws.close()
      wsRef.current = null
      isRunningRef.current = false
    }
  }, [])

  useEffect(() => {
    try {
      const ws = wsRef.current
      const cfg = configRef.current
      if (!ws || !(ws.readyState === ws.OPEN) || !cfg) return

      switch (config.state) {
        case "on":
          if (isRunningRef.current) return
          ws.send(
            JSON.stringify({
              type: "join_pool",
              exchanges: cfg.exchanges,
              pairs: cfg.pairs,
              refreshRate: cfg.refreshRate,
            })
          )
          isRunningRef.current = true
          break
        case "off":
          if (!isRunningRef.current) return
          ws.send(JSON.stringify({ type: "leave_pool" }))
          isRunningRef.current = false
          break
        default:
          throw new Error("Unknown config.state value")
      }
    } catch (e) {
      console.error(e)
    }
    // Disable exhaustive deps rule because eslint doesn't understand `useLatest` returns a RefObject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.state])

  const handleSidebarUpdate = (changes: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...changes }))

    // Make sure exchanges / pairs are repainted on change
    const nextConfig = { ...config, ...changes }
    const nextExchanges = nextConfig.exchanges || config.exchanges
    const nextPairs = nextConfig.pairs || config.pairs

    setSeries((prev) => {
      const labels = nextExchanges.flatMap((exchange) => nextPairs.map((pair) => `${exchange}_${pair}`))
      return labels.map((label) => {
        const existing = prev.find((s) => s.label === label)
        return existing || ({ label, values: [] } as Series)
      })
    })
  }

  return (
    <>
      <LineChart
        series={series}
        zAxisLabels={zAxisLabels}
        axesLabels={{ x: "Exchange", y: "Price", z: "Time" }}
        nodeColor={config.nodeColor}
        lineColor={config.lineColor}
        gridColor={config.gridColor}
      />
      <Sidebar config={config} onUpdate={handleSidebarUpdate} />
    </>
  )
}
