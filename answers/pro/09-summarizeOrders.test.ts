import { describe, expect, it } from "@jest/globals";
import { summarizeOrders } from "../../src/pro/09-summarizeOrders";

describe("summarizeOrders", () => {
  it("件数と金額とステータス別件数を集計する", () => {
    expect(
      summarizeOrders([
        { id: 1, userId: 10, amount: 1000, status: "paid" },
        { id: 2, userId: 10, amount: 2000, status: "pending" },
        { id: 3, userId: 11, amount: 500, status: "cancelled" },
        { id: 4, userId: 11, amount: 1500, status: "paid" }
      ])
    ).toEqual({
      count: 4,
      totalAmount: 5000,
      paidCount: 2,
      pendingCount: 1,
      cancelledCount: 1
    });
  });

  it("空配列ならすべて0", () => {
    expect(summarizeOrders([])).toEqual({
      count: 0,
      totalAmount: 0,
      paidCount: 0,
      pendingCount: 0,
      cancelledCount: 0
    });
  });
});
