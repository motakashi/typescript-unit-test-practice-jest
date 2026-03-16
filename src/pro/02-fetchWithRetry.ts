export type AsyncTask<T> = () => Promise<T>;

export async function fetchWithRetry<T>(task: AsyncTask<T>, maxRetries: number): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
