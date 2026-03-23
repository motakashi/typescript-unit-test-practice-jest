import { describe, it, expect } from "@jest/globals";
import { registerUser } from "../../src/pro/01-registerUser";

describe("registerUser", () => {
  it("正常登録できる", async () => {
    const repo = {
      existsByEmail: jest.fn().mockResolvedValue(false),
      save: jest.fn().mockResolvedValue({
        id: 1,
        name: "Taro",
        email: "taro@example.com"
      })
    };

    const result = await registerUser(repo, {
      name: "Taro",
      email: "TARO@EXAMPLE.COM "
    });

    expect(repo.existsByEmail).toHaveBeenCalledWith("TARO@EXAMPLE.COM ");
    expect(repo.save).toHaveBeenCalledWith({
      name: "Taro",
      email: "taro@example.com"
    });
    expect(result).toEqual({
      id: 1,
      name: "Taro",
      email: "taro@example.com"
    });
  });


  it("名前が空なら例外", async () => {
    const repo = {
      existsByEmail: jest.fn(),
      save: jest.fn()
    };

    await expect(registerUser(repo, { name: "   ", email: "a@example.com" })).rejects.toThrow(
      "name is required"
    );
  });

  it("メールアドレスに@マークがない場合例外", async () => {
    const repo = {
      existsByEmail: jest.fn(),
      save: jest.fn()
    };

    await expect(registerUser(repo, { name: "テスト　太郎", email: "aexample.com" })).rejects.toThrow(
      "email is invalid"
    );
  });

  it("すでにメールアドレスが存在している場合例外", async () => {
    const repo = {
      existsByEmail: jest.fn().mockResolvedValue("same-address@example.com"),
      save: jest.fn()
    };

    await expect(registerUser(repo, { name: "テスト　太郎", email: "same-address@example.com" })).rejects.toThrow(
      "email already exists"
    );
  });
});

// ヒント:
// 依存注入、例外、trim/lowercase、save呼び出し
