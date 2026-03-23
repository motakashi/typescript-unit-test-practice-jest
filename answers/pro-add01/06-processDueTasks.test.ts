import { describe, expect, it, jest } from "@jest/globals";
import { processDueTasks } from "../../src/pro-add01/06-processDueTasks";
import type { Clock, TaskRunner } from "../../src/pro-add01/06-processDueTasks";

describe("processDueTasks", () => {
  it("現在時刻以前にスケジュールされたタスクだけ実行して実行IDリストを返す", async () => {
    const now = new Date("2026-01-01T10:00:00Z");
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(now) };
    const runner: TaskRunner = {
      run: jest.fn<TaskRunner["run"]>().mockResolvedValue(undefined)
    };

    const tasks = [
      { id: "t1", scheduledAt: new Date("2026-01-01T09:00:00Z"), action: "send-email" },
      { id: "t2", scheduledAt: new Date("2026-01-01T10:00:00Z"), action: "cleanup" },
      { id: "t3", scheduledAt: new Date("2026-01-01T11:00:00Z"), action: "report" }
    ];

    const executed = await processDueTasks(tasks, runner, clock);

    expect(executed).toEqual(["t1", "t2"]);
    expect(runner.run).toHaveBeenCalledTimes(2);
    expect(runner.run).toHaveBeenCalledWith("t1", "send-email");
    expect(runner.run).toHaveBeenCalledWith("t2", "cleanup");
  });

  it("未来のタスクしかなければrunnerを呼ばずに空配列を返す", async () => {
    const now = new Date("2026-01-01T10:00:00Z");
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(now) };
    const runner: TaskRunner = { run: jest.fn<TaskRunner["run"]>() };

    const tasks = [
      { id: "t1", scheduledAt: new Date("2026-01-01T11:00:00Z"), action: "future" }
    ];

    const executed = await processDueTasks(tasks, runner, clock);

    expect(executed).toEqual([]);
    expect(runner.run).not.toHaveBeenCalled();
  });

  it("タスクが空の場合は空配列を返す", async () => {
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(new Date()) };
    const runner: TaskRunner = { run: jest.fn<TaskRunner["run"]>() };

    const executed = await processDueTasks([], runner, clock);

    expect(executed).toEqual([]);
  });
});
