import { describe, it, expect } from "@jest/globals";
import { countVowels } from "../../src/beginner/05-countVowels";

describe("countVowels", () => {
  it("母音の数を数える", () => {
    expect(countVowels("education")).toBe(5);
  });

  it("大文字小文字を区別せず母音を数える", () => {
    expect(countVowels("AEIOUaeiou")).toBe(10);
  });

  it("空文字は0", () => {
    expect(countVowels(""))
      .toBe(0);
  });

  it("母音がなければ0", () => {
    expect(countVowels("rhythm")).toBe(0);
  });
});
