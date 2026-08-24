<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { encodeDraft } from '@/lib/codec'
import { loadInvitation } from '@/lib/storage'
import { fillSlots, slotsFromAnswer } from '@/lib/text'

const route = useRoute()
const router = useRouter()

const id = computed(() => String(route.params.id))
const record = computed(() => loadInvitation(id.value))
const copied = ref('')

const base = window.location.origin + window.location.pathname

const shortLink = computed(() => base + '#/i/' + id.value)
const fatLink = computed(() =>
  record.value ? base + '#/p/' + encodeDraft(record.value.draft) : '',
)

const answerText = computed(() => {
  if (!record.value?.answer) return null
  const labels = Object.fromEntries(
    record.value.draft.activity.options.map((option) => [option.id, option.label]),
  )
  const slots = slotsFromAnswer(record.value.answer, labels)
  return fillSlots('{date}, {time} — {activity}', slots)
})

async function copy(value: string, tag: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = tag
    window.setTimeout(() => (copied.value = ''), 1600)
  } catch {
    copied.value = 'error'
  }
}
</script>

<template>
  <div class="page">
    <p class="eyebrow">Готово</p>
    <h1>Приглашение создано</h1>

    <template v-if="record">
      <div class="card stack">
        <div>
          <h3>Ссылка для отправки</h3>
          <p class="muted">Работает в этом браузере — приглашение лежит в локальном хранилище</p>
        </div>
        <code class="link">{{ shortLink }}</code>
        <div class="row">
          <button class="btn" type="button" @click="copy(shortLink, 'short')">
            {{ copied === 'short' ? 'Скопировано' : 'Скопировать' }}
          </button>
          <a class="btn btn--ghost" :href="shortLink" target="_blank" rel="noopener">
            Открыть как получатель
          </a>
        </div>
      </div>

      <div class="card stack">
        <div>
          <h3>Ссылка с данными внутри</h3>
          <p class="muted">
            Длинная, зато открывается на любом устройстве без сервера. Мессенджер может её
            обрезать — проверьте перед отправкой.
          </p>
        </div>
        <code class="link link--fat">{{ fatLink.slice(0, 120) }}…</code>
        <div class="row">
          <button class="btn" type="button" @click="copy(fatLink, 'fat')">
            {{ copied === 'fat' ? 'Скопировано' : 'Скопировать' }}
          </button>
          <span class="muted">{{ Math.round(fatLink.length / 1024) }} КБ</span>
        </div>
      </div>

      <div class="card stack">
        <h3>Ответ</h3>
        <p v-if="answerText" class="answer">{{ answerText }}</p>
        <p v-else class="muted">Ответа пока нет. Он появится здесь, когда приглашённый выберет.</p>
      </div>

      <div class="row">
        <button class="btn btn--ghost" type="button" @click="router.push({ name: 'builder' })">
          Вернуться в конструктор
        </button>
      </div>
    </template>

    <div v-else class="card stack">
      <h3>Приглашение не найдено</h3>
      <p class="muted">Возможно, оно было создано в другом браузере или хранилище очищено.</p>
      <button class="btn" type="button" @click="router.push({ name: 'builder' })">
        Собрать новое
      </button>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 640px;
  padding: 32px 18px 64px;
}

.link {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-s);
  display: block;
  font-size: 13px;
  overflow-wrap: anywhere;
  padding: 10px;
}

.link--fat {
  color: var(--ink-soft);
}

.answer {
  background: var(--accent-soft);
  border-radius: var(--radius-m);
  color: var(--accent-deep);
  font-weight: 600;
  padding: 12px;
}
</style>
