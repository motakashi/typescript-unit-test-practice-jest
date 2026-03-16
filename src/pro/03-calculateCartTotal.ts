export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

export function calculateCartTotal(items: CartItem[], couponCode?: string): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (couponCode === "SALE10") {
    return Math.floor(subtotal * 0.9);
  }

  if (couponCode === "FLAT500" && subtotal >= 3000) {
    return subtotal - 500;
  }

  return subtotal;
}
