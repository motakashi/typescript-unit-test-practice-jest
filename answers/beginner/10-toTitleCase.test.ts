import { describe, expect, it } from "@jest/globals";
import { toTitleCase } from "../../src/beginner/10-toTitleCase";

describe("toTitleCase", () => {
  it("各単語の先頭を大文字にする", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("前後や連続スペースを整える", () => {
    expect(toTitleCase("  hello   world  ")).toBe("Hello World");
  });

  it("大文字小文字混在を正規化する", () => {
    expect(toTitleCase("tYpEsCrIpT")).toBe("Typescript");
  });
});
