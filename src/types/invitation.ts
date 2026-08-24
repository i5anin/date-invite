export type Tone = 'her' | 'him'

export type DateRange = 'any' | 'weekend' | 'twoWeeks' | 'month'

export interface Photo {
  id: string
  src: string
}

export interface ActivityOption {
  id: string
  label: string
  emoji: string
  photo: string | null
}

export interface ScreenInvite {
  art: string
  photo: string | null
  title: string
  yesLabel: string
  noLabel: string
}

export interface ScreenConfirm {
  art: string
  photo: string | null
  title: string
  subtitle: string
  buttonLabel: string
}

export interface ScreenSchedule {
  art: string
  photo: string | null
  title: string
  buttonLabel: string
  range: DateRange
}

export interface ScreenActivity {
  title: string
  subtitle: string
  options: ActivityOption[]
}

export interface ScreenFinal {
  title: string
  description: string
}

export interface InvitationDraft {
  tone: Tone
  photos: Photo[]
  invite: ScreenInvite
  confirm: ScreenConfirm
  schedule: ScreenSchedule
  activity: ScreenActivity
  final: ScreenFinal
}

export interface Answer {
  date: string
  time: string
  activityId: string
  answeredAt: string
}

export interface StoredInvitation {
  id: string
  createdAt: string
  draft: InvitationDraft
  answer: Answer | null
}

export type Stage = 'envelope' | 'invite' | 'confirm' | 'schedule' | 'activity' | 'final'
