import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const limitArr = <T>(arr: T[], maxItems: number) => {
  if (arr.length <= maxItems) return arr
  return arr.slice(arr.length - maxItems)
}
