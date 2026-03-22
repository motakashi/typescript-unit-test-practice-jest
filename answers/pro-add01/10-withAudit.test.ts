import { describe, expect, it, jest } from "@jest/globals";
import { withAudit } from "../../src/pro-add01/10-withAudit";
import type { AuditRepository, Clock } from "../../src/pro-add01/10-withAudit";

describe("withAudit", () => {
  it("操作が成功した場合はsuccess:trueで監査ログを保存して結果を返す", async () => {
    const now = new Date("2026-01-01T10:00:00Z");
    const repository: AuditRepository = {
      save: jest.fn<AuditRepository["save"]>().mockResolvedValue(undefined)
    };
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(now) };

    const result = await withAudit(
      repository,
      clock,
      { userId: "u1", action: "delete", resourceType: "post", resourceId: "p1" },
      async () => "deleted"
    );

    expect(result).toBe("deleted");
    expect(repository.save).toHaveBeenCalledWith({
      userId: "u1",
      action: "delete",
      resourceType: "post",
      resourceId: "p1",
      timestamp: now,
      success: true
    });
  });

  it("操作が失敗した場合はsuccess:falseとerrorMessageで監査ログを保存して例外を再スローする", async () => {
    const now = new Date("2026-01-01T10:00:00Z");
    const repository: AuditRepository = {
      save: jest.fn<AuditRepository["save"]>().mockResolvedValue(undefined)
    };
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(now) };

    await expect(
      withAudit(
        repository,
        clock,
        { userId: "u1", action: "delete", resourceType: "post", resourceId: "p1" },
        async () => {
          throw new Error("operation failed");
        }
      )
    ).rejects.toThrow("operation failed");

    expect(repository.save).toHaveBeenCalledWith({
      userId: "u1",
      action: "delete",
      resourceType: "post",
      resourceId: "p1",
      timestamp: now,
      success: false,
      errorMessage: "operation failed"
    });
  });

  it("成功・失敗どちらの場合も監査ログが保存される", async () => {
    const repository: AuditRepository = {
      save: jest.fn<AuditRepository["save"]>().mockResolvedValue(undefined)
    };
    const clock = { now: jest.fn<Clock["now"]>().mockReturnValue(new Date()) };
    const context = { userId: "u1", action: "read", resourceType: "post", resourceId: "p1" };

    // 成功ケース
    await withAudit(repository, clock, context, async () => "ok");

    // 失敗ケース
    await expect(
      withAudit(repository, clock, context, async () => {
        throw new Error("fail");
      })
    ).rejects.toThrow();

    expect(repository.save).toHaveBeenCalledTimes(2);
  });
});
