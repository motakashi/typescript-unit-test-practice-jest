import { describe, expect, it } from "@jest/globals";
import { formatFullName } from "../../src/beginner/04-formatFullName";

describe("formatFullName", () => {
  it("姓 名 の順で結合する", () => {
    expect(formatFullName("Taro", "Yamada")).toBe("Yamada Taro");
  });
});
