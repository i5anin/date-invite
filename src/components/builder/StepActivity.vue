<script setup lang="ts">
import { ref } from 'vue'
import FieldText from '@/components/ui/FieldText.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import PhotoUploader from '@/components/ui/PhotoUploader.vue'
import { catalog } from '@/data/activities'
import { activitySubtitlePresets, activityTitlePresets } from '@/data/presets'
import { randomizeActivity } from '@/lib/magic'
import { MAX_OPTIONS, MIN_OPTIONS, useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
const activeGroup = ref(catalog[0].id)
</script>

<template>
  <div class="stack">
    <section class="card stack">
      <div class="head">
        <div>
          <h3>Экран выбора активности</h3>
          <p class="muted">От {{ MIN_OPTIONS }} до {{ MAX_OPTIONS }} вариантов</p>
        </div>
        <MagicButton
          label="Случайно"
          title="Случайные тексты и набор вариантов"
          @click="randomizeActivity(store.draft)"
        />
      </div>
      <FieldText
        v-model="store.draft.activity.title"
        label="Заголовок"
        :limit="300"
        :magic="activityTitlePresets"
      />
      <FieldText
        v-model="store.draft.activity.subtitle"
        label="Подзаголовок"
        :limit="300"
        :magic="activitySubtitlePresets"
      />
    </section>

    <div class="card stack">
      <h3>Каталог</h3>
      <div class="groups">
        <button
          v-for="group in catalog"
          :key="group.id"
          class="groups__item"
          :class="{ 'groups__item--on': activeGroup === group.id }"
          type="button"
          @click="activeGroup = group.id"
        >
          {{ group.emoji }} {{ group.label }}
        </button>
      </div>
      <template v-for="group in catalog" :key="group.id">
        <div v-if="group.id === activeGroup" class="tiles">
          <button
            v-for="item in group.items"
            :key="item.id"
            class="tile"
            :class="{ 'tile--on': store.optionIds.includes(item.id) }"
            type="button"
            :disabled="!store.optionIds.includes(item.id) && !store.canAddOption"
            @click="store.toggleOption(item.id)"
          >
            <span class="tile__emoji">{{ item.emoji }}</span>
            <span class="tile__label">{{ item.label }}</span>
          </button>
        </div>
      </template>
    </div>

    <div class="card stack">
      <div class="head">
        <h3>Выбрано</h3>
        <span class="muted">{{ store.draft.activity.options.length }} / {{ MAX_OPTIONS }}</span>
      </div>
      <p v-if="!store.optionsValid" class="warn">Нужно минимум {{ MIN_OPTIONS }} варианта</p>
      <div v-for="option in store.draft.activity.options" :key="option.id" class="picked">
        <div class="picked__art">
          <img v-if="option.photo" :src="option.photo" alt="" />
          <span v-else>{{ option.emoji }}</span>
        </div>
        <div class="picked__body">
          <input v-model="option.label" class="picked__input" maxlength="60" />
          <div class="row">
            <PhotoUploader label="Своё фото" @picked="(src) => (option.photo = src)" />
            <button
              v-if="option.photo"
              class="picked__link"
              type="button"
              @click="option.photo = null"
            >
              убрать фото
            </button>
          </div>
        </div>
        <button class="picked__remove" type="button" @click="store.removeOption(option.id)">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
}

.groups {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.groups__item {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 600;
  padding: 7px 13px;
}

.groups__item--on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.tiles {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, 1fr);
}

.tile {
  align-items: center;
  background: var(--surface-alt);
  border: 2px solid transparent;
  border-radius: var(--radius-m);
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 11px 6px;
}

.tile--on {
  background: var(--accent-soft);
  border-color: var(--accent);
}

.tile:disabled {
  opacity: 0.45;
}

.tile__emoji {
  font-size: 24px;
}

.tile__label {
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}

.warn {
  color: var(--wax-deep);
  font-size: 13px;
}

.picked {
  align-items: center;
  border: 1px solid var(--line);
  border-radius: var(--radius-m);
  display: flex;
  gap: 10px;
  padding: 9px;
}

.picked__art {
  align-items: center;
  background: var(--accent-soft);
  border-radius: var(--radius-s);
  display: flex;
  flex: 0 0 46px;
  font-size: 22px;
  height: 46px;
  justify-content: center;
  overflow: hidden;
}

.picked__art img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.picked__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.picked__input {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  padding: 7px 9px;
  width: 100%;
}

.picked__link {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 12px;
  padding: 0;
  text-decoration: underline;
}

.picked__remove {
  background: none;
  border: none;
  color: var(--ink-faint);
  font-size: 20px;
}

@media (max-width: 560px) {
  .tiles {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
