import { describe, expect, it, jest } from "@jest/globals";
import { createRateLimiter } from "../../src/pro-add01/04-createRateLimiter";
import type { Clock } from "../../src/pro-add01/04-createRateLimiter";

describe("createRateLimiter", () => {
  it("ウィンドウ内でmaxRequests以内のリクエストはすべて許可される", () => {
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(1000) };
    const limiter = createRateLimiter(3, 1000, clock);

    expect(limiter.isAllowed()).toBe(true);
    expect(limiter.isAllowed()).toBe(true);
    expect(limiter.isAllowed()).toBe(true);
  });

  it("ウィンドウ内でmaxRequestsを超えたリクエストは拒否される", () => {
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(1000) };
    const limiter = createRateLimiter(2, 1000, clock);

    limiter.isAllowed(); // 1回目
    limiter.isAllowed(); // 2回目
    expect(limiter.isAllowed()).toBe(false); // 3回目は拒否
  });

  it("ウィンドウが経過したら再びリクエストが許可される", () => {
    const clock = { now: jest.fn<Clock["now"]>() };
    const limiter = createRateLimiter(2, 1000, clock);

    // t=0 で2回リクエスト（上限到達）
    clock.now.mockReturnValue(0);
    limiter.isAllowed();
    limiter.isAllowed();
    expect(limiter.isAllowed()).toBe(false); // 拒否

    // t=1001 でウィンドウ外になり再び許可
    clock.now.mockReturnValue(1001);
    expect(limiter.isAllowed()).toBe(true);
  });
});

