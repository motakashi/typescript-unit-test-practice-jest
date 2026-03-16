import { describe, expect, it } from "@jest/globals";
import { groupByCategory } from "../../src/middle/10-groupByCategory";

describe("groupByCategory", () => {
  it("カテゴリごとに名前をまとめる", () => {
    expect(
      groupByCategory([
        { name: "apple", category: "fruit" },
        { name: "banana", category: "fruit" },
        { name: "carrot", category: "vegetable" }
      ])
    ).toEqual({
      fruit: ["apple", "banana"],
      vegetable: ["carrot"]
    });
  });

  it("空配列なら空オブジェクト", () => {
    expect(groupByCategory([])).toEqual({});
  });
});
