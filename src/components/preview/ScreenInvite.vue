<script setup lang="ts">
import { computed, ref } from 'vue'
import ArtBlock from '@/components/ui/ArtBlock.vue'
import { nextTactic, type Dodge } from '@/lib/dodge'
import type { ScreenInvite } from '@/types/invitation'

const props = defineProps<{ screen: ScreenInvite; photo?: string | null; interactive?: boolean }>()
const emit = defineEmits<{ yes: [] }>()

const THROTTLE_MS = 220

const dodges = ref(0)
const dodge = ref<Dodge | null>(null)
const lastAt = ref(0)

const pleas = [
  'серьёзно?',
  'подумай ещё',
  'мимо',
  'ну пожалуйста',
  'я старался',
  'она не даст себя нажать',
  'кнопка на моей стороне',
  'ладно, сдаюсь — но она тоже',
]

const plea = computed(() => (dodges.value === 0 ? '' : pleas[Math.min(dodges.value, pleas.length) - 1]))

const wrapStyle = computed(() => {
  const current = dodge.value
  if (!current) return undefined
  return {
    transform: `translate(${current.x}px, ${current.y}px) rotate(${current.rotate}deg) scale(${current.scale})`,
    opacity: String(current.opacity),
    zIndex: String(current.behind ? 0 : 2),
  }
})

const yesStyle = computed(() => ({
  transform: `scale(${Math.min(1.34, 1 + dodges.value * 0.055)})`,
}))

function evade(): void {
  if (!props.interactive) return
  const now = performance.now()
  if (now - lastAt.value < THROTTLE_MS) return
  lastAt.value = now
  dodges.value += 1
  dodge.value = nextTactic(dodge.value?.tactic ?? null, dodges.value)
}
</script>

<template>
  <div class="screen">
    <ArtBlock :art="props.screen.art" :photo="props.photo" />
    <div class="screen__body">
      <h2 class="screen__title">{{ props.screen.title }}</h2>
      <p class="screen__plea">{{ plea }}</p>
      <div class="screen__actions">
        <button
          class="screen__yes"
          type="button"
          :style="yesStyle"
          :disabled="!props.interactive"
          @click="emit('yes')"
        >
          {{ props.screen.yesLabel || 'Да' }}
        </button>
        <span
          class="no"
          :class="[dodge ? 'no--' + dodge.tactic : '', { 'no--instant': dodge?.instant }]"
          :style="wrapStyle"
        >
          <button
            :key="dodges"
            class="no__btn"
            type="button"
            @pointerenter="evade"
            @pointerdown="evade"
            @click="evade"
          >
            {{ props.screen.noLabel || 'Нет' }}
          </button>
        </span>
      </div>
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
  font-size: 21px;
}

.screen__plea {
  color: var(--ink-faint);
  font-size: 12px;
  min-height: 18px;
}

.screen__actions {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: center;
  min-height: 150px;
  position: relative;
  width: 100%;
}

.screen__yes {
  background: var(--accent);
  border: none;
  border-radius: 999px;
  color: #fff;
  font-weight: 600;
  padding: 11px 22px;
  position: relative;
  transition: transform 0.24s cubic-bezier(0.34, 1.4, 0.64, 1);
  z-index: 1;
}

/* Обёртка держит позицию, кнопка внутри играет анимацию — так они не спорят
   за один transform. */
.no {
  display: inline-block;
  position: relative;
  transition: transform 0.34s cubic-bezier(0.34, 1.36, 0.64, 1), opacity 0.3s ease;
  z-index: 2;
}

.no--instant {
  transition: none;
}

.no__btn {
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  font-weight: 600;
  padding: 11px 22px;
  white-space: nowrap;
}

.no--hop .no__btn {
  animation: hop 0.5s ease;
}

.no--slide .no__btn {
  animation: tilt 0.42s ease;
}

.no--squish .no__btn {
  animation: squish 0.45s ease;
}

.no--whirl .no__btn {
  animation: whirl 0.6s ease;
}

.no--blink .no__btn {
  animation: blink 0.6s ease;
}

.no--teleport .no__btn {
  animation: popIn 0.38s cubic-bezier(0.34, 1.5, 0.64, 1);
}

.no--shiver .no__btn {
  animation: shiver 0.45s ease;
}

.no--duck .no__btn {
  animation: dive 0.5s ease;
}

.no--corner .no__btn {
  animation: flee 0.5s ease;
}

@keyframes hop {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-26px) rotate(-7deg);
  }
  62% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes tilt {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(15deg) scale(0.93);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes squish {
  0% {
    transform: scale(1, 1);
  }
  45% {
    transform: scale(1.2, 0.7);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes whirl {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  20%,
  60% {
    opacity: 0.12;
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }
  65% {
    transform: scale(1.16);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shiver {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
}

@keyframes dive {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(16px) scale(0.88);
  }
}

@keyframes flee {
  0% {
    transform: translateX(0) scale(1);
  }
  40% {
    transform: translateX(-10px) scale(1.06);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .no__btn {
    animation: none !important;
  }

  .no {
    transition: none;
  }
}
</style>
