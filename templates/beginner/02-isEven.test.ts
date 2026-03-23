import { describe, it, expect } from "@jest/globals";
import { isEven } from "../../src/beginner/02-isEven";

describe("isEven", () => {
  it("偶数", () => {
    expect(isEven(2)).toBeTruthy();
  });
  it("奇数", () => {
    expect(isEven(3)).toBeFalsy();
  });
  it("0", () => {
    expect(isEven(0)).toBeTruthy();
  });
  it("負の偶数", () => {
    expect(isEven(-2)).toBeTruthy();
  });
  it("負の奇数", () => {
    expect(isEven(-3)).toBeFalsy();
  });
  it("正の少数", () => {
    expect(isEven(2.2)).toBeFalsy();
  });
  it("負の少数", () => {
    expect(isEven(-2.2)).toBeFalsy();
  });

});
