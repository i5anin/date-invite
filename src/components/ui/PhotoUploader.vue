<script setup lang="ts">
import { ref } from 'vue'
import { fileToCompressedDataUrl } from '@/lib/image'

const props = defineProps<{ label: string; disabled?: boolean }>()
const emit = defineEmits<{ picked: [src: string] }>()

const input = ref<HTMLInputElement | null>(null)
const busy = ref(false)
const error = ref('')

async function onChange(event: Event): Promise<void> {
  const files = (event.target as HTMLInputElement).files
  if (!files?.length) return
  busy.value = true
  error.value = ''
  try {
    for (const file of Array.from(files)) {
      emit('picked', await fileToCompressedDataUrl(file))
    }
  } catch {
    error.value = 'Не удалось прочитать файл'
  } finally {
    busy.value = false
    if (input.value) input.value.value = ''
  }
}
</script>

<template>
  <div class="uploader">
    <button
      class="uploader__btn"
      type="button"
      :disabled="props.disabled || busy"
      @click="input?.click()"
    >
      {{ busy ? 'Обрабатываю…' : props.label }}
    </button>
    <input
      ref="input"
      accept="image/*"
      class="uploader__input"
      multiple
      type="file"
      @change="onChange"
    />
    <span v-if="error" class="uploader__error">{{ error }}</span>
  </div>
</template>

<style scoped>
.uploader {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.uploader__btn {
  background: var(--surface-alt);
  border: 1px dashed var(--accent);
  border-radius: var(--radius-m);
  color: var(--accent);
  font-weight: 600;
  padding: 12px;
  width: 100%;
}

.uploader__btn:disabled {
  border-color: var(--line);
  color: var(--ink-faint);
}

.uploader__input {
  display: none;
}

.uploader__error {
  color: var(--wax-deep);
  font-size: 12px;
}
</style>
