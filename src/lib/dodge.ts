/** Тактики уклонения кнопки «Нет»: каждая — своя геометрия и своя анимация. */
export type Tactic =
  | 'hop'
  | 'slide'
  | 'squish'
  | 'whirl'
  | 'blink'
  | 'teleport'
  | 'shiver'
  | 'duck'
  | 'corner'

export interface Dodge {
  tactic: Tactic
  x: number
  y: number
  rotate: number
  scale: number
  opacity: number
  behind: boolean
  instant: boolean
}

const tactics: Tactic[] = [
  'hop',
  'slide',
  'squish',
  'whirl',
  'blink',
  'teleport',
  'shiver',
  'duck',
  'corner',
]

const X_LIMIT = 108
const Y_LIMIT = 50

function spread(limit: number): number {
  return Math.round((Math.random() * 2 - 1) * limit)
}

function sign(): number {
  return Math.random() < 0.5 ? -1 : 1
}

/** Общее сжатие: чем больше попыток, тем мельче кнопка. */
function fatigue(count: number): number {
  return Math.max(0.42, 1 - count * 0.07)
}

function geometry(tactic: Tactic, count: number): Omit<Dodge, 'tactic'> {
  const scale = fatigue(count)
  const base = {
    x: spread(X_LIMIT),
    y: spread(Y_LIMIT),
    rotate: 0,
    scale,
    opacity: 1,
    behind: false,
    instant: false,
  }

  switch (tactic) {
    case 'hop':
      return { ...base, y: -Math.round(20 + Math.random() * 26), rotate: spread(8) }
    case 'slide':
      return { ...base, x: sign() * Math.round(70 + Math.random() * 38), y: spread(18) }
    case 'squish':
      return { ...base, scale: scale * 0.78, rotate: spread(5) }
    case 'whirl':
      return { ...base, rotate: sign() * Math.round(18 + Math.random() * 22) }
    case 'blink':
      return { ...base, opacity: 0.3 }
    case 'teleport':
      return { ...base, instant: true }
    case 'shiver':
      return { ...base, x: spread(34), y: spread(20) }
    case 'duck':
      return { ...base, x: -Math.round(58 + Math.random() * 22), y: 12, scale: scale * 0.8, behind: true }
    case 'corner':
      return {
        ...base,
        x: sign() * X_LIMIT,
        y: sign() * Y_LIMIT,
        rotate: spread(14),
        scale: scale * 0.72,
      }
  }
}

/** Следующая тактика — случайная, но не та же, что была. */
export function nextTactic(previous: Tactic | null, count: number): Dodge {
  const pool = previous ? tactics.filter((item) => item !== previous) : tactics
  const tactic = pool[Math.floor(Math.random() * pool.length)]
  return { tactic, ...geometry(tactic, count) }
}
