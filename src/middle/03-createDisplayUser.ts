export type RawUser = {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
};

export type DisplayUser = {
  id: number;
  fullName: string;
  status: "active" | "inactive";
};

export function createDisplayUser(user: RawUser): DisplayUser {
  return {
    id: user.id,
    fullName: `${user.lastName} ${user.firstName}`,
    status: user.isActive ? "active" : "inactive"
  };
}
