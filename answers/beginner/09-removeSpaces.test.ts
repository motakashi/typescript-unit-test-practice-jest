import { describe, expect, it } from "@jest/globals";
import { removeSpaces } from "../../src/beginner/09-removeSpaces";

describe("removeSpaces", () => {
  it("半角スペースを除去する", () => {
    expect(removeSpaces("a b c")).toBe("abc");
  });

  it("改行やタブも除去する", () => {
    expect(removeSpaces("a
 b	c")).toBe("abc");
  });
});
