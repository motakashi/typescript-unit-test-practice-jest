export type Delayer = {
  wait(ms: number): Promise<void>;
};

export type BackoffOptions = {
  maxRetries: number;     // リトライの最大回数（初回試行は含まない）
  initialDelayMs: number; // 最初の待機時間（ミリ秒）
  multiplier: number;     // 待機時間の倍率
};

/**
 * 指数バックオフつきリトライを行う。
 * Delayerを注入することで、テスト時に実際の待機を発生させずに検証できる。
 */
export async function retryWithBackoff<T>(
  task: () => Promise<T>,
  options: BackoffOptions,
  delayer: Delayer
): Promise<T> {
  let delayMs = options.initialDelayMs;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await task();
    } catch (error) {
      if (attempt === options.maxRetries) {
        throw error;
      }
      await delayer.wait(delayMs);
      delayMs *= options.multiplier;
    }
  }

  // ここには到達しないが、TypeScriptの型検査のために必要
  throw new Error("unreachable");
}
