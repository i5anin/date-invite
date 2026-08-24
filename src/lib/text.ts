import type { Answer } from '@/types/invitation'
import { catalogIndex } from '@/data/activities'

export interface Slots {
  date: string
  time: string
  activity: string
}

export const placeholders = ['{date}', '{time}', '{activity}'] as const

export const previewSlots: Slots = {
  date: 'её дата',
  time: 'её время',
  activity: 'её выбор',
}

export function slotsFromAnswer(answer: Answer, customLabels: Record<string, string>): Slots {
  return {
    date: formatDate(answer.date),
    time: answer.time || '—',
    activity: customLabels[answer.activityId] ?? catalogIndex[answer.activityId]?.label ?? '—',
  }
}

export function fillSlots(template: string, slots: Slots): string {
  return template
    .replaceAll('{date}', slots.date)
    .replaceAll('{time}', slots.time)
    .replaceAll('{activity}', slots.activity)
}

export function formatDate(value: string): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return value
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}
