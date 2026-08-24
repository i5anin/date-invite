const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789'

export function shortId(length = 8): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')
}
