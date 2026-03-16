import { describe, expect, it } from "@jest/globals";
import { countVowels } from "../../src/beginner/05-countVowels";

describe("countVowels", () => {
  it("母音の数を数える", () => {
    expect(countVowels("education")).toBe(5);
  });

  it("大文字も数える", () => {
    expect(countVowels("AEIOU")).toBe(5);
  });

  it("母音がなければ0", () => {
    expect(countVowels("rhythm")).toBe(0);
  });
});
