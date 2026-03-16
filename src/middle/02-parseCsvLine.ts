export function parseCsvLine(line: string): string[] {
  return line.split(",").map((item) => item.trim());
}
