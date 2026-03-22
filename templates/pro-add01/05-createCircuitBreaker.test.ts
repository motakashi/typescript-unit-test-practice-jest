import { describe, it, expect, jest } from "@jest/globals";
import { createCircuitBreaker } from "../../src/pro-add01/05-createCircuitBreaker";

describe("createCircuitBreaker", () => {
  it.todo("ケース1を書く");
  it.todo("ケース2を書く");
  it.todo("ケース3を書く");
  it.todo("ケース4を書く");
});

// ヒント:
// closed→タスク成功、失敗がthresholdに達するとopen、open→即例外、recoveryTime経過後にhalf-open→closed
