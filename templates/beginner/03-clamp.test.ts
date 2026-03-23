import { describe, it, expect } from "@jest/globals";
import { clamp } from "../../src/beginner/03-clamp";

describe("clamp", () => {
  it("範囲内において境界値内", () => {
    const value = 2;
    const min = 1;
    const max = 3;

    expect(clamp(value, min, max)).toBe(2)
  })

  it("境界値外（最低値）", () => {
    const value = 1;
    const min = 2;
    const max = 3;

    expect(clamp(value, min, max)).toBe(2)
  })

  it("境界値外（最大値）", () => {
    const value = 3;
    const min = 1;
    const max = 2;

    expect(clamp(value, min, max)).toBe(2)
  })

  it("すべて同じ", () => {
    const value = 1;
    const min = 1;
    const max = 1;

    expect(clamp(value, min, max)).toBe(1)
  })

  it("負を含む場合", () => {
    const value = -1;
    const min = -2;
    const max = 1;

    expect(clamp(value, min, max)).toBe(-1)
  })
});

// ヒント:
// min未満、範囲内、max超過
