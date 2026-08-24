import type { InvitationDraft } from '@/types/invitation'

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

/** Упаковка черновика в строку для ссылки «с данными внутри». */
export function encodeDraft(draft: InvitationDraft): string {
  const json = JSON.stringify(draft)
  return toBase64Url(new TextEncoder().encode(json))
}

export function decodeDraft(payload: string): InvitationDraft | null {
  try {
    const json = new TextDecoder().decode(fromBase64Url(payload))
    return JSON.parse(json) as InvitationDraft
  } catch {
    return null
  }
}
