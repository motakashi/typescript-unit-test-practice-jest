import { describe, expect, it } from "@jest/globals";
import { calculateInvoice } from "../../src/pro/06-calculateInvoice";

describe("calculateInvoice", () => {
  it("小計・税額・合計を計算できる", () => {
    expect(
      calculateInvoice([
        { name: "A", unitPrice: 1000, quantity: 2, taxable: true },
        { name: "B", unitPrice: 500, quantity: 1, taxable: false }
      ])
    ).toEqual({
      subtotal: 2500,
      tax: 200,
      total: 2700
    });
  });

  it("課税対象がなければ税額0", () => {
    expect(
      calculateInvoice([{ name: "B", unitPrice: 500, quantity: 2, taxable: false }])
    ).toEqual({
      subtotal: 1000,
      tax: 0,
      total: 1000
    });
  });
});
