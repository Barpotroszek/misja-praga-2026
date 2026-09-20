<template>
  <div class="screen" v-if="task">
    <!-- <AgencyHeader :codename="state.auth?.codename" :progress-label="progressLabel" /> -->

    <div class="document-card document-card--old" style="margin-top: 20px">
      <p class="document-card__eyebrow">KIERUNEK MARSZU</p>
      <h1 style="font-size: 1.3rem">{{ task.title }}</h1>
      <p>{{ task.direction }}</p>
      <p class="muted" v-if="task.qrHint">Na miejscu poszukajcie: {{ task.qrHint }}</p>
      <code
        >Kod do wpisania: <b>{{ task.id }}</b></code
      >
    </div>

    <div class="spacer" />
    <button class="btn btn-primary btn-block" @click="showScanPrompt = true">
      Zeskanuj kod na miejscu
    </button>

    <ScanPrompt
      :show-scan-prompt="showScanPrompt"
      title="Zeskanuj kod QR"
      :validate-scan="validateScan"
      @close="showScanPrompt = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { fetchAgentData } from '../data/api'
import { useGameState } from '../store/useGameState'
import ScanPrompt from '../components/ScanPrompt.vue'

defineProps({ taskId: String })

const router = useRouter()
const { state, currentTask, currentTaskId, totalTasks, unlockCurrentTask } = useGameState()
const showScanPrompt = ref(false)
const task = computed(() => currentTask.value)
const progressLabel = computed(() => `Zadanie ${state.currentIndex + 1} / ${totalTasks.value}`)

async function validateScan(code) {
  try {
    const result = unlockCurrentTask(code)
    if (result.ok) {
      setTimeout(() => router.push({ name: 'task', params: { taskId: currentTaskId.value } }), 1500)
      return {
        OK: true,
        msg: 'Zadanie odblokowane!',
      }
    } else {
      return {
        OK: false,
        msg: 'Błędny kod, napewno to właściwe miejsce?',
      }
    }
  } catch (error) {
    return {
      OK: false,
      msg: 'Błędny kod, napewno to właściwe miejsce?',
    }
  }
}

</script>
