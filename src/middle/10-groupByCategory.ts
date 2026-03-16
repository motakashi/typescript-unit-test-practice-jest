export type Item = {
  name: string;
  category: string;
};

export function groupByCategory(items: Item[]): Record<string, string[]> {
  return items.reduce<Record<string, string[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item.name);
    return acc;
  }, {});
}
