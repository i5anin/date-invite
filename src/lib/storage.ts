import type { Answer, InvitationDraft, StoredInvitation } from '@/types/invitation'

const KEY = 'date-invite:invitations'

type Table = Record<string, StoredInvitation>

function readTable(): Table {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}') as Table
  } catch {
    return {}
  }
}

function writeTable(table: Table): void {
  localStorage.setItem(KEY, JSON.stringify(table))
}

export function saveInvitation(id: string, draft: InvitationDraft): StoredInvitation {
  const table = readTable()
  const record: StoredInvitation = {
    id,
    createdAt: table[id]?.createdAt ?? new Date().toISOString(),
    draft,
    answer: table[id]?.answer ?? null,
  }
  table[id] = record
  writeTable(table)
  return record
}

export function loadInvitation(id: string): StoredInvitation | null {
  return readTable()[id] ?? null
}

export function saveAnswer(id: string, answer: Answer): void {
  const table = readTable()
  const record = table[id]
  if (!record) return
  record.answer = answer
  writeTable(table)
}

export function listInvitations(): StoredInvitation[] {
  return Object.values(readTable()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
