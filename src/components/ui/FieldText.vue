<script setup lang="ts">
import MagicButton from './MagicButton.vue'
import { pickOther } from '@/lib/magic'

const model = defineModel<string>({ required: true })

const props = defineProps<{
  label: string
  limit?: number
  multiline?: boolean
  placeholder?: string
  /** Набор для кнопки магии: подставляет случайный вариант, отличный от текущего. */
  magic?: string[]
}>()

function roll(): void {
  if (!props.magic?.length) return
  model.value = pickOther(props.magic, model.value)
}
</script>

<template>
  <label class="field">
    <span class="field__head">
      <span class="field__label">{{ props.label }}</span>
      <span class="field__tools">
        <MagicButton v-if="props.magic?.length" compact @click="roll" />
        <span v-if="props.limit" class="field__counter">
          {{ model.length }}/{{ props.limit }}
        </span>
      </span>
    </span>
    <textarea
      v-if="props.multiline"
      v-model="model"
      class="field__input field__input--area"
      :maxlength="props.limit"
      :placeholder="props.placeholder"
      rows="3"
    />
    <input
      v-else
      v-model="model"
      class="field__input"
      :maxlength="props.limit"
      :placeholder="props.placeholder"
    />
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__head {
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.field__label {
  font-size: 14px;
  font-weight: 600;
}

.field__tools {
  align-items: center;
  display: flex;
  gap: 7px;
}

.field__counter {
  color: var(--ink-faint);
  font-size: 12px;
}

.field__input {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  outline: none;
  padding: 11px 13px;
  resize: vertical;
  width: 100%;
}

.field__input:focus {
  background: var(--surface);
  border-color: var(--accent);
}

.field__input--area {
  font-family: inherit;
  min-height: 78px;
}
</style>
