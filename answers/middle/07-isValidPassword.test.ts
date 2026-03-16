import { describe, expect, it } from "@jest/globals";
import { isValidPassword } from "../../src/middle/07-isValidPassword";

describe("isValidPassword", () => {
  it("条件を満たせばtrue", () => {
    expect(isValidPassword("Abcdef12")).toBe(true);
  });

  it("8文字未満ならfalse", () => {
    expect(isValidPassword("Abc123")).toBe(false);
  });

  it("大文字がなければfalse", () => {
    expect(isValidPassword("abcdef12")).toBe(false);
  });

  it("小文字がなければfalse", () => {
    expect(isValidPassword("ABCDEF12")).toBe(false);
  });

  it("数字がなければfalse", () => {
    expect(isValidPassword("Abcdefgh")).toBe(false);
  });
});
