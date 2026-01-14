/**
 * Constrains a value to be within a specified range (inclusive).
 *
 * @param min - The minimum allowed value (inclusive)
 * @param max - The maximum allowed value (inclusive)
 * @param curr - The value to constrain
 * @returns The constrained value within [min, max]
 *
 * @example
 * clamp(0, 100, 50)   // => 50
 * clamp(0, 100, -10)  // => 0
 * clamp(0, 100, 150)  // => 100
 */
export const clamp = (min: number, max: number, curr: number) => {
  if (curr < min) return min
  else if (curr > max) return max
  return curr
}
