<script setup lang="ts">
import { computed } from 'vue'
import { artById } from '@/data/arts'

const props = defineProps<{ art: string; photo?: string | null }>()

const resolved = computed(() => artById(props.art))
</script>

<template>
  <div class="art" :style="{ background: resolved.gradient }">
    <img v-if="props.photo" class="art__photo" :src="props.photo" alt="" />
    <span v-else class="art__emoji">{{ resolved.emoji }}</span>
  </div>
</template>

<style scoped>
.art {
  align-items: center;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
}

.art__photo {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.art__emoji {
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
  font-size: 56px;
}
</style>
