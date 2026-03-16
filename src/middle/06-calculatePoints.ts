export type Rank = "bronze" | "silver" | "gold";

export function calculatePoints(amount: number, rank: Rank = "bronze"): number {
  if (amount < 0) {
    throw new Error("amount must be 0 or more");
  }

  const rateMap: Record<Rank, number> = {
    bronze: 0.01,
    silver: 0.03,
    gold: 0.05
  };

  return Math.floor(amount * rateMap[rank]);
}
