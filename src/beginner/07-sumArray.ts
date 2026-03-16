export function sumArray(values: number[]): number {
  return values.reduce((total, current) => total + current, 0);
}
