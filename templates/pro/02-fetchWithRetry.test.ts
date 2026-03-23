import { describe, it, expect } from "@jest/globals";
import { fetchWithRetry } from "../../src/pro/02-fetchWithRetry";

describe("fetchWithRetry", () => {
  it("正常登録できる", async () => {
    const task = jest.fn().mockResolvedValue("ok");
    const result = await fetchWithRetry(task,2);

    expect(task).toHaveBeenCalledTimes(1);
  });
});

// ヒント:
// 成功、リトライ成功、最大回数超過
