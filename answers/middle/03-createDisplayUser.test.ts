import { describe, expect, it } from "@jest/globals";
import { createDisplayUser } from "../../src/middle/03-createDisplayUser";

describe("createDisplayUser", () => {
  it("表示用ユーザーに変換する", () => {
    expect(
      createDisplayUser({
        id: 1,
        firstName: "Taro",
        lastName: "Yamada",
        isActive: true
      })
    ).toEqual({
      id: 1,
      fullName: "Yamada Taro",
      status: "active"
    });
  });

  it("inactiveも変換できる", () => {
    expect(
      createDisplayUser({
        id: 2,
        firstName: "Hanako",
        lastName: "Sato",
        isActive: false
      }).status
    ).toBe("inactive");
  });
});
