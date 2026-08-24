<script setup lang="ts">
const props = withDefaults(
  defineProps<{ title?: string; label?: string; compact?: boolean }>(),
  { title: 'Случайный вариант' },
)
const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    class="magic"
    :class="{ 'magic--compact': props.compact }"
    type="button"
    :title="props.title"
    :aria-label="props.title"
    @click="emit('click')"
  >
    <span class="magic__icon">✨</span>
    <span v-if="props.label" class="magic__label">{{ props.label }}</span>
  </button>
</template>

<style scoped>
.magic {
  align-items: center;
  background: var(--accent-soft);
  border: 1px solid transparent;
  border-radius: 999px;
  color: var(--accent-deep);
  display: inline-flex;
  font-size: 12px;
  font-weight: 600;
  gap: 5px;
  line-height: 1;
  padding: 6px 11px;
  transition: transform 0.15s ease, background 0.15s ease;
}

.magic:hover {
  background: var(--accent);
  color: #fff;
  transform: rotate(-4deg) scale(1.04);
}

.magic--compact {
  padding: 4px 7px;
}

.magic__icon {
  font-size: 13px;
}
</style>
