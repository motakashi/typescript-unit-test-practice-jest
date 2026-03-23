export type NotificationChannel = "email" | "sms" | "push";

export type NotificationService = {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendSms(to: string, message: string): Promise<void>;
  sendPush(userId: string, message: string): Promise<void>;
};

export type NotificationRequest = {
  userId: string;
  email: string;
  phone?: string;
  preferredChannel: NotificationChannel;
  subject: string;
  message: string;
};

/**
 * 指定されたチャンネルで通知を送信する。
 * SMS/Pushが失敗した場合はemailにフォールバックする。
 * @returns 実際に使ったチャンネル
 */
export async function sendNotification(
  service: NotificationService,
  request: NotificationRequest
): Promise<NotificationChannel> {
  if (request.preferredChannel === "sms") {
    if (!request.phone) {
      throw new Error("phone number is required for SMS");
    }
    try {
      await service.sendSms(request.phone, request.message);
      return "sms";
    } catch {
      // fall back to email
    }
  }

  if (request.preferredChannel === "push") {
    try {
      await service.sendPush(request.userId, request.message);
      return "push";
    } catch {
      // fall back to email
    }
  }

  await service.sendEmail(request.email, request.subject, request.message);
  return "email";
}
