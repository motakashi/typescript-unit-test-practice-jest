import { describe, it, expect, jest } from "@jest/globals";
import { withTransaction } from "../../src/pro-add01/03-withTransaction";

describe("withTransaction", () => {
  it.todo("ケース1を書く");
  it.todo("ケース2を書く");
  it.todo("ケース3を書く");
});

// ヒント:
// 成功時はcommit・rollbackなし、失敗時はrollbackして例外再スロー、actionにtxが渡されること
