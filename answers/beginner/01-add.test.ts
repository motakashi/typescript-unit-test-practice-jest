import { describe, expect, it } from "@jest/globals";
import { add } from "../../src/beginner/01-add";

describe("add", () => {
  it("2つの数を足せる", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("0を足しても元の値になる", () => {
    expect(add(7, 0)).toBe(7);
  });

  it("負数も足せる", () => {
    expect(add(-2, 5)).toBe(3);
  });
});
