<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import StepActivity from '@/components/builder/StepActivity.vue'
import StepFinal from '@/components/builder/StepFinal.vue'
import StepInvite from '@/components/builder/StepInvite.vue'
import StepNav from '@/components/builder/StepNav.vue'
import StepSchedule from '@/components/builder/StepSchedule.vue'
import InvitationFlow from '@/components/preview/InvitationFlow.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import PhoneFrame from '@/components/ui/PhoneFrame.vue'
import { randomizeAll } from '@/lib/magic'
import { useInvitationStore } from '@/stores/invitation'
import type { Stage } from '@/types/invitation'

const store = useInvitationStore()
const router = useRouter()

const steps = ['Приглашение', 'Дата и время', 'Активность', 'Финал']

const stagesByStep: Record<number, { id: Stage; label: string }[]> = {
  1: [
    { id: 'envelope', label: 'Конверт' },
    { id: 'invite', label: 'Экран 1' },
    { id: 'confirm', label: 'Экран 2' },
  ],
  2: [{ id: 'schedule', label: 'Дата и время' }],
  3: [{ id: 'activity', label: 'Активность' }],
  4: [{ id: 'final', label: 'Финал' }],
}

const stages = computed(() => stagesByStep[store.step])

const stage = computed<Stage>({
  get: () => (stages.value.some((item) => item.id === store.previewStage)
    ? store.previewStage
    : stages.value[0].id),
  set: (value) => store.focusStage(value),
})

watch(
  () => store.step,
  () => store.focusStage(stages.value[0].id),
)

const canPublish = computed(() => store.requiredFilled)

function next(): void {
  if (store.step < steps.length) store.step += 1
}

function back(): void {
  if (store.step > 1) store.step -= 1
}

function publish(): void {
  const id = store.publish()
  router.push({ name: 'link', params: { id } })
}
</script>

<template>
  <div class="page">
    <header class="page__head">
      <div>
        <p class="eyebrow">Приглашение на свидание</p>
        <h1 class="page__title">Собери приглашение и отправь одной ссылкой</h1>
        <p class="muted">
          Получатель откроет её в браузере: вскроет конверт, ответит, выберет день и программу.
        </p>
      </div>
      <div class="page__tools">
        <MagicButton
          label="Собрать случайно"
          title="Случайные тексты, картинки и активности во всех экранах"
          @click="randomizeAll(store.draft)"
        />
        <button class="btn btn--ghost" type="button" @click="store.reset()">Сбросить</button>
      </div>
    </header>

    <StepNav
      :current="store.step"
      :progress="store.completeness"
      :steps="steps"
      @go="(value) => (store.step = value)"
    />

    <div class="layout">
      <section class="layout__form">
        <StepInvite v-if="store.step === 1" />
        <StepSchedule v-else-if="store.step === 2" />
        <StepActivity v-else-if="store.step === 3" />
        <StepFinal v-else />
      </section>

      <aside class="layout__preview">
        <div class="preview">
          <div class="preview__tabs">
            <button
              v-for="item in stages"
              :key="item.id"
              class="preview__tab"
              :class="{ 'preview__tab--on': stage === item.id }"
              type="button"
              @click="stage = item.id"
            >
              {{ item.label }}
            </button>
          </div>
          <PhoneFrame>
            <InvitationFlow
              :key="stage"
              :draft="store.draft"
              :stage="stage"
              ticket-number="0000"
            />
          </PhoneFrame>
          <p class="muted preview__note">
            Предпросмотр переключается на тот экран, который правите. Кнопки неактивны,
            подстановки показаны словами.
          </p>
        </div>
      </aside>
    </div>

    <footer class="page__foot">
      <button class="btn btn--ghost" type="button" :disabled="store.step === 1" @click="back">
        Назад
      </button>
      <button v-if="store.step < steps.length" class="btn" type="button" @click="next">
        Далее
      </button>
      <button v-else class="btn" type="button" :disabled="!canPublish" @click="publish">
        Создать приглашение
      </button>
    </footer>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
  max-width: 1080px;
  padding: 28px 18px 96px;
}

.page__head {
  align-items: flex-start;
  display: flex;
  gap: 18px;
  justify-content: space-between;
}

.page__tools {
  align-items: center;
  display: flex;
  gap: 10px;
}

.page__title {
  font-size: 28px;
  margin: 6px 0 8px;
}

.layout {
  align-items: start;
  display: grid;
  gap: 22px;
  grid-template-columns: minmax(0, 1fr) 340px;
}

.layout__preview {
  position: sticky;
  top: 18px;
}

.preview {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview__tabs {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.preview__tab {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 12px;
  padding: 6px 12px;
}

.preview__tab--on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.preview__note {
  text-align: center;
}

.page__foot {
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(6px);
  border-top: 1px solid var(--line);
  bottom: 0;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  left: 0;
  padding: 12px 18px;
  position: fixed;
  right: 0;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .layout__preview {
    order: -1;
    position: static;
  }
}
</style>
