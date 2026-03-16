export type User = { id: number; name: string };

export function findUserById(users: User[], id: number): User | undefined {
  return users.find((user) => user.id === id);
}
