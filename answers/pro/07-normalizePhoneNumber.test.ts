import { describe, expect, it } from "@jest/globals";
import { normalizePhoneNumber } from "../../src/pro/07-normalizePhoneNumber";

describe("normalizePhoneNumber", () => {
  it("記号を除去して返す", () => {
    expect(normalizePhoneNumber("090-1234-5678")).toBe("09012345678");
  });

  it("10桁も許可する", () => {
    expect(normalizePhoneNumber("03-1234-5678")).toBe("0312345678");
  });

  it("桁数不正は例外", () => {
    expect(() => normalizePhoneNumber("12345")).toThrowError("phone number is invalid");
  });
});
