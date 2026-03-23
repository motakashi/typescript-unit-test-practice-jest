import { describe, expect, it, jest } from "@jest/globals";
import { createCircuitBreaker } from "../../src/pro-add01/05-createCircuitBreaker";
import type { Clock } from "../../src/pro-add01/05-createCircuitBreaker";

describe("createCircuitBreaker", () => {
  it("closed状態ではタスクを実行して結果を返す", async () => {
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(0) };
    const cb = createCircuitBreaker({ failureThreshold: 3, recoveryTimeMs: 5000 }, clock);
    const task = jest.fn<() => Promise<string>>().mockResolvedValue("success");

    const result = await cb.call(task);

    expect(result).toBe("success");
    expect(cb.state).toBe("closed");
    expect(task).toHaveBeenCalledTimes(1);
  });

  it("失敗がfailureThresholdに達するとopen状態になる", async () => {
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(0) };
    const cb = createCircuitBreaker({ failureThreshold: 2, recoveryTimeMs: 5000 }, clock);
    const task = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("failure"));

    await expect(cb.call(task)).rejects.toThrow("failure");
    await expect(cb.call(task)).rejects.toThrow("failure");

    expect(cb.state).toBe("open");
  });

  it("open状態ではタスクを呼ばずに即座に例外をスローする", async () => {
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(0) };
    const cb = createCircuitBreaker({ failureThreshold: 1, recoveryTimeMs: 5000 }, clock);

    // 1回失敗してオープン
    const failTask = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("failure"));
    await expect(cb.call(failTask)).rejects.toThrow("failure");
    expect(cb.state).toBe("open");

    // オープン中は即エラー
    const nextTask = jest.fn<() => Promise<string>>().mockResolvedValue("ok");
    await expect(cb.call(nextTask)).rejects.toThrow("circuit is open");
    expect(nextTask).not.toHaveBeenCalled();
  });

  it("recoveryTimeMs経過後に成功するとhalf-openを経てclosedに戻る", async () => {
    const clock = { now: jest.fn<Clock["now"]>() };
    const cb = createCircuitBreaker({ failureThreshold: 1, recoveryTimeMs: 5000 }, clock);

    // t=0 で失敗してオープン
    clock.now.mockReturnValue(0);
    const failTask = jest.fn<() => Promise<string>>().mockRejectedValue(new Error("failure"));
    await expect(cb.call(failTask)).rejects.toThrow("failure");
    expect(cb.state).toBe("open");

    // t=5001 でrecoveryTime経過後に成功
    clock.now.mockReturnValue(5001);
    const successTask = jest.fn<() => Promise<string>>().mockResolvedValue("recovered");
    const result = await cb.call(successTask);

    expect(result).toBe("recovered");
    expect(cb.state).toBe("closed");
  });
});
