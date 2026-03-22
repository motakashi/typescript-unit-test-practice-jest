export type Clock = {
  now(): Date;
};

export type ScheduledTask = {
  id: string;
  scheduledAt: Date;
  action: string;
};

export type TaskRunner = {
  run(taskId: string, action: string): Promise<void>;
};

/**
 * 現在時刻以前にスケジュールされているタスクを順次実行する。
 * @returns 実行したタスクのIDリスト
 */
export async function processDueTasks(
  tasks: ScheduledTask[],
  runner: TaskRunner,
  clock: Clock
): Promise<string[]> {
  const now = clock.now();
  const due = tasks.filter((t) => t.scheduledAt <= now);

  const executed: string[] = [];
  for (const task of due) {
    await runner.run(task.id, task.action);
    executed.push(task.id);
  }

  return executed;
}
