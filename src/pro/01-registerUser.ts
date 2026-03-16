export type UserRepository = {
  existsByEmail(email: string): Promise<boolean>;
  save(user: { name: string; email: string }): Promise<{ id: number; name: string; email: string }>;
};

export async function registerUser(
  repo: UserRepository,
  input: { name: string; email: string }
) {
  if (!input.name.trim()) {
    throw new Error("name is required");
  }

  if (!input.email.includes("@")) {
    throw new Error("email is invalid");
  }

  const exists = await repo.existsByEmail(input.email);
  if (exists) {
    throw new Error("email already exists");
  }

  return repo.save({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase()
  });
}
