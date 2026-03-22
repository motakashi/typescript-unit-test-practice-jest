import { describe, expect, it, jest } from "@jest/globals";
import { sendNotification } from "../../src/pro-add01/01-sendNotification";
import type { NotificationService } from "../../src/pro-add01/01-sendNotification";

describe("sendNotification", () => {
  it("emailチャンネルではemailで送信してemailを返す", async () => {
    const service = {
      sendEmail: jest.fn<NotificationService["sendEmail"]>().mockResolvedValue(undefined),
      sendSms: jest.fn<NotificationService["sendSms"]>(),
      sendPush: jest.fn<NotificationService["sendPush"]>()
    };

    const result = await sendNotification(service, {
      userId: "u1",
      email: "user@example.com",
      preferredChannel: "email",
      subject: "件名",
      message: "本文"
    });

    expect(result).toBe("email");
    expect(service.sendEmail).toHaveBeenCalledWith("user@example.com", "件名", "本文");
    expect(service.sendSms).not.toHaveBeenCalled();
  });

  it("smsチャンネルでphoneがあればSMSで送信してsmsを返す", async () => {
    const service = {
      sendEmail: jest.fn<NotificationService["sendEmail"]>(),
      sendSms: jest.fn<NotificationService["sendSms"]>().mockResolvedValue(undefined),
      sendPush: jest.fn<NotificationService["sendPush"]>()
    };

    const result = await sendNotification(service, {
      userId: "u1",
      email: "user@example.com",
      phone: "09012345678",
      preferredChannel: "sms",
      subject: "件名",
      message: "本文"
    });

    expect(result).toBe("sms");
    expect(service.sendSms).toHaveBeenCalledWith("09012345678", "本文");
    expect(service.sendEmail).not.toHaveBeenCalled();
  });

  it("SMS送信が失敗した場合はemailにフォールバックしてemailを返す", async () => {
    const service = {
      sendEmail: jest.fn<NotificationService["sendEmail"]>().mockResolvedValue(undefined),
      sendSms: jest.fn<NotificationService["sendSms"]>().mockRejectedValue(new Error("SMS failure")),
      sendPush: jest.fn<NotificationService["sendPush"]>()
    };

    const result = await sendNotification(service, {
      userId: "u1",
      email: "user@example.com",
      phone: "09012345678",
      preferredChannel: "sms",
      subject: "件名",
      message: "本文"
    });

    expect(result).toBe("email");
    expect(service.sendEmail).toHaveBeenCalled();
  });

  it("smsチャンネルでphoneがない場合は例外をスローする", async () => {
    const service = {
      sendEmail: jest.fn<NotificationService["sendEmail"]>(),
      sendSms: jest.fn<NotificationService["sendSms"]>(),
      sendPush: jest.fn<NotificationService["sendPush"]>()
    };

    await expect(
      sendNotification(service, {
        userId: "u1",
        email: "user@example.com",
        preferredChannel: "sms",
        subject: "件名",
        message: "本文"
      })
    ).rejects.toThrow("phone number is required for SMS");
  });
});

