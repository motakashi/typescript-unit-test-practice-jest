export type SearchInput = {
  keyword?: string;
  page?: number;
  tags?: string[];
};

export function buildSearchParams(input: SearchInput): string {
  const params = new URLSearchParams();

  if (input.keyword && input.keyword.trim()) {
    params.set("keyword", input.keyword.trim());
  }

  if (input.page && input.page > 0) {
    params.set("page", String(input.page));
  }

  if (input.tags && input.tags.length > 0) {
    params.set("tags", input.tags.join(","));
  }

  return params.toString();
}
