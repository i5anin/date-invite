<script setup lang="ts">
const props = defineProps<{ hint?: string; presets: string[] }>()
const emit = defineEmits<{ pick: [value: string] }>()
</script>

<template>
  <div class="presets">
    <span v-if="props.hint" class="presets__hint">{{ props.hint }}</span>
    <div class="presets__list">
      <button
        v-for="preset in props.presets"
        :key="preset"
        class="presets__item"
        type="button"
        @click="emit('pick', preset)"
      >
        {{ preset }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.presets {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.presets__hint {
  color: var(--ink-faint);
  font-size: 11px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.presets__list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.presets__item {
  background: transparent;
  border: 1px dashed var(--line);
  border-radius: 999px;
  color: var(--accent);
  font-size: 13px;
  padding: 6px 12px;
  text-align: left;
}

.presets__item:hover {
  background: var(--accent-soft);
  border-style: solid;
}
</style>
