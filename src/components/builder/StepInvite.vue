<script setup lang="ts">
import ArtPicker from '@/components/ui/ArtPicker.vue'
import FieldText from '@/components/ui/FieldText.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import PhotoUploader from '@/components/ui/PhotoUploader.vue'
import PresetRow from '@/components/ui/PresetRow.vue'
import {
  confirmButtonPresets,
  confirmSubtitlePresets,
  confirmTitlePresets,
  noPresets,
  titlePresets,
  yesPresets,
} from '@/data/presets'
import { randomizeConfirm, randomizeInvite } from '@/lib/magic'
import { MAX_PHOTOS, useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()
</script>

<template>
  <div class="stack">
    <div class="card stack">
      <div>
        <h3>Кому пишем</h3>
        <p class="muted">Влияет только на подсказки в текстах</p>
      </div>
      <div class="tone">
        <button
          class="tone__btn"
          :class="{ 'tone__btn--on': store.draft.tone === 'her' }"
          type="button"
          @click="store.draft.tone = 'her'"
        >
          Ей
        </button>
        <button
          class="tone__btn"
          :class="{ 'tone__btn--on': store.draft.tone === 'him' }"
          type="button"
          @click="store.draft.tone = 'him'"
        >
          Ему
        </button>
      </div>
    </div>

    <section
      class="card stack"
      @pointerdown="store.focusStage('envelope')"
      @focusin="store.focusStage('envelope')"
    >
      <div class="head">
        <div>
          <h3>Конверт</h3>
          <p class="muted">
            До {{ MAX_PHOTOS }} ваших фото лягут на конверт и улетят, когда сломают печать
          </p>
        </div>
      </div>
      <div v-if="store.draft.photos.length" class="photos">
        <figure v-for="photo in store.draft.photos" :key="photo.id" class="photos__item">
          <img :src="photo.src" alt="" />
          <button type="button" @click="store.removePhoto(photo.id)">&times;</button>
        </figure>
      </div>
      <PhotoUploader
        label="Добавить фото"
        :disabled="store.draft.photos.length >= MAX_PHOTOS"
        @picked="store.addPhoto"
      />
    </section>

    <section
      class="card stack"
      @pointerdown="store.focusStage('invite')"
      @focusin="store.focusStage('invite')"
    >
      <div class="head">
        <h3>Экран 1 — вопрос</h3>
        <MagicButton
          label="Случайно"
          title="Случайные картинка и тексты экрана"
          @click="randomizeInvite(store.draft)"
        />
      </div>
      <ArtPicker v-model="store.draft.invite.art" />
      <PhotoUploader
        label="Своё фото вместо картинки"
        @picked="(src) => (store.draft.invite.photo = src)"
      />
      <button
        v-if="store.draft.invite.photo"
        class="btn btn--ghost"
        type="button"
        @click="store.draft.invite.photo = null"
      >
        Убрать фото
      </button>
      <FieldText
        v-model="store.draft.invite.title"
        label="Заголовок"
        :limit="300"
        :magic="titlePresets"
        multiline
      />
      <PresetRow
        hint="Готовые формулировки"
        :presets="titlePresets"
        @pick="(value) => (store.draft.invite.title = value)"
      />
      <div class="pair">
        <div class="stack">
          <FieldText
            v-model="store.draft.invite.yesLabel"
            label="Кнопка «Да»"
            :limit="30"
            :magic="yesPresets"
          />
          <PresetRow
            :presets="yesPresets"
            @pick="(value) => (store.draft.invite.yesLabel = value)"
          />
        </div>
        <div class="stack">
          <FieldText
            v-model="store.draft.invite.noLabel"
            label="Кнопка «Нет»"
            :limit="30"
            :magic="noPresets"
          />
          <PresetRow :presets="noPresets" @pick="(value) => (store.draft.invite.noLabel = value)" />
        </div>
      </div>
      <p class="muted">
        «Нет» уклоняется девятью способами — прыгает, уезжает, крутится, мигает,
        телепортируется и прячется за «Да»; с каждой попыткой мельчает, «Да» растёт.
      </p>
    </section>

    <section
      class="card stack"
      @pointerdown="store.focusStage('confirm')"
      @focusin="store.focusStage('confirm')"
    >
      <div class="head">
        <h3>Экран 2 — подтверждение</h3>
        <MagicButton
          label="Случайно"
          title="Случайные картинка и тексты экрана"
          @click="randomizeConfirm(store.draft)"
        />
      </div>
      <ArtPicker v-model="store.draft.confirm.art" />
      <PhotoUploader
        label="Своё фото вместо картинки"
        @picked="(src) => (store.draft.confirm.photo = src)"
      />
      <button
        v-if="store.draft.confirm.photo"
        class="btn btn--ghost"
        type="button"
        @click="store.draft.confirm.photo = null"
      >
        Убрать фото
      </button>
      <FieldText
        v-model="store.draft.confirm.title"
        label="Заголовок"
        :limit="300"
        :magic="confirmTitlePresets"
        multiline
      />
      <PresetRow
        :presets="confirmTitlePresets"
        @pick="(value) => (store.draft.confirm.title = value)"
      />
      <FieldText
        v-model="store.draft.confirm.subtitle"
        label="Подзаголовок"
        :limit="300"
        :magic="confirmSubtitlePresets"
        multiline
      />
      <PresetRow
        :presets="confirmSubtitlePresets"
        @pick="(value) => (store.draft.confirm.subtitle = value)"
      />
      <FieldText
        v-model="store.draft.confirm.buttonLabel"
        label="Текст кнопки"
        :limit="40"
        :magic="confirmButtonPresets"
      />
    </section>
  </div>
</template>

<style scoped>
.head {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.tone {
  background: var(--surface-alt);
  border-radius: 999px;
  display: grid;
  gap: 4px;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
}

.tone__btn {
  background: transparent;
  border: none;
  border-radius: 999px;
  color: var(--ink-soft);
  font-weight: 600;
  padding: 9px;
}

.tone__btn--on {
  background: var(--surface);
  box-shadow: var(--shadow-s);
  color: var(--accent);
}

.photos {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, 1fr);
}

.photos__item {
  margin: 0;
  position: relative;
}

.photos__item img {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-s);
  display: block;
  object-fit: cover;
  width: 100%;
}

.photos__item button {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 50%;
  height: 22px;
  line-height: 1;
  position: absolute;
  right: -6px;
  top: -6px;
  width: 22px;
}

.pair {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 560px) {
  .pair {
    grid-template-columns: 1fr;
  }
}
</style>
