export type OrderInput = {
  userId?: number;
  items: Array<{ productId: number; quantity: number }>;
  agreedToTerms: boolean;
};

export function canSubmitOrder(input: OrderInput): boolean {
  if (!input.userId) return false;
  if (!input.agreedToTerms) return false;
  if (input.items.length === 0) return false;
  if (input.items.some((item) => item.quantity <= 0)) return false;
  return true;
}
