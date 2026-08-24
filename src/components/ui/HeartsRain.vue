<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ count?: number }>(), { count: 18 })

const glyphs = ['❤', '💗', '💞', '🤍', '💘']

const drops = computed(() =>
  Array.from({ length: props.count }, (_, index) => ({
    id: index,
    glyph: glyphs[index % glyphs.length],
    left: (index * 100) / props.count + Math.random() * 4,
    delay: Math.random() * 3,
    duration: 3.4 + Math.random() * 2.6,
    scale: 0.7 + Math.random() * 0.8,
  })),
)
</script>

<template>
  <div class="rain" aria-hidden="true">
    <span
      v-for="drop in drops"
      :key="drop.id"
      class="rain__drop"
      :style="{
        left: drop.left + '%',
        animationDelay: drop.delay + 's',
        animationDuration: drop.duration + 's',
        fontSize: drop.scale * 20 + 'px',
      }"
    >
      {{ drop.glyph }}
    </span>
  </div>
</template>

<style scoped>
.rain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.rain__drop {
  position: absolute;
  top: -10%;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% {
    top: -10%;
    transform: rotate(0deg);
    opacity: 0;
  }
  12% {
    opacity: 1;
  }
  100% {
    top: 110%;
    transform: rotate(220deg);
    opacity: 0.9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rain {
    display: none;
  }
}
</style>
