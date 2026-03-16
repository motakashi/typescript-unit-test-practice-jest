import { describe, expect, it } from "@jest/globals";
import { findUserById } from "../../src/beginner/08-findUserById";

describe("findUserById", () => {
  const users = [
    { id: 1, name: "A" },
    { id: 2, name: "B" }
  ];

  it("ID一致のユーザーを返す", () => {
    expect(findUserById(users, 2)).toEqual({ id: 2, name: "B" });
  });

  it("見つからなければundefined", () => {
    expect(findUserById(users, 99)).toBeUndefined();
  });
});
