export type DomainEvent = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
};

export type EventStore = {
  append(event: DomainEvent): Promise<void>;
};

export type EventDeduplicator = {
  isDuplicate(eventId: string): Promise<boolean>;
  markProcessed(eventId: string): Promise<void>;
};

/**
 * イベントリストを冪等に処理する。
 * 重複しているイベントはスキップし、新規イベントのみストアに保存する。
 * @returns 処理件数とスキップ件数
 */
export async function processEvents(
  events: DomainEvent[],
  store: EventStore,
  deduplicator: EventDeduplicator
): Promise<{ processed: number; skipped: number }> {
  let processed = 0;
  let skipped = 0;

  for (const event of events) {
    const isDup = await deduplicator.isDuplicate(event.id);
    if (isDup) {
      skipped++;
      continue;
    }

    await store.append(event);
    await deduplicator.markProcessed(event.id);
    processed++;
  }

  return { processed, skipped };
}
