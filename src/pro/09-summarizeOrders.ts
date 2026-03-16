export type Order = {
  id: number;
  userId: number;
  amount: number;
  status: "paid" | "pending" | "cancelled";
};

export function summarizeOrders(orders: Order[]) {
  return orders.reduce(
    (acc, order) => {
      acc.count += 1;
      acc.totalAmount += order.amount;

      if (order.status === "paid") acc.paidCount += 1;
      if (order.status === "pending") acc.pendingCount += 1;
      if (order.status === "cancelled") acc.cancelledCount += 1;

      return acc;
    },
    {
      count: 0,
      totalAmount: 0,
      paidCount: 0,
      pendingCount: 0,
      cancelledCount: 0
    }
  );
}
