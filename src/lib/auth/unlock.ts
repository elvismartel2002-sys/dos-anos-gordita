export function validateUnlockSecret(input: string, secret: string): boolean {
  const normalized = input.trim();
  return normalized.length > 0 && normalized === secret;
}
