import { describe, expect, it, jest } from "@jest/globals";
import { fetchWithRetry } from "../../src/pro/02-fetchWithRetry";

describe("fetchWithRetry", () => {
  it("1回で成功したらその値を返す", async () => {
    const task = jest.fn().mockResolvedValue("ok");

    await expect(fetchWithRetry(task, 2)).resolves.toBe("ok");
    expect(task).toHaveBeenCalledTimes(1);
  });

  it("失敗後に成功したらリトライできる", async () => {
    const task = jest
      .fn()
      .mockRejectedValueOnce(new Error("temporary"))
      .mockResolvedValueOnce("ok");

    await expect(fetchWithRetry(task, 2)).resolves.toBe("ok");
    expect(task).toHaveBeenCalledTimes(2);
  });

  it("最大回数を超えて失敗したら最後のエラーを投げる", async () => {
    const task = jest.fn().mockRejectedValue(new Error("failed"));

    await expect(fetchWithRetry(task, 1)).rejects.toThrow("failed");
    expect(task).toHaveBeenCalledTimes(2);
  });
});
