import { describe, expect, it } from "@jest/globals";
import { buildSearchParams } from "../../src/pro/04-buildSearchParams";

describe("buildSearchParams", () => {
  it("指定されたパラメータだけを連結する", () => {
    expect(
      buildSearchParams({
        keyword: "  test  ",
        page: 2,
        tags: ["ts", "unit"]
      })
    ).toBe("keyword=test&page=2&tags=ts%2Cunit");
  });

  it("空値は無視する", () => {
    expect(buildSearchParams({ keyword: "   ", page: 0, tags: [] })).toBe("");
  });
});
