import { describe, it, expect, jest } from "@jest/globals";
import { sendNotification } from "../../src/pro-add01/01-sendNotification";
import type { NotificationChannel, NotificationService } from "../../src/pro-add01/01-sendNotification";

describe("sendNotification", () => {
  it("SMS配信時電話番号がない場合エラーを投げる", () => {
    const testNotificationService = {
      sendEmail: jest.fn<NotificationService["sendEmail"]>().mockResolvedValue(undefined),
      sendSms: jest.fn<NotificationService["sendSms"]>(),
      sendPush: jest.fn<NotificationService["sendPush"]>()
    };    

    const testNotificationRequest = {
      userId: "123",
      email: "test@test.com",
      preferredChannel: "sms" as NotificationChannel,
      subject: "件名",
      message: "本文メッセージ"
    };

    expect(sendNotification(testNotificationService, testNotificationRequest)).rejects.toThrow("phone number is required for SMS");
  });

  it("SMS配信時電話番号がない場合エラーを投げる", async() => {
    const testNotificationService = {
      sendEmail: jest.fn<NotificationService["sendEmail"]>(),
      sendSms: jest.fn<NotificationService["sendSms"]>().mockResolvedValue(undefined),
      sendPush: jest.fn<NotificationService["sendPush"]>()
    };    

    const testNotificationRequest = {
      userId: "123",
      email: "test@test.com",
      phone: "08012345678",
      preferredChannel: "sms" as NotificationChannel,
      subject: "件名",
      message: "本文メッセージ"
    };

    expect(await sendNotification(testNotificationService, testNotificationRequest)).toBe("sms");
    expect(testNotificationService.sendSms).toHaveBeenCalledTimes(1);
    expect(testNotificationService.sendSms).toHaveBeenCalledWith(testNotificationRequest.phone, testNotificationRequest.message);
    expect(testNotificationService.sendEmail).not.toHaveBeenCalled();
    expect(testNotificationService.sendPush).not.toHaveBeenCalled();
  });
});

// ヒント:
// 優先チャンネル成功、SMS/Pushのフォールバック、phoneなしでSMS指定の例外
