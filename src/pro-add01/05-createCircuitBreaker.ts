export type CircuitState = "closed" | "open" | "half-open";

export type Clock = {
  now(): number; // ミリ秒
};

export type CircuitBreakerOptions = {
  failureThreshold: number; // オープンするまでの失敗回数
  recoveryTimeMs: number;   // ハーフオープンに移行するまでの待機時間
};

/**
 * サーキットブレーカーを生成する。
 * - closed: 通常稼働。失敗がthresholdに達するとopenへ。
 * - open:   即座に例外をスロー。recoveryTime経過後はhalf-openへ。
 * - half-open: タスクを1回試す。成功でclosed、失敗でopenに戻る。
 */
export function createCircuitBreaker(options: CircuitBreakerOptions, clock: Clock) {
  let state: CircuitState = "closed";
  let failureCount = 0;
  let openedAt = 0;

  return {
    get state(): CircuitState {
      return state;
    },

    async call<T>(task: () => Promise<T>): Promise<T> {
      if (state === "open") {
        if (clock.now() - openedAt >= options.recoveryTimeMs) {
          state = "half-open";
        } else {
          throw new Error("circuit is open");
        }
      }

      try {
        const result = await task();
        if (state === "half-open") {
          state = "closed";
          failureCount = 0;
        }
        return result;
      } catch (error) {
        failureCount++;
        if (state === "half-open" || failureCount >= options.failureThreshold) {
          state = "open";
          openedAt = clock.now();
          failureCount = 0;
        }
        throw error;
      }
    }
  };
}
