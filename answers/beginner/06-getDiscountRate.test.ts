import { describe, expect, it } from "@jest/globals";
import { getDiscountRate } from "../../src/beginner/06-getDiscountRate";

describe("getDiscountRate", () => {
  it("12歳以下は50%割引", () => {
    expect(getDiscountRate(12)).toBe(0.5);
  });

  it("65歳以上は30%割引", () => {
    expect(getDiscountRate(65)).toBe(0.3);
  });

  it("通常年齢は割引なし", () => {
    expect(getDiscountRate(30)).toBe(0);
  });

  it("負数年齢は例外", () => {
    expect(() => getDiscountRate(-1)).toThrowError("age must be 0 or more");
  });
});
