import { describe, expect, it, jest } from "@jest/globals";
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
      name: "  Taro  ",
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

  it("email重複ならsaveしない", async () => {
    const repo = {
      existsByEmail: jest.fn().mockResolvedValue(true),
      save: jest.fn()
    };

    await expect(
      registerUser(repo, { name: "Taro", email: "a@example.com" })
    ).rejects.toThrow("email already exists");

    expect(repo.save).not.toHaveBeenCalled();
  });
});
