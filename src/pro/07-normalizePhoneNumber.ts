export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10 || digits.length === 11) {
    return digits;
  }

  throw new Error("phone number is invalid");
}
