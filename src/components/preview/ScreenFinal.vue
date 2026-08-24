<script setup lang="ts">
import { computed } from 'vue'
import HeartsRain from '@/components/ui/HeartsRain.vue'
import { fillSlots, type Slots } from '@/lib/text'
import type { ScreenFinal } from '@/types/invitation'

const props = defineProps<{ screen: ScreenFinal; slots: Slots; ticketNumber: string }>()

const title = computed(() => fillSlots(props.screen.title, props.slots))
const description = computed(() => fillSlots(props.screen.description, props.slots))
</script>

<template>
  <div class="screen">
    <HeartsRain :count="22" />
    <div class="ticket">
      <div class="ticket__head">
        <span>приглашение</span>
        <span>№ {{ props.ticketNumber }}</span>
      </div>
      <h3 class="ticket__title">Билет на свидание</h3>
      <div class="ticket__grid">
        <div>
          <span class="ticket__label">дата</span>
          <strong>{{ props.slots.date }}</strong>
        </div>
        <div>
          <span class="ticket__label">время</span>
          <strong>{{ props.slots.time }}</strong>
        </div>
      </div>
      <div class="ticket__program">
        <span class="ticket__label">в программе</span>
        <strong>{{ props.slots.activity }}</strong>
      </div>
      <div class="ticket__stub">на двоих · без опозданий</div>
    </div>
    <div class="screen__body">
      <h2 class="screen__title">{{ title }}</h2>
      <p class="screen__text">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.screen {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  justify-content: center;
  padding: 18px 16px;
  position: relative;
  text-align: center;
}

.ticket {
  background: repeating-linear-gradient(
      -45deg,
      rgba(168, 50, 90, 0.04) 0 6px,
      transparent 6px 12px
    ),
    var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  box-shadow: var(--shadow-s);
  padding: 12px;
  width: 100%;
}

.ticket__head {
  color: var(--ink-faint);
  display: flex;
  font-size: 9px;
  justify-content: space-between;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.ticket__title {
  color: var(--accent-deep);
  font-size: 20px;
  margin: 6px 0 10px;
}

.ticket__grid {
  border-top: 1px dashed var(--line);
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
  padding-top: 8px;
  text-align: left;
}

.ticket__program {
  border-top: 1px dashed var(--line);
  margin-top: 8px;
  padding-top: 8px;
  text-align: left;
}

.ticket__label {
  color: var(--ink-faint);
  display: block;
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ticket__stub {
  border-top: 1px dashed var(--line);
  color: var(--ink-faint);
  font-size: 9px;
  letter-spacing: 0.1em;
  margin-top: 10px;
  padding-top: 8px;
  text-transform: uppercase;
}

.screen__title {
  font-size: 20px;
}

.screen__text {
  color: var(--ink-soft);
  font-size: 14px;
}
</style>
