import { useRef } from "react"

export function useLatest<T>(value: T) {
  const ref = useRef<T>(value)
  /* eslint-disable-next-line */
  ref.current = value
  return ref
}
