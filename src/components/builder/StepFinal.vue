<script setup lang="ts">
import FieldText from '@/components/ui/FieldText.vue'
import MagicButton from '@/components/ui/MagicButton.vue'
import PresetRow from '@/components/ui/PresetRow.vue'
import { finalDescriptionPresets, finalTitlePresets } from '@/data/presets'
import { randomizeFinal } from '@/lib/magic'
import { placeholders } from '@/lib/text'
import { useInvitationStore } from '@/stores/invitation'

const store = useInvitationStore()

const labels: Record<string, string> = {
  '{date}': 'дата',
  '{time}': 'время',
  '{activity}': 'программа',
}

function insert(token: string): void {
  const value = store.draft.final.description
  store.draft.final.description = value ? value + ' ' + token : token
}
</script>

<template>
  <div class="stack">
    <div class="card stack">
      <div class="head">
        <div>
          <h3>Финальный экран</h3>
          <p class="muted">Дату, время и программу подставим сами — их выбирает приглашённый</p>
        </div>
        <MagicButton
          label="Случайно"
          title="Случайные тексты финала"
          @click="randomizeFinal(store.draft)"
        />
      </div>
      <FieldText
        v-model="store.draft.final.title"
        label="Заголовок"
        :limit="300"
        :magic="finalTitlePresets"
      />
      <PresetRow
        hint="Готовые формулировки"
        :presets="finalTitlePresets"
        @pick="(value) => (store.draft.final.title = value)"
      />
      <FieldText
        v-model="store.draft.final.description"
        label="Описание"
        :limit="500"
        :magic="finalDescriptionPresets"
        multiline
      />
      <PresetRow
        :presets="finalDescriptionPresets"
        @pick="(value) => (store.draft.final.description = value)"
      />
      <div class="tokens">
        <span class="tokens__hint">Вставить подстановку</span>
        <div class="row">
          <button
            v-for="token in placeholders"
            :key="token"
            class="tokens__btn"
            type="button"
            @click="insert(token)"
          >
            + {{ labels[token] }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.tokens {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tokens__hint {
  color: var(--ink-faint);
  font-size: 11px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.tokens__btn {
  background: transparent;
  border: 1px dashed var(--accent);
  border-radius: 999px;
  color: var(--accent);
  font-size: 13px;
  padding: 6px 13px;
}
</style>
