import { describe, expect, it } from "@jest/globals";
import { getActiveUserNames } from "../../src/middle/05-getActiveUserNames";

describe("getActiveUserNames", () => {
  it("activeユーザー名だけ返す", () => {
    expect(
      getActiveUserNames([
        { id: 1, name: "A", isActive: true },
        { id: 2, name: "B", isActive: false },
        { id: 3, name: "C", isActive: true }
      ])
    ).toEqual(["A", "C"]);
  });

  it("activeがいなければ空配列", () => {
    expect(getActiveUserNames([{ id: 1, name: "A", isActive: false }])).toEqual([]);
  });
});
