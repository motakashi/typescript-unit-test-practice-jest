import { describe, it, expect } from "@jest/globals";
import { sumArray } from "../../src/beginner/07-sumArray";

describe("sumArray", () => {
  it("配列の合計を返す", () => {
    expect(sumArray([1, 2, 3])).toBe(6);
  });

  it("空配列は0", () => {
    expect(sumArray([])).toBe(0);
  });

  it("負数を含んでも合計できる", () => {
    expect(sumArray([-1, 5, -2])).toBe(2);
  });
});

// ヒント:
// 複数要素、空配列、負数
