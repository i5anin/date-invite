<script setup lang="ts">
import MagicButton from './MagicButton.vue'
import { arts } from '@/data/arts'
import { randomArt } from '@/lib/magic'

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="arts">
    <button
      v-for="art in arts"
      :key="art.id"
      class="arts__item"
      :class="{ 'arts__item--active': model === art.id }"
      :style="{ background: art.gradient }"
      type="button"
      :aria-label="art.id"
      @click="model = art.id"
    >
      <span>{{ art.emoji }}</span>
    </button>
    <MagicButton
      class="arts__magic"
      compact
      title="Случайная картинка"
      @click="model = randomArt(model)"
    />
  </div>
</template>

<style scoped>
.arts {
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(6, 1fr) auto;
}

.arts__item {
  aspect-ratio: 1;
  border: 2px solid transparent;
  border-radius: var(--radius-m);
  display: grid;
  font-size: 22px;
  padding: 0;
  place-items: center;
}

.arts__item--active {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.arts__magic {
  justify-self: end;
}
</style>
