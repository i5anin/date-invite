<script setup lang="ts">
import ArtBlock from '@/components/ui/ArtBlock.vue'
import type { ScreenActivity } from '@/types/invitation'

const props = defineProps<{ screen: ScreenActivity; interactive?: boolean }>()
const emit = defineEmits<{ pick: [id: string] }>()
</script>

<template>
  <div class="screen">
    <div class="screen__head">
      <h2 class="screen__title">{{ props.screen.title }}</h2>
      <p class="screen__subtitle">{{ props.screen.subtitle }}</p>
    </div>
    <div class="screen__grid">
      <button
        v-for="option in props.screen.options"
        :key="option.id"
        class="tile"
        type="button"
        :disabled="!props.interactive"
        @click="emit('pick', option.id)"
      >
        <ArtBlock v-if="option.photo" art="bloom" :photo="option.photo" />
        <span v-else class="tile__emoji">{{ option.emoji }}</span>
        <span class="tile__label">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 20px 14px;
}

.screen__head {
  text-align: center;
  margin-bottom: 14px;
}

.screen__title {
  font-size: 19px;
}

.screen__subtitle {
  color: var(--ink-soft);
  font-size: 13px;
}

.screen__grid {
  display: grid;
  gap: 9px;
  grid-template-columns: 1fr 1fr;
}

.tile {
  align-items: center;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow: hidden;
  padding: 12px 8px;
}

.tile:not(:disabled):hover {
  border-color: var(--accent);
}

.tile__emoji {
  font-size: 30px;
}

.tile__label {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}
</style>
