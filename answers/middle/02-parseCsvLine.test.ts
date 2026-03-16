import { describe, expect, it } from "@jest/globals";
import { parseCsvLine } from "../../src/middle/02-parseCsvLine";

describe("parseCsvLine", () => {
  it("カンマ区切りで分割する", () => {
    expect(parseCsvLine("a,b,c")).toEqual(["a", "b", "c"]);
  });

  it("前後の空白をtrimする", () => {
    expect(parseCsvLine(" apple, banana , cherry ")).toEqual(["apple", "banana", "cherry"]);
  });

  it("空要素も保持する", () => {
    expect(parseCsvLine("a,,c")).toEqual(["a", "", "c"]);
  });
});
