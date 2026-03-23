import { describe, expect, it, jest } from "@jest/globals";
import { withTransaction } from "../../src/pro-add01/03-withTransaction";
import type { Transaction, TransactionManager } from "../../src/pro-add01/03-withTransaction";

describe("withTransaction", () => {
  it("アクションが成功した場合はコミットして結果を返す", async () => {
    const tx: Transaction = {
      commit: jest.fn<Transaction["commit"]>().mockResolvedValue(undefined),
      rollback: jest.fn<Transaction["rollback"]>()
    };
    const manager: TransactionManager = {
      begin: jest.fn<TransactionManager["begin"]>().mockResolvedValue(tx)
    };

    const result = await withTransaction(manager, async () => "success");

    expect(result).toBe("success");
    expect(tx.commit).toHaveBeenCalled();
    expect(tx.rollback).not.toHaveBeenCalled();
  });

  it("アクションが失敗した場合はロールバックして例外を再スローする", async () => {
    const tx: Transaction = {
      commit: jest.fn<Transaction["commit"]>(),
      rollback: jest.fn<Transaction["rollback"]>().mockResolvedValue(undefined)
    };
    const manager: TransactionManager = {
      begin: jest.fn<TransactionManager["begin"]>().mockResolvedValue(tx)
    };

    await expect(
      withTransaction(manager, async () => {
        throw new Error("action failed");
      })
    ).rejects.toThrow("action failed");

    expect(tx.rollback).toHaveBeenCalled();
    expect(tx.commit).not.toHaveBeenCalled();
  });

  it("actionにはトランザクションオブジェクトが渡される", async () => {
    const tx: Transaction = {
      commit: jest.fn<Transaction["commit"]>().mockResolvedValue(undefined),
      rollback: jest.fn<Transaction["rollback"]>()
    };
    const manager: TransactionManager = {
      begin: jest.fn<TransactionManager["begin"]>().mockResolvedValue(tx)
    };

    const received: unknown[] = [];
    await withTransaction(manager, async (t) => {
      received.push(t);
    });

    expect(received[0]).toBe(tx);
  });
});
