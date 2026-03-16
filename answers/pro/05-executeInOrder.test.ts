import { describe, expect, it } from "@jest/globals";
import { executeInOrder } from "../../src/pro/05-executeInOrder";

describe("executeInOrder", () => {
  it("タスクを順番通りに実行する", async () => {
    const logs: string[] = [];

    const tasks = [
      async () => {
        logs.push("task1");
        return 1;
      },
      async () => {
        logs.push("task2");
        return 2;
      },
      async () => {
        logs.push("task3");
        return 3;
      }
    ];

    await expect(executeInOrder(tasks)).resolves.toEqual([1, 2, 3]);
    expect(logs).toEqual(["task1", "task2", "task3"]);
  });
});
