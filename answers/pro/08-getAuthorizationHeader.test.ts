import { describe, expect, it } from "@jest/globals";
import { getAuthorizationHeader } from "../../src/pro/08-getAuthorizationHeader";

describe("getAuthorizationHeader", () => {
  it("tokenがあればAuthorizationヘッダーを返す", () => {
    expect(
      getAuthorizationHeader({
        getToken: () => "abc123"
      })
    ).toEqual({
      Authorization: "Bearer abc123"
    });
  });

  it("tokenがなければ空オブジェクト", () => {
    expect(
      getAuthorizationHeader({
        getToken: () => null
      })
    ).toEqual({});
  });
});
