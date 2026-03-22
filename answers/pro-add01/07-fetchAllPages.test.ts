import { describe, expect, it, jest } from "@jest/globals";
import { fetchAllPages } from "../../src/pro-add01/07-fetchAllPages";
import type { PaginatedSource } from "../../src/pro-add01/07-fetchAllPages";

describe("fetchAllPages", () => {
  it("複数ページのデータを全件取得して結合する", async () => {
    const source: PaginatedSource<string> = {
      fetch: jest.fn<PaginatedSource<string>["fetch"]>()
        .mockResolvedValueOnce({ items: ["a", "b"], nextCursor: "cursor1" })
        .mockResolvedValueOnce({ items: ["c", "d"], nextCursor: "cursor2" })
        .mockResolvedValueOnce({ items: ["e"], nextCursor: null })
    };

    const result = await fetchAllPages(source, 2);

    expect(result).toEqual(["a", "b", "c", "d", "e"]);
    expect(source.fetch).toHaveBeenCalledTimes(3);
    expect(source.fetch).toHaveBeenNthCalledWith(1, null, 2);
    expect(source.fetch).toHaveBeenNthCalledWith(2, "cursor1", 2);
    expect(source.fetch).toHaveBeenNthCalledWith(3, "cursor2", 2);
  });

  it("単一ページでnextCursorがnullならそのまま結果を返す", async () => {
    const source: PaginatedSource<string> = {
      fetch: jest.fn<PaginatedSource<string>["fetch"]>()
        .mockResolvedValue({ items: ["x", "y"], nextCursor: null })
    };

    const result = await fetchAllPages(source, 10);

    expect(result).toEqual(["x", "y"]);
    expect(source.fetch).toHaveBeenCalledTimes(1);
  });

  it("最初のページが空でも空配列を返す", async () => {
    const source: PaginatedSource<string> = {
      fetch: jest.fn<PaginatedSource<string>["fetch"]>()
        .mockResolvedValue({ items: [], nextCursor: null })
    };

    const result = await fetchAllPages(source, 10);

    expect(result).toEqual([]);
  });
});
