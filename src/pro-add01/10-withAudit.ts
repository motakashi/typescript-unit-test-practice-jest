export type AuditContext = {
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
};

export type AuditEntry = AuditContext & {
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
};

export type AuditRepository = {
  save(entry: AuditEntry): Promise<void>;
};

export type Clock = {
  now(): Date;
};

/**
 * 操作に監査ログを付与するラッパー。
 * 成功・失敗どちらの場合も操作の結果をAuditRepositoryに記録する。
 * 失敗時はエラーを記録した上で例外を再スローする。
 */
export async function withAudit<T>(
  repository: AuditRepository,
  clock: Clock,
  context: AuditContext,
  operation: () => Promise<T>
): Promise<T> {
  try {
    const result = await operation();
    await repository.save({
      ...context,
      timestamp: clock.now(),
      success: true
    });
    return result;
  } catch (error) {
    await repository.save({
      ...context,
      timestamp: clock.now(),
      success: false,
      errorMessage: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}
