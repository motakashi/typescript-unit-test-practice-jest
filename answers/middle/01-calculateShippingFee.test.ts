import { describe, expect, it } from "@jest/globals";
import { calculateShippingFee } from "../../src/middle/01-calculateShippingFee";

describe("calculateShippingFee", () => {
  it("5000円未満かつ通常地域は500円", () => {
    expect(calculateShippingFee(4999, false)).toBe(500);
  });

  it("5000円以上かつ通常地域は無料", () => {
    expect(calculateShippingFee(5000, false)).toBe(0);
  });

  it("5000円以上かつ離島は500円", () => {
    expect(calculateShippingFee(5000, true)).toBe(500);
  });

  it("負数価格は例外", () => {
    expect(() => calculateShippingFee(-1, false)).toThrowError("price must be 0 or more");
  });
});
