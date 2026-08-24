import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type {
  ActivityOption,
  DateRange,
  InvitationDraft,
  Photo,
  Stage,
} from '@/types/invitation'
import { catalogIndex } from '@/data/activities'
import { shortId } from '@/lib/id'
import { saveInvitation } from '@/lib/storage'

const DRAFT_KEY = 'date-invite:draft'
export const TOTAL_STEPS = 4
export const MIN_OPTIONS = 3
export const MAX_OPTIONS = 6
export const MAX_PHOTOS = 4

export function createDefaultDraft(): InvitationDraft {
  return {
    tone: 'her',
    photos: [],
    invite: {
      art: 'bloom',
      photo: null,
      title: 'Есть идея на вечер. Пойдёшь со мной на свидание?',
      yesLabel: 'Да',
      noLabel: 'Нет',
    },
    confirm: {
      art: 'spark',
      photo: null,
      title: 'Так это «да»?',
      subtitle: 'Готовился к отказу, а вышло лучше',
      buttonLabel: 'Да, точно',
    },
    schedule: {
      art: 'moon',
      photo: null,
      title: 'Когда тебе удобно?',
      buttonLabel: 'Выбрать день',
      range: 'any',
    },
    activity: {
      title: 'Чем займёмся?',
      subtitle: 'Выбирай без стеснения',
      options: ['cinema', 'sushi', 'park'].map(toOption),
    },
    final: {
      title: 'Договорились',
      description: 'Будь готова к {date} в {time}. В программе — {activity}',
    },
  }
}

function toOption(id: string): ActivityOption {
  const item = catalogIndex[id]
  return { id, label: item.label, emoji: item.emoji, photo: null }
}

function readStoredDraft(): InvitationDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as InvitationDraft) : null
  } catch {
    return null
  }
}

export const useInvitationStore = defineStore('invitation', () => {
  const draft = ref<InvitationDraft>(readStoredDraft() ?? createDefaultDraft())
  const step = ref(1)
  /** Сцена, показанная в предпросмотре. Правка блока переключает её сама. */
  const previewStage = ref<Stage>('envelope')
  /** Максимально достигнутый шаг: возврат назад не роняет шкалу прогресса. */
  const reachedStep = ref(1)

  watch(step, (value) => {
    if (value > reachedStep.value) reachedStep.value = value
  })

  watch(
    draft,
    (value) => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(value))
      } catch {
        /* переполнение квоты — черновик остаётся только в памяти */
      }
    },
    { deep: true },
  )

  const optionIds = computed(() => draft.value.activity.options.map((option) => option.id))
  const canAddOption = computed(() => draft.value.activity.options.length < MAX_OPTIONS)
  const optionsValid = computed(() => draft.value.activity.options.length >= MIN_OPTIONS)

  /** Прогресс по пройденным шагам — растёт на «Далее», не падает на «Назад». */
  const completeness = computed(() =>
    Math.round((reachedStep.value / TOTAL_STEPS) * 100),
  )

  /** Обязательный минимум для публикации. */
  const requiredFilled = computed(
    () =>
      draft.value.invite.title.trim().length > 0 &&
      draft.value.confirm.title.trim().length > 0 &&
      draft.value.schedule.title.trim().length > 0 &&
      draft.value.final.title.trim().length > 0 &&
      optionsValid.value,
  )

  function toggleOption(id: string): void {
    const options = draft.value.activity.options
    const index = options.findIndex((option) => option.id === id)
    if (index >= 0) {
      options.splice(index, 1)
      return
    }
    if (!canAddOption.value) return
    options.push(toOption(id))
  }

  function removeOption(id: string): void {
    draft.value.activity.options = draft.value.activity.options.filter(
      (option) => option.id !== id,
    )
  }

  function addPhoto(src: string): void {
    if (draft.value.photos.length >= MAX_PHOTOS) return
    draft.value.photos.push({ id: shortId(6), src })
  }

  function removePhoto(id: string): void {
    draft.value.photos = draft.value.photos.filter((photo: Photo) => photo.id !== id)
  }

  function setRange(range: DateRange): void {
    draft.value.schedule.range = range
  }

  function focusStage(stage: Stage): void {
    previewStage.value = stage
  }

  function reset(): void {
    draft.value = createDefaultDraft()
    step.value = 1
    reachedStep.value = 1
    previewStage.value = 'envelope'
  }

  /** Публикует черновик: кладёт в локальное хранилище под новым идентификатором. */
  function publish(): string {
    const id = shortId()
    saveInvitation(id, JSON.parse(JSON.stringify(draft.value)) as InvitationDraft)
    return id
  }

  return {
    draft,
    step,
    previewStage,
    reachedStep,
    focusStage,
    optionIds,
    canAddOption,
    optionsValid,
    completeness,
    requiredFilled,
    toggleOption,
    removeOption,
    addPhoto,
    removePhoto,
    setRange,
    reset,
    publish,
  }
})
