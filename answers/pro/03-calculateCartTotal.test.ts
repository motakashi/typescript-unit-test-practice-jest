import { describe, expect, it } from "@jest/globals";
import { calculateCartTotal } from "../../src/pro/03-calculateCartTotal";

describe("calculateCartTotal", () => {
  const items = [
    { name: "A", price: 1000, quantity: 2 },
    { name: "B", price: 500, quantity: 1 }
  ];

  it("クーポンなしなら小計", () => {
    expect(calculateCartTotal(items)).toBe(2500);
  });

  it("SALE10なら10%オフして切り捨て", () => {
    expect(calculateCartTotal(items, "SALE10")).toBe(2250);
  });

  it("FLAT500は3000円未満なら適用されない", () => {
    expect(calculateCartTotal(items, "FLAT500")).toBe(2500);
  });

  it("FLAT500は3000円以上で500円引き", () => {
    expect(
      calculateCartTotal(
        [
          { name: "A", price: 1000, quantity: 3 },
          { name: "B", price: 500, quantity: 1 }
        ],
        "FLAT500"
      )
    ).toBe(3000);
  });
});
