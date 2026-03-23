import { describe, it, expect } from "@jest/globals";
import { add } from "../../src/beginner/01-add";

describe("add", () => {
  it("正と正の数字を足す", () => {
    expect(add(2, 3)).toBe(5);
  });
  it("0を足しても元の値になる", () => {
    expect(add(0, 0)).toBe(0);
  });
  it("負と負の数字を足す", () => {
    expect(add(-1, -2)).toBe(-3);
  });
});