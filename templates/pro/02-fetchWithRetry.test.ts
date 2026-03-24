import { describe, it, expect } from "@jest/globals";
import { fetchWithRetry } from "../../src/pro/02-fetchWithRetry";

describe("fetchWithRetry", () => {
  it("正常登録できる", async () => {
    const task = jest.fn().mockResolvedValue("ok");
    const result = await fetchWithRetry(task,2);

    expect(task).toHaveBeenCalledTimes(1);
  });

  it("2回目で登録できる", async () => {
    const task = jest.fn()
    .mockRejectedValueOnce(new Error("temporary"))
    .mockResolvedValueOnce("ok");
    const result = await fetchWithRetry(task,2);
    expect(task).toHaveBeenCalledTimes(2);
  });

  it("すべて失敗でエラーが投げられる", async () => {
    const task = jest.fn().mockRejectedValue(new Error("failed"));

    await expect(fetchWithRetry(task, 2)).rejects.toThrow("failed");
    expect(task).toHaveBeenCalledTimes(3)
  });
});

// ヒント:
// 成功、リトライ成功、最大回数超過
