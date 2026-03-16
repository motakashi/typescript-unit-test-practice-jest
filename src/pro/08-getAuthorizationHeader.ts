export type TokenProvider = {
  getToken(): string | null;
};

export function getAuthorizationHeader(tokenProvider: TokenProvider): Record<string, string> {
  const token = tokenProvider.getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`
  };
}
