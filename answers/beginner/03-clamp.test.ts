import { describe, expect, it } from "@jest/globals";
import { clamp } from "../../src/beginner/03-clamp";

describe("clamp", () => {
  it("最小値未満ならminを返す", () => {
    expect(clamp(1, 3, 10)).toBe(3);
  });

  it("範囲内ならそのまま返す", () => {
    expect(clamp(5, 3, 10)).toBe(5);
  });

  it("最大値超過ならmaxを返す", () => {
    expect(clamp(20, 3, 10)).toBe(10);
  });
});
