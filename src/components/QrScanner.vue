<template>
  <div class="qr-scanner">
    <div id="qr-scanner-viewport" class="qr-scanner__viewport" />

    <p v-if="cameraError" class="error-banner">
      Nie udało się uruchomić kamery ({{ cameraError }}). Możesz wpisać kod ręcznie poniżej.
    </p>

    <details class="qr-scanner__manual">
      <summary class="muted">Wpisz kod ręcznie</summary>
      <div class="field" style="margin-top: 10px">
        <!-- TODO: zmienic placeholder -->
        <input
          v-model="manualCode"
          type="text"
          placeholder="Znajdziesz go w poleceniu"
          @keyup.enter="submitManual"
          value="AG-7F3K2"
        />
      </div>
      <button class="btn btn-secondary btn-block" @click="submitManual">Zatwierdź kod</button>
    </details>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const { placeholder } = defineProps({
  placeholder: String,
})

const emit = defineEmits(['scan'])
const cameraError = ref('')
const manualCode = ref('')
let scanner = null
let isRunning = false
let hasEmitted = false

function emitScan(code) {
  // Kamera potrafi kilka razy z rzędu odczytać ten sam kod (kilka klatek
  // na sekundę) — emitujemy zdarzenie tylko raz.
  if (hasEmitted) return
  hasEmitted = true
  emit('scan', code)
}

function submitManual() {
  if (!manualCode.value.trim()) return
  emitScan(manualCode.value.trim())
}

async function stopScanner() {
  if (!scanner || !isRunning) return
  isRunning = false
  try {
    // WAŻNE: trzeba poczekać (await) aż stop() faktycznie się zakończy,
    // zanim wywoła się clear() — inaczej biblioteka rzuca wyjątkiem,
    // który potrafi zawiesić Vue w trakcie odmontowywania komponentu
    // (objaw: URL się zmienia, ale ekran zostaje bez zmian).
    await scanner.stop()
    scanner.clear()
  } catch (e) {
    // scanner już zatrzymany / element usunięty z DOM — nic nie robimy
  }
}

onMounted(async () => {
  try {
    scanner = new Html5Qrcode('qr-scanner-viewport')
    await scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 240, height: 240 } },
      (decodedText) => {
        if (hasEmitted) return
        emitScan(decodedText)
        stopScanner() // zatrzymaj kamerę od razu po udanym odczycie
      },
      () => {
        /* błędy pojedynczych klatek — ignorujemy, to normalne przy skanowaniu */
      },
    )
    isRunning = true
  } catch (err) {
    cameraError.value = err?.message || 'brak dostępu do kamery'
  }
})

onBeforeUnmount(() => {
  // celowo bez await — hook odmontowania nie może czekać na Promise,
  // a stopScanner() sam łapie swoje błędy w try/catch
  stopScanner()
})
</script>

<style scoped>
.qr-scanner__viewport {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--navy-shadow);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 14px;
}
.qr-scanner__manual {
  margin-top: 10px;
  font-size: 0.9rem;
}
.qr-scanner__manual summary {
  cursor: pointer;
}
</style>
