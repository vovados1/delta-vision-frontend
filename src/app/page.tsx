import { LineChart } from "~/shared/ui/3d-charts"
import type { Series } from "~/shared/ui/3d-charts/types"
import { Sidebar } from "~/shared/ui/sidebar"

// epoch in ms
const zAxisLabels = [
  1736280000000, 1735848000000, 1736539200000, 1736020800000, 1736712000000, 1735675200000, 1736366400000,
  1735934400000, 1736625600000, 1736107200000, 1735761600000, 1736452800000, 1736193600000, 1735588800000,
  1736798400000, 1735502400000, 1736884800000, 1735416000000, 1736971200000, 1735329600000,
]

const series: Series[] = [
  {
    label: "Binance",
    values: [
      42.7, 91.2, 33.5, 67.8, 12.4, 88.1, 55.9, 29.3, 76.4, 44.6, 63.2, 19.7, 18.3, 82.5, 51.8, 37.1, 94.6, 71.3, 25.9,
      58.4,
    ],
  },
  {
    label: "ByBit",
    values: [
      38.2, 72.5, 45.1, 83.9, 27.6, 61.4, 14.8, 89.3, 52.7, 36.1, 78.4, 23.9, 66.2, 41.5, 92.1, 17.3, 54.8, 79.6, 32.4,
      68.7,
    ],
  },
  {
    label: "OKX",
    values: [
      56.3, 24.8, 81.4, 39.2, 73.6, 48.1, 15.7, 62.9, 87.3, 31.5, 69.8, 43.2, 96.1, 22.4, 58.7, 74.3, 35.6, 49.8, 83.2,
      27.1,
    ],
  },
]

export default function Home() {
  return (
    <>
      <LineChart
        series={series}
        zAxisLabels={zAxisLabels.toSorted().map((epochTime) => new Date(epochTime).toLocaleString())}
        axesLabels={{ x: "Exchange", y: "Price", z: "Time" }}
      />
      <Sidebar />
    </>
  )
}
