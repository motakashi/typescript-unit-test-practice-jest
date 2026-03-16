import { describe, expect, it } from "@jest/globals";
import { isEven } from "../../src/beginner/02-isEven";

describe("isEven", () => {
  it("偶数ならtrueを返す", () => {
    expect(isEven(4)).toBe(true);
  });

  it("奇数ならfalseを返す", () => {
    expect(isEven(5)).toBe(false);
  });

  it("0は偶数", () => {
    expect(isEven(0)).toBe(true);
  });
});
