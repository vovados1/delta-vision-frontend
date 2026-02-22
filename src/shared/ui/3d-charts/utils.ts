import { BUFFER, X_AXIS_STEP, Y_AXIS_TICKS_LIMIT, Z_AXIS_TICKS_LIMIT } from "./constants"
import type { Series } from "./types"

export const withBufferPoint = (pos: number) => pos + BUFFER

export const niceRound = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

/** Rounds to the nearest "nice" tick spacing using Heckbert's thresholds */
const niceSpacing = (rawSpacing: number) => {
  const exponent = Math.floor(Math.log10(rawSpacing))
  const fraction = rawSpacing / 10 ** exponent
  let nice = 10
  if (fraction < 1.5) nice = 1
  else if (fraction < 3) nice = 2
  else if (fraction < 7) nice = 5
  return nice * 10 ** exponent
}

/** Next value in the 1, 2, 5, 10, 20, 50, ... sequence strictly greater than x */
const nextNiceSpacing = (x: number) => {
  const exponent = Math.floor(Math.log10(x))
  const fraction = x / 10 ** exponent
  if (fraction <= 1) return 2 * 10 ** exponent
  if (fraction <= 2) return 5 * 10 ** exponent
  return 10 ** (exponent + 1)
}

const niceFloor = (value: number, step: number) => Math.floor(value / step) * step
const niceCeil = (value: number, step: number) => Math.ceil(value / step) * step

export const getYAxisProps = (series: Series[]) => {
  const allValues = series.flatMap((s) => s.values)
  const minValue = Math.min(...allValues)
  const maxValue = Math.max(...allValues)

  const range = maxValue - minValue || 1
  let spacing = niceSpacing(range / (Y_AXIS_TICKS_LIMIT - 1))
  let min = niceFloor(minValue, spacing)
  let max = niceCeil(maxValue, spacing)

  while ((max - min) / spacing + 1 > Y_AXIS_TICKS_LIMIT) {
    spacing = nextNiceSpacing(spacing)
    min = niceFloor(minValue, spacing)
    max = niceCeil(maxValue, spacing)
  }

  const tickCount = Math.round((max - min) / spacing) + 1
  const ticks = Array.from({ length: tickCount }, (_, i) => String(niceRound(min + i * spacing)))

  // Ticks render at 1-based positions (AxisLine uses axisValue={i + 1})
  return {
    ticks,
    convertValueIntoYPos: (value: number) => (value - min) / spacing + 1,
  }
}

export const limitZAxisLabels = (zAxisLabels: string[]) => zAxisLabels.toReversed().slice(0, Z_AXIS_TICKS_LIMIT - 1)

export const getXPos = (x: number) => x * X_AXIS_STEP
