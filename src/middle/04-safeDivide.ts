export function safeDivide(a: number, b: number): number | null {
  if (b === 0) return null;
  return a / b;
}
