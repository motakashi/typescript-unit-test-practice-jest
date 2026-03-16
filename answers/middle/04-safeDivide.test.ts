import { describe, expect, it } from "@jest/globals";
import { safeDivide } from "../../src/middle/04-safeDivide";

describe("safeDivide", () => {
  it("通常の除算結果を返す", () => {
    expect(safeDivide(10, 2)).toBe(5);
  });

  it("0で割る場合はnull", () => {
    expect(safeDivide(10, 0)).toBeNull();
  });
});
