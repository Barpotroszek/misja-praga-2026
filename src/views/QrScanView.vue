<template>
  <div class="screen" v-if="task">
    <!-- <AgencyHeader :codename="state.auth?.codename" /> -->

    <div class="document-card" style="margin-top: 20px">
      <p class="document-card__eyebrow">ODBLOKUJ ZADANIE</p>
      <h1 style="font-size: 1.3rem">{{ task.title }}</h1>
      <p class="muted">Zeskanuj kod QR znajdujący się w tym miejscu.</p>

      <p v-if="wrongCode" class="error-banner">
        To nie ten kod — sprawdźcie, czy jesteście we właściwym miejscu.
      </p>

      <QrScanner @scan="onScan" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AgencyHeader from '../components/AgencyHeader.vue'
import QrScanner from '../components/QrScanner.vue'
import { useGameState } from '../store/useGameState'

defineProps({ taskId: String })

const router = useRouter()
const { state, currentTask, currentTaskId, unlockCurrentTask } = useGameState()

const task = computed(() => currentTask.value)
const wrongCode = ref(false)

function onScan(code) {}
</script>
