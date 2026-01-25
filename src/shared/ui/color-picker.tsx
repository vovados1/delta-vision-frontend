"use client"

import { clsx } from "clsx"
import { useEffect, useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"

interface ColorPickerProps extends Omit<React.ComponentPropsWithoutRef<"button">, "value" | "onChange"> {
  color: string
  onChange: (newColor: string) => void | Promise<void>
  containerClassName?: string
}

export function ColorPicker({ className, containerClassName, color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (e: PointerEvent) => {
      const container = containerRef.current
      if (!container) return
      if (!container.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("click", handleOutsideClick)
    return () => window.removeEventListener("click", handleOutsideClick)
  }, [isOpen])

  return (
    <div ref={containerRef} className={clsx("h-6 w-6", containerClassName)}>
      <button
        className={clsx("h-full w-full rounded-full border-2 shadow-md", className)}
        style={{ background: color }}
        aria-label="Select color"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && <HexColorPicker color={color} onChange={onChange} />}
    </div>
  )
}
