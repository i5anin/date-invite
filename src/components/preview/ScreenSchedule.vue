<script setup lang="ts">
import { computed, ref } from 'vue'
import ArtBlock from '@/components/ui/ArtBlock.vue'
import { rangeBounds } from '@/lib/range'
import type { ScreenSchedule } from '@/types/invitation'

const props = defineProps<{ screen: ScreenSchedule; photo?: string | null; interactive?: boolean }>()
const emit = defineEmits<{ next: [payload: { date: string; time: string }] }>()

const date = ref('')
const time = ref('')

const bounds = computed(() => rangeBounds(props.screen.range))

/** Атрибуты min/max ограничивают пикер, но не ручной ввод — проверяем сами. */
const inRange = computed(() => {
  if (!date.value) return false
  if (date.value < bounds.value.min) return false
  return !bounds.value.max || date.value <= bounds.value.max
})

const ready = computed(() => Boolean(date.value && time.value && inRange.value))
</script>

<template>
  <div class="screen">
    <ArtBlock :art="props.screen.art" :photo="props.photo" />
    <div class="screen__body">
      <h2 class="screen__title">{{ props.screen.title }}</h2>
      <p class="screen__hint">{{ bounds.hint }}</p>
      <p v-if="date && !inRange" class="screen__warn">Дата вне предложенного периода</p>
      <label class="screen__field">
        <span>Дата</span>
        <input
          v-model="date"
          :disabled="!props.interactive"
          :max="bounds.max ?? undefined"
          :min="bounds.min"
          type="date"
        />
      </label>
      <label class="screen__field">
        <span>Время</span>
        <input v-model="time" :disabled="!props.interactive" type="time" />
      </label>
      <button
        class="btn"
        type="button"
        :disabled="!props.interactive || !ready"
        @click="emit('next', { date, time })"
      >
        {{ props.screen.buttonLabel || 'Дальше' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.screen__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 16px;
  text-align: center;
}

.screen__title {
  font-size: 19px;
}

.screen__hint {
  color: var(--ink-faint);
  font-size: 12px;
  margin-bottom: 4px;
}

.screen__warn {
  color: var(--wax-deep);
  font-size: 12px;
}

.screen__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  text-align: left;
}

.screen__field span {
  color: var(--ink-soft);
}

.screen__field input {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  padding: 9px 10px;
  width: 100%;
}
</style>
