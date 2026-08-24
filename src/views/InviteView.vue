<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InvitationFlow from '@/components/preview/InvitationFlow.vue'
import { decodeDraft } from '@/lib/codec'
import { loadInvitation, saveAnswer } from '@/lib/storage'
import type { Answer, InvitationDraft } from '@/types/invitation'

const route = useRoute()

const id = computed(() => (route.params.id ? String(route.params.id) : null))

const draft = computed<InvitationDraft | null>(() => {
  if (id.value) return loadInvitation(id.value)?.draft ?? null
  return decodeDraft(String(route.params.payload))
})

const ticketNumber = computed(() =>
  String((id.value ?? String(route.params.payload)).length * 7919).slice(-4).padStart(4, '0'),
)

function onAnswered(answer: Answer): void {
  if (id.value) saveAnswer(id.value, answer)
}
</script>

<template>
  <div class="stage">
    <div v-if="draft" class="stage__inner">
      <InvitationFlow
        :draft="draft"
        interactive
        :ticket-number="ticketNumber"
        @answered="onAnswered"
      />
    </div>
    <div v-else class="stage__missing">
      <h2>Ссылка не открылась</h2>
      <p class="muted">Приглашение недоступно: ссылка неполная или хранилище очищено.</p>
    </div>
  </div>
</template>

<style scoped>
.stage {
  align-items: center;
  background: linear-gradient(170deg, var(--bg), var(--bg-deep));
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
}

.stage__inner {
  background: var(--surface);
  max-width: 460px;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.stage__missing {
  padding: 24px;
  text-align: center;
}
</style>
