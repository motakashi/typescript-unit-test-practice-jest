import { describe, expect, it, jest } from "@jest/globals";
import { retryWithBackoff } from "../../src/pro-add01/09-retryWithBackoff";
import type { Delayer } from "../../src/pro-add01/09-retryWithBackoff";

describe("retryWithBackoff", () => {
  it("最初の試行で成功したらdelayなしで結果を返す", async () => {
    const task = jest.fn<() => Promise<string>>().mockResolvedValue("ok");
    const delayer: Delayer = {
      wait: jest.fn<Delayer["wait"]>().mockResolvedValue(undefined)
    };

    const result = await retryWithBackoff(
      task,
      { maxRetries: 3, initialDelayMs: 100, multiplier: 2 },
      delayer
    );

    expect(result).toBe("ok");
    expect(task).toHaveBeenCalledTimes(1);
    expect(delayer.wait).not.toHaveBeenCalled();
  });

  it("失敗後にリトライして成功した場合、指数バックオフの待機時間でdelayが呼ばれる", async () => {
    const task = jest.fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("fail"))
      .mockRejectedValueOnce(new Error("fail"))
      .mockResolvedValueOnce("success");
    const delayer: Delayer = {
      wait: jest.fn<Delayer["wait"]>().mockResolvedValue(undefined)
    };

    const result = await retryWithBackoff(
      task,
      { maxRetries: 3, initialDelayMs: 100, multiplier: 2 },
      delayer
    );

    expect(result).toBe("success");
    expect(task).toHaveBeenCalledTimes(3);
    expect(delayer.wait).toHaveBeenCalledTimes(2);
    expect(delayer.wait).toHaveBeenNthCalledWith(1, 100);
    expect(delayer.wait).toHaveBeenNthCalledWith(2, 200);
  });

  it("maxRetriesを超えて失敗し続けた場合は最後のエラーをスローする", async () => {
    const task = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("persistent failure"));
    const delayer: Delayer = {
      wait: jest.fn<Delayer["wait"]>().mockResolvedValue(undefined)
    };

    await expect(
      retryWithBackoff(
        task,
        { maxRetries: 2, initialDelayMs: 100, multiplier: 2 },
        delayer
      )
    ).rejects.toThrow("persistent failure");

    expect(task).toHaveBeenCalledTimes(3); // 初回 + リトライ2回
    expect(delayer.wait).toHaveBeenCalledTimes(2);
  });
});
