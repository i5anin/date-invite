<script setup lang="ts">
const props = defineProps<{ current: number; steps: string[]; progress: number }>()
const emit = defineEmits<{ go: [step: number] }>()
</script>

<template>
  <div class="nav">
    <ol class="nav__list">
      <li v-for="(label, index) in props.steps" :key="label" class="nav__item">
        <button
          class="nav__dot"
          :class="{
            'nav__dot--on': props.current === index + 1,
            'nav__dot--done': props.current > index + 1,
          }"
          type="button"
          @click="emit('go', index + 1)"
        >
          {{ props.current > index + 1 ? '✓' : index + 1 }}
        </button>
        <span class="nav__label" :class="{ 'nav__label--on': props.current === index + 1 }">
          {{ label }}
        </span>
      </li>
    </ol>
    <div class="nav__bar">
      <div class="nav__fill" :style="{ width: props.progress + '%' }" />
    </div>
    <p class="muted">Приглашение готово на {{ props.progress }}%</p>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.nav__list {
  display: flex;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.nav__dot {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--ink-faint);
  font-weight: 700;
  height: 32px;
  width: 32px;
}

.nav__dot--on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.nav__dot--done {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent-deep);
}

.nav__label {
  color: var(--ink-faint);
  font-size: 11px;
  text-align: center;
}

.nav__label--on {
  color: var(--accent-deep);
  font-weight: 600;
}

.nav__bar {
  background: var(--surface-alt);
  border-radius: 999px;
  height: 6px;
  overflow: hidden;
}

.nav__fill {
  background: var(--accent);
  height: 100%;
  transition: width 0.3s ease;
}
</style>
