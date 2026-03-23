export type Cache<T> = {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttlSeconds: number): Promise<void>;
};

export type DataSource<T> = {
  fetch(key: string): Promise<T>;
};

/**
 * キャッシュを確認し、ヒットすればそのまま返す。
 * ミスの場合はデータソースからフェッチしてキャッシュに保存してから返す（Cache-Asideパターン）。
 */
export async function cacheAside<T>(
  cache: Cache<T>,
  source: DataSource<T>,
  key: string,
  ttlSeconds: number
): Promise<T> {
  const cached = await cache.get(key);
  if (cached !== null) {
    return cached;
  }

  const value = await source.fetch(key);
  await cache.set(key, value, ttlSeconds);
  return value;
}
