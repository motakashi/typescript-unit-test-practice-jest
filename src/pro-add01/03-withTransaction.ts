export type Transaction = {
  commit(): Promise<void>;
  rollback(): Promise<void>;
};

export type TransactionManager = {
  begin(): Promise<Transaction>;
};

/**
 * トランザクション内でactionを実行する。
 * 成功時はコミット、失敗時はロールバックして例外を再スローする。
 */
export async function withTransaction<T>(
  manager: TransactionManager,
  action: (tx: Transaction) => Promise<T>
): Promise<T> {
  const tx = await manager.begin();
  try {
    const result = await action(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  }
}
