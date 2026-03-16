export function getDiscountRate(age: number): number {
  if (age < 0) {
    throw new Error("age must be 0 or more");
  }
  if (age <= 12) return 0.5;
  if (age >= 65) return 0.3;
  return 0;
}
