import type { DateRange } from '@/types/invitation'

export interface RangeBounds {
  min: string
  max: string | null
  hint: string
}

function toInputValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

function shift(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

/** Границы календаря получателя по выбранному автором периоду. */
export function rangeBounds(range: DateRange): RangeBounds {
  const today = new Date()
  const min = toInputValue(today)

  if (range === 'weekend') {
    const toSaturday = (6 - today.getDay() + 7) % 7
    const saturday = shift(toSaturday)
    return {
      min: toInputValue(saturday),
      max: toInputValue(shift(toSaturday + 1)),
      hint: 'Ближайшие выходные',
    }
  }
  if (range === 'twoWeeks') {
    return { min, max: toInputValue(shift(14)), hint: 'Следующие две недели' }
  }
  if (range === 'month') {
    return { min, max: toInputValue(shift(30)), hint: 'В течение месяца' }
  }
  return { min, max: null, hint: 'Любая дата от сегодня' }
}

export const rangeLabels: Record<DateRange, string> = {
  any: 'Любая дата',
  weekend: 'Ближайшие выходные',
  twoWeeks: 'Две недели',
  month: 'Месяц',
}
