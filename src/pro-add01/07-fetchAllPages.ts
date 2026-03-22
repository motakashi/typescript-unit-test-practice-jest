export type Page<T> = {
  items: T[];
  nextCursor: string | null;
};

export type PaginatedSource<T> = {
  fetch(cursor: string | null, limit: number): Promise<Page<T>>;
};

/**
 * カーソルベースのページネーションを持つデータソースから全件取得する。
 * nextCursorがnullになるまで繰り返しfetchを呼び出す。
 */
export async function fetchAllPages<T>(
  source: PaginatedSource<T>,
  limit: number
): Promise<T[]> {
  const allItems: T[] = [];
  let cursor: string | null = null;

  do {
    const page = await source.fetch(cursor, limit);
    allItems.push(...page.items);
    cursor = page.nextCursor;
  } while (cursor !== null);

  return allItems;
}
