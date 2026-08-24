import { arts } from '@/data/arts'
import { catalog } from '@/data/activities'
import {
  activitySubtitlePresets,
  activityTitlePresets,
  confirmButtonPresets,
  confirmSubtitlePresets,
  confirmTitlePresets,
  finalDescriptionPresets,
  finalTitlePresets,
  noPresets,
  schedulePresets,
  scheduleButtonPresets,
  titlePresets,
  yesPresets,
} from '@/data/presets'
import type { DateRange, InvitationDraft } from '@/types/invitation'

/** Случайный элемент, по возможности отличный от текущего. */
export function pickOther<T>(list: T[], current?: T): T {
  const pool = list.filter((item) => item !== current)
  const source = pool.length ? pool : list
  return source[Math.floor(Math.random() * source.length)]
}

export function randomArt(current?: string): string {
  return pickOther(
    arts.map((art) => art.id),
    current,
  )
}

export function randomizeInvite(draft: InvitationDraft): void {
  draft.invite.art = randomArt(draft.invite.art)
  draft.invite.title = pickOther(titlePresets, draft.invite.title)
  draft.invite.yesLabel = pickOther(yesPresets, draft.invite.yesLabel)
  draft.invite.noLabel = pickOther(noPresets, draft.invite.noLabel)
}

export function randomizeConfirm(draft: InvitationDraft): void {
  draft.confirm.art = randomArt(draft.confirm.art)
  draft.confirm.title = pickOther(confirmTitlePresets, draft.confirm.title)
  draft.confirm.subtitle = pickOther(confirmSubtitlePresets, draft.confirm.subtitle)
  draft.confirm.buttonLabel = pickOther(confirmButtonPresets, draft.confirm.buttonLabel)
}

export function randomizeSchedule(draft: InvitationDraft): void {
  const ranges: DateRange[] = ['any', 'weekend', 'twoWeeks', 'month']
  draft.schedule.art = randomArt(draft.schedule.art)
  draft.schedule.title = pickOther(schedulePresets, draft.schedule.title)
  draft.schedule.buttonLabel = pickOther(scheduleButtonPresets, draft.schedule.buttonLabel)
  draft.schedule.range = pickOther(ranges, draft.schedule.range)
}

export function randomizeFinal(draft: InvitationDraft): void {
  draft.final.title = pickOther(finalTitlePresets, draft.final.title)
  draft.final.description = pickOther(finalDescriptionPresets, draft.final.description)
}

/** Случайный набор активностей: 4–6 позиций из разных групп каталога. */
export function randomizeActivity(draft: InvitationDraft): void {
  draft.activity.title = pickOther(activityTitlePresets, draft.activity.title)
  draft.activity.subtitle = pickOther(activitySubtitlePresets, draft.activity.subtitle)

  const flat = catalog.flatMap((group) => group.items)
  const target = 4 + Math.floor(Math.random() * 3)
  const chosen = new Map<string, (typeof flat)[number]>()

  while (chosen.size < target) {
    const item = flat[Math.floor(Math.random() * flat.length)]
    chosen.set(item.id, item)
  }

  draft.activity.options = Array.from(chosen.values()).map((item) => ({
    id: item.id,
    label: item.label,
    emoji: item.emoji,
    photo: null,
  }))
}

export function randomizeAll(draft: InvitationDraft): void {
  randomizeInvite(draft)
  randomizeConfirm(draft)
  randomizeSchedule(draft)
  randomizeActivity(draft)
  randomizeFinal(draft)
}
