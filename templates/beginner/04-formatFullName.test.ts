import { describe, it, expect } from "@jest/globals";
import { formatFullName } from "../../src/beginner/04-formatFullName";

describe("formatFullName", () => {
  it("姓 名 の順で結合する", () => {
    expect(formatFullName("Taro", "Yamada")).toBe("Yamada Taro");
  });

  it("スペースは1つで結合される", () => {
    expect(formatFullName("Hanako", "Sato")).toBe("Sato Hanako");
  });

  it("空文字でもそのまま結合する", () => {
    expect(formatFullName("", "Yamada")).toBe("Yamada ");
  });
});

// ヒント:
// 姓名の結合順を確認する
