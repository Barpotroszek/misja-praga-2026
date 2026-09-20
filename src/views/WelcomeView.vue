<template>
  <div class="screen screen--center">
    <div class="stack" style="align-items: center">
      <GameLogo />
      <p class="stamp-font muted" style="max-width: 320px">
        Odtajniona teczka operacyjna. Dostęp wyłącznie dla zweryfikowanych agentów.
      </p>
    </div>

    <div class="spacer" />

    <button class="btn btn-primary btn-block" @click="showScanPrompt = true">Zaloguj się</button>
    <ScanPrompt
      :show-scan-prompt="showScanPrompt"
      title="Zeskanuj identyfikator"
      @close="showScanPrompt = false"
      :validate-scan="validateScan"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GameLogo from '../components/GameLogo.vue'
import QrScanner from '../components/QrScanner.vue'
import { fetchAgentData } from '../data/api'
import { useGameState } from '../store/useGameState'
import ScanPrompt from '../components/ScanPrompt.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, getResumeRouteName, currentTaskId } = useGameState()

const showScanPrompt = ref(false)

async function validateScan(identifier) {
  try {
    const data = await fetchAgentData(identifier)
    login(data)
    const route = getResumeRouteName()
    const params = ['direction', 'scan', 'task'].includes(route)
      ? { taskId: currentTaskId.value }
      : 'rules'

    setTimeout(() => {
      router.push({ route, params })
    }, 1200)
    return {
      OK: true,
      msg: 'Identyfikator znaleziony',
    }
  } catch (e) {
    return {
      OK: false,
      msg: 'Nie rozpoznano identyfikatora',
    }
  }
}
</script>

<style scoped>
.login-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 33, 49, 0.55);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 20px;
  z-index: 20;
}
</style>
