import { describe, expect, it, jest } from "@jest/globals";
import { cacheAside } from "../../src/pro-add01/02-cacheAside";
import type { Cache, DataSource } from "../../src/pro-add01/02-cacheAside";

type User = { id: number; name: string };

describe("cacheAside", () => {
  it("キャッシュがヒットした場合はdataSourceを呼ばずにキャッシュ値を返す", async () => {
    const cache: Cache<User> = {
      get: jest.fn<Cache<User>["get"]>().mockResolvedValue({ id: 1, name: "cached" }),
      set: jest.fn<Cache<User>["set"]>()
    };
    const source: DataSource<User> = {
      fetch: jest.fn<DataSource<User>["fetch"]>()
    };

    const result = await cacheAside(cache, source, "user:1", 60);

    expect(result).toEqual({ id: 1, name: "cached" });
    expect(source.fetch).not.toHaveBeenCalled();
    expect(cache.set).not.toHaveBeenCalled();
  });

  it("キャッシュミスの場合はdataSourceからフェッチしてキャッシュに保存してから返す", async () => {
    const cache: Cache<User> = {
      get: jest.fn<Cache<User>["get"]>().mockResolvedValue(null),
      set: jest.fn<Cache<User>["set"]>().mockResolvedValue(undefined)
    };
    const source: DataSource<User> = {
      fetch: jest.fn<DataSource<User>["fetch"]>().mockResolvedValue({ id: 1, name: "fresh" })
    };

    const result = await cacheAside(cache, source, "user:1", 60);

    expect(result).toEqual({ id: 1, name: "fresh" });
    expect(source.fetch).toHaveBeenCalledWith("user:1");
    expect(cache.set).toHaveBeenCalledWith("user:1", { id: 1, name: "fresh" }, 60);
  });

  it("dataSourceがエラーを投げた場合はcache.setを呼ばずにエラーを伝播する", async () => {
    const cache: Cache<User> = {
      get: jest.fn<Cache<User>["get"]>().mockResolvedValue(null),
      set: jest.fn<Cache<User>["set"]>()
    };
    const source: DataSource<User> = {
      fetch: jest.fn<DataSource<User>["fetch"]>().mockRejectedValue(new Error("DB error"))
    };

    await expect(cacheAside(cache, source, "user:1", 60)).rejects.toThrow("DB error");
    expect(cache.set).not.toHaveBeenCalled();
  });
});
