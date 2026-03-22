import { describe, it, expect, jest } from "@jest/globals";
import { createRateLimiter } from "../../src/pro-add01/04-createRateLimiter";

describe("createRateLimiter", () => {
  it.todo("ケース1を書く");
  it.todo("ケース2を書く");
  it.todo("ケース3を書く");
});

// ヒント:
// maxRequests以内は許可、超過は拒否、時間ウィンドウ経過後は再び許可（clockモックで時刻を制御）
