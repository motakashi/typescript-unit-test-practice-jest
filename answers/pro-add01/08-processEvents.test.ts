import { describe, expect, it, jest } from "@jest/globals";
import { processEvents } from "../../src/pro-add01/08-processEvents";
import type { EventStore, EventDeduplicator } from "../../src/pro-add01/08-processEvents";

describe("processEvents", () => {
  it("重複していないイベントはstoreに保存してprocessedにカウントされる", async () => {
    const store: EventStore = {
      append: jest.fn<EventStore["append"]>().mockResolvedValue(undefined)
    };
    const deduplicator: EventDeduplicator = {
      isDuplicate: jest.fn<EventDeduplicator["isDuplicate"]>().mockResolvedValue(false),
      markProcessed: jest.fn<EventDeduplicator["markProcessed"]>().mockResolvedValue(undefined)
    };

    const events = [
      { id: "e1", type: "user.created", payload: { userId: 1 } },
      { id: "e2", type: "user.updated", payload: { userId: 1 } }
    ];

    const result = await processEvents(events, store, deduplicator);

    expect(result).toEqual({ processed: 2, skipped: 0 });
    expect(store.append).toHaveBeenCalledTimes(2);
    expect(deduplicator.markProcessed).toHaveBeenCalledWith("e1");
    expect(deduplicator.markProcessed).toHaveBeenCalledWith("e2");
  });

  it("重複しているイベントはstoreに保存せずskippedにカウントされる", async () => {
    const store: EventStore = {
      append: jest.fn<EventStore["append"]>()
    };
    const deduplicator: EventDeduplicator = {
      isDuplicate: jest.fn<EventDeduplicator["isDuplicate"]>().mockResolvedValue(true),
      markProcessed: jest.fn<EventDeduplicator["markProcessed"]>()
    };

    const events = [{ id: "e1", type: "user.created", payload: {} }];

    const result = await processEvents(events, store, deduplicator);

    expect(result).toEqual({ processed: 0, skipped: 1 });
    expect(store.append).not.toHaveBeenCalled();
    expect(deduplicator.markProcessed).not.toHaveBeenCalled();
  });

  it("重複と非重複が混在する場合にそれぞれ正しくカウントされる", async () => {
    const store: EventStore = {
      append: jest.fn<EventStore["append"]>().mockResolvedValue(undefined)
    };
    const deduplicator: EventDeduplicator = {
      isDuplicate: jest.fn<EventDeduplicator["isDuplicate"]>()
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false),
      markProcessed: jest.fn<EventDeduplicator["markProcessed"]>().mockResolvedValue(undefined)
    };

    const events = [
      { id: "e1", type: "a", payload: {} },
      { id: "e2", type: "b", payload: {} },
      { id: "e3", type: "c", payload: {} }
    ];

    const result = await processEvents(events, store, deduplicator);

    expect(result).toEqual({ processed: 2, skipped: 1 });
    expect(store.append).toHaveBeenCalledTimes(2);
  });
});
