<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Photo } from '@/types/invitation'

const props = defineProps<{ photos: Photo[]; interactive?: boolean }>()
const emit = defineEmits<{ open: [] }>()

const opened = ref(false)

const slots = [
  { top: '7%', left: '10%', rotate: '-7deg', fly: 'translate(-38%, -70%)' },
  { top: '15%', right: '7%', rotate: '6deg', fly: 'translate(45%, -62%)' },
  { bottom: '13%', left: '7%', rotate: '5deg', fly: 'translate(-46%, 66%)' },
  { bottom: '6%', right: '12%', rotate: '-6deg', fly: 'translate(40%, 74%)' },
]

const placed = computed(() =>
  props.photos.slice(0, slots.length).map((photo, index) => ({
    photo,
    slot: slots[index],
  })),
)

function open(): void {
  if (opened.value) return
  opened.value = true
  window.setTimeout(() => emit('open'), 680)
}
</script>

<template>
  <div class="envelope" :class="{ 'envelope--opened': opened }">
    <div class="envelope__paper">
      <div class="envelope__flap" />
      <div class="envelope__fold envelope__fold--left" />
      <div class="envelope__fold envelope__fold--right" />

      <figure
        v-for="entry in placed"
        :key="entry.photo.id"
        class="envelope__photo"
        :style="{
          top: entry.slot.top,
          left: entry.slot.left,
          right: entry.slot.right,
          bottom: entry.slot.bottom,
          '--rotate': entry.slot.rotate,
          '--fly': entry.slot.fly,
        }"
      >
        <span class="envelope__tape" />
        <img :src="entry.photo.src" alt="" />
      </figure>

      <button
        class="envelope__seal"
        type="button"
        :disabled="!props.interactive"
        @click="open"
      >
        <span class="envelope__seal-mark">❤</span>
      </button>

      <span class="envelope__hint">{{ props.interactive ? 'нажми на печать' : 'печать' }}</span>
    </div>
  </div>
</template>

<style scoped>
.envelope {
  align-items: center;
  background: linear-gradient(170deg, var(--bg), var(--bg-deep));
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 12px;
  width: 100%;
}

.envelope__paper {
  aspect-ratio: 3 / 4;
  background: linear-gradient(160deg, #f4e2d3, var(--paper));
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-m);
  max-height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.envelope__flap,
.envelope__fold {
  position: absolute;
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.envelope__flap {
  border-left: 50vw solid transparent;
  border-right: 50vw solid transparent;
  border-top: 34% solid rgba(255, 255, 255, 0.42);
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  transform-origin: top center;
  width: 0;
}

.envelope__fold {
  background: rgba(255, 255, 255, 0.26);
  height: 140%;
  top: -20%;
  width: 1px;
  box-shadow: 0 0 14px 8px rgba(255, 255, 255, 0.18);
}

.envelope__fold--left {
  left: 26%;
  transform: rotate(-34deg);
}

.envelope__fold--right {
  right: 26%;
  transform: rotate(34deg);
}

.envelope__photo {
  margin: 0;
  position: absolute;
  transform: rotate(var(--rotate));
  transition: transform 0.62s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
  width: 36%;
}

.envelope__photo img {
  border: 4px solid #fffdfa;
  border-radius: 3px;
  box-shadow: var(--shadow-s);
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
  aspect-ratio: 3 / 4;
}

.envelope__tape {
  background: rgba(238, 219, 184, 0.85);
  height: 12px;
  left: 50%;
  position: absolute;
  top: -7px;
  transform: translateX(-50%) rotate(-4deg);
  width: 54%;
  z-index: 2;
}

/* Печать: плоская — ровный тон, тонкий ободок, без объёмных теней. */
.envelope__seal {
  background: var(--wax);
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 6px -2px rgba(90, 26, 22, 0.32);
  color: rgba(255, 232, 227, 0.92);
  display: grid;
  font-size: 20px;
  height: 64px;
  left: 50%;
  line-height: 1;
  padding: 0;
  place-items: center;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease, opacity 0.5s ease;
  width: 64px;
  z-index: 3;
}

.envelope__seal::after {
  border: 1px solid rgba(255, 232, 227, 0.28);
  border-radius: inherit;
  content: '';
  inset: 6px;
  position: absolute;
}

.envelope__seal-mark {
  position: relative;
  z-index: 1;
}

.envelope__seal:not(:disabled):hover {
  transform: translate(-50%, -50%) scale(1.05);
}

.envelope__seal:not(:disabled):active {
  transform: translate(-50%, -50%) scale(0.97);
}

.envelope__hint {
  bottom: 9%;
  color: rgba(90, 62, 58, 0.6);
  font-size: 10px;
  left: 50%;
  letter-spacing: 0.18em;
  position: absolute;
  text-transform: uppercase;
  transform: translateX(-50%);
  transition: opacity 0.4s ease;
}

.envelope--opened .envelope__photo {
  opacity: 0;
  transform: rotate(var(--rotate)) var(--fly) scale(0.86);
}

.envelope--opened .envelope__seal {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.9);
}

.envelope--opened .envelope__flap {
  transform: translateX(-50%) rotateX(-165deg);
}

.envelope--opened .envelope__hint {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .envelope__photo,
  .envelope__seal,
  .envelope__flap {
    transition: none;
  }
}
</style>
