import { describe, expect, it } from "@jest/globals";
import { canSubmitOrder } from "../../src/pro/10-canSubmitOrder";

describe("canSubmitOrder", () => {
  it("必要条件を満たせばtrue", () => {
    expect(
      canSubmitOrder({
        userId: 1,
        agreedToTerms: true,
        items: [{ productId: 10, quantity: 1 }]
      })
    ).toBe(true);
  });

  it("userIdがなければfalse", () => {
    expect(
      canSubmitOrder({
        agreedToTerms: true,
        items: [{ productId: 10, quantity: 1 }]
      })
    ).toBe(false);
  });

  it("規約未同意ならfalse", () => {
    expect(
      canSubmitOrder({
        userId: 1,
        agreedToTerms: false,
        items: [{ productId: 10, quantity: 1 }]
      })
    ).toBe(false);
  });

  it("商品が空ならfalse", () => {
    expect(
      canSubmitOrder({
        userId: 1,
        agreedToTerms: true,
        items: []
      })
    ).toBe(false);
  });

  it("数量0以下が含まれたらfalse", () => {
    expect(
      canSubmitOrder({
        userId: 1,
        agreedToTerms: true,
        items: [{ productId: 10, quantity: 0 }]
      })
    ).toBe(false);
  });
});
