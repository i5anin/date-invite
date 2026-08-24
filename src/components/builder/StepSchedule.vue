<script setup lang="ts">
import { computed } from 'vue'
import ArtPicker from '@/components/ui/ArtPicker.vue'
import FieldText from '@/components/ui/FieldText.vue'
import PhotoUploader from '@/components/ui/PhotoUploader.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import PresetRow from '@/components/ui/PresetRow.vue'
import { scheduleButtonPresets, schedulePresets } from '@/data/presets'
import { randomizeSchedule } from '@/lib/magic'
import { rangeBounds, rangeLabels } from '@/lib/range'
import { useInvitationStore } from '@/stores/invitation'
import type { DateRange } from '@/types/invitation'

const store = useInvitationStore()

const ranges = Object.keys(rangeLabels) as DateRange[]
const bounds = computed(() => rangeBounds(store.draft.schedule.range))
</script>

<template>
  <div class="stack">
    <section
      class="card stack"
      @pointerdown="store.focusStage('schedule')"
      @focusin="store.focusStage('schedule')"
    >
      <div class="head">
        <div>
          <h3>Экран выбора даты</h3>
          <p class="muted">Дату и время назначает приглашённый — вы задаёте только рамки</p>
        </div>
        <MagicButton
          label="Случайно"
          title="Случайные картинка, тексты и период"
          @click="randomizeSchedule(store.draft)"
        />
      </div>
      <ArtPicker v-model="store.draft.schedule.art" />
      <PhotoUploader
        label="Своё фото вместо картинки"
        @picked="(src) => (store.draft.schedule.photo = src)"
      />
      <button
        v-if="store.draft.schedule.photo"
        class="btn btn--ghost"
        type="button"
        @click="store.draft.schedule.photo = null"
      >
        Убрать фото
      </button>
      <FieldText
        v-model="store.draft.schedule.title"
        label="Заголовок"
        :limit="300"
        :magic="schedulePresets"
        multiline
      />
      <PresetRow
        hint="Готовые формулировки"
        :presets="schedulePresets"
        @pick="(value) => (store.draft.schedule.title = value)"
      />
      <FieldText
        v-model="store.draft.schedule.buttonLabel"
        label="Текст кнопки"
        :limit="40"
        :magic="scheduleButtonPresets"
      />
    </section>

    <div class="card stack">
      <h3>Из каких дат выбирать</h3>
      <div class="ranges">
        <button
          v-for="range in ranges"
          :key="range"
          class="ranges__item"
          :class="{ 'ranges__item--on': store.draft.schedule.range === range }"
          type="button"
          @click="store.setRange(range)"
        >
          {{ rangeLabels[range] }}
        </button>
      </div>
      <p class="muted">Доступно с {{ bounds.min }} <span v-if="bounds.max">по {{ bounds.max }}</span></p>
    </div>
  </div>
</template>

<style scoped>
.head {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.ranges {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
}

.ranges__item {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  color: var(--ink-soft);
  font-weight: 600;
  padding: 11px;
}

.ranges__item--on {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-deep);
}
</style>
