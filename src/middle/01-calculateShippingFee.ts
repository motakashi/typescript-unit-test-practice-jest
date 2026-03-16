export function calculateShippingFee(price: number, isRemoteArea: boolean): number {
  if (price < 0) {
    throw new Error("price must be 0 or more");
  }
  if (price >= 5000) {
    return isRemoteArea ? 500 : 0;
  }
  return isRemoteArea ? 1000 : 500;
}
