export type Clock = {
  now(): number; // ミリ秒
};

/**
 * 指定した時間ウィンドウ内のリクエスト数を制限するレートリミッターを生成する。
 * @param maxRequests ウィンドウ内の最大リクエスト数
 * @param windowMs   時間ウィンドウ（ミリ秒）
 * @param clock      時刻を提供するオブジェクト（テスト時に差し替え可能）
 */
export function createRateLimiter(maxRequests: number, windowMs: number, clock: Clock) {
  const timestamps: number[] = [];

  return {
    isAllowed(): boolean {
      const now = clock.now();
      const windowStart = now - windowMs;

      // ウィンドウ外のタイムスタンプを除去
      while (timestamps.length > 0 && timestamps[0] < windowStart) {
        timestamps.shift();
      }

      if (timestamps.length >= maxRequests) {
        return false;
      }

      timestamps.push(now);
      return true;
    }
  };
}
