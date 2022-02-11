/**
 * Generate a random number between two numbers.
 *
 * @param min
 * @param max
 */
export const randomNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
