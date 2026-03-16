import { describe, expect, it } from "@jest/globals";
import { formatDateYmd } from "../../src/middle/08-formatDateYmd";

describe("formatDateYmd", () => {
  it("YYYY-MM-DD形式で返す", () => {
    expect(formatDateYmd(new Date(2026, 2, 7))).toBe("2026-03-07");
  });

  it("2桁ゼロ埋めされる", () => {
    expect(formatDateYmd(new Date(2026, 0, 1))).toBe("2026-01-01");
  });
});
