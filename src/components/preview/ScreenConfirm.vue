<script setup lang="ts">
import ArtBlock from '@/components/ui/ArtBlock.vue'
import HeartsRain from '@/components/ui/HeartsRain.vue'
import type { ScreenConfirm } from '@/types/invitation'

const props = defineProps<{ screen: ScreenConfirm; photo?: string | null; interactive?: boolean }>()
const emit = defineEmits<{ next: [] }>()
</script>

<template>
  <div class="screen">
    <HeartsRain :count="14" />
    <ArtBlock :art="props.screen.art" :photo="props.photo" />
    <div class="screen__body">
      <h2 class="screen__title">{{ props.screen.title }}</h2>
      <p class="screen__subtitle">{{ props.screen.subtitle }}</p>
      <button class="btn" type="button" :disabled="!props.interactive" @click="emit('next')">
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
  position: relative;
}

.screen__body {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 18px 16px 24px;
  text-align: center;
}

.screen__title {
  font-size: 20px;
}

.screen__subtitle {
  color: var(--ink-soft);
  font-size: 14px;
}
</style>
