import { describe, it, expect, jest } from "@jest/globals";
import { retryWithBackoff } from "../../src/pro-add01/09-retryWithBackoff";

describe("retryWithBackoff", () => {
  it.todo("ケース1を書く");
  it.todo("ケース2を書く");
  it.todo("ケース3を書く");
});

// ヒント:
// 初回成功→delay呼ばれない、失敗後成功→指数バックオフのwait時間を検証、maxRetries超過→最後のエラー
