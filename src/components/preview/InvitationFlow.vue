<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import EnvelopeStage from './EnvelopeStage.vue'
import ScreenActivity from './ScreenActivity.vue'
import ScreenConfirm from './ScreenConfirm.vue'
import ScreenFinal from './ScreenFinal.vue'
import ScreenInvite from './ScreenInvite.vue'
import ScreenSchedule from './ScreenSchedule.vue'
import { previewSlots, slotsFromAnswer, type Slots } from '@/lib/text'
import type { Answer, InvitationDraft, Stage } from '@/types/invitation'

const props = defineProps<{
  draft: InvitationDraft
  /** Внешне заданная сцена — режим предпросмотра в конструкторе. */
  stage?: Stage
  interactive?: boolean
  ticketNumber?: string
}>()

const emit = defineEmits<{ answered: [answer: Answer] }>()

const internal = ref<Stage>('envelope')
const picked = ref({ date: '', time: '' })
const answer = ref<Answer | null>(null)

const stage = computed<Stage>(() => props.stage ?? internal.value)

watch(
  () => props.stage,
  () => {
    if (props.stage) answer.value = null
  },
)

const customLabels = computed(() =>
  Object.fromEntries(props.draft.activity.options.map((option) => [option.id, option.label])),
)

const slots = computed<Slots>(() =>
  answer.value ? slotsFromAnswer(answer.value, customLabels.value) : previewSlots,
)

function go(next: Stage): void {
  if (!props.stage) internal.value = next
}

function onSchedule(payload: { date: string; time: string }): void {
  picked.value = payload
  go('activity')
}

function onActivity(activityId: string): void {
  const value: Answer = {
    ...picked.value,
    activityId,
    answeredAt: new Date().toISOString(),
  }
  answer.value = value
  emit('answered', value)
  go('final')
}
</script>

<template>
  <div class="flow">
    <EnvelopeStage
      v-if="stage === 'envelope'"
      :photos="props.draft.photos"
      :interactive="props.interactive"
      @open="go('invite')"
    />
    <ScreenInvite
      v-else-if="stage === 'invite'"
      :screen="props.draft.invite"
      :photo="props.draft.invite.photo"
      :interactive="props.interactive"
      @yes="go('confirm')"
    />
    <ScreenConfirm
      v-else-if="stage === 'confirm'"
      :screen="props.draft.confirm"
      :photo="props.draft.confirm.photo"
      :interactive="props.interactive"
      @next="go('schedule')"
    />
    <ScreenSchedule
      v-else-if="stage === 'schedule'"
      :screen="props.draft.schedule"
      :photo="props.draft.schedule.photo"
      :interactive="props.interactive"
      @next="onSchedule"
    />
    <ScreenActivity
      v-else-if="stage === 'activity'"
      :screen="props.draft.activity"
      :interactive="props.interactive"
      @pick="onActivity"
    />
    <ScreenFinal
      v-else
      :screen="props.draft.final"
      :slots="slots"
      :ticket-number="props.ticketNumber ?? '0000'"
    />
  </div>
</template>

<style scoped>
.flow {
  height: 100%;
  width: 100%;
}
</style>
