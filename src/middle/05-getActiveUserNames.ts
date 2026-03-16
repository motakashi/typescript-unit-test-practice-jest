export type User = {
  id: number;
  name: string;
  isActive: boolean;
};

export function getActiveUserNames(users: User[]): string[] {
  return users.filter((user) => user.isActive).map((user) => user.name);
}
