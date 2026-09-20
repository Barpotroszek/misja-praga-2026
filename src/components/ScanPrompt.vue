<template>
  <transition name="slide-down">
    <div v-if="props.showScanPrompt" class="qr-scan-overlay">
      <div class="document-card" style="max-width: 420px; width: 100%">
        <!-- <p class="document-card__eyebrow">KROK 1 / 1</p> -->

        <h2 class="stamp-font" style="font-size: 1.1rem">{{ props.title }}</h2>
        <template v-if="state === 0">
          <p class="muted">{{ desc }}</p>
          <QrScanner @scan="onScan" placeholder="godzina" />
          <!-- <button
            class="btn btn-secondary btn-block"
            style="margin-top: 10px"
            @click="props.showScanPrompt = false"
          >
            Anuluj
          </button> -->
        </template>
        <template v-else-if="state == 1">
          <h2 class="stamp-font" style="font-size: 1.1rem">Deszyfrowanie tajnych akt…</h2>
          <p class="muted">Proszę czekać, trwa weryfikacja.</p>
          <p></p
        ></template>

        <template v-else-if="state == 2">
          <p class="error-banner">{{ msg }} Spróbuj ponownie.</p>
          <button class="btn btn-primary btn-block" @click="state = 0">Spróbuj ponownie</button>
        </template>
        <template v-else>
          <p class="success-banner">{{ msg }}.</p>
          <!-- <button
            class="btn btn-secondary btn-block"
            style="margin-top: 10px"
            @click="props.showScanPrompt = false"
          >
            Anuluj
          </button> -->
        </template>
        <button
          class="btn btn-secondary btn-block"
          style="margin-top: 10px"
          :disabled="state == 1"
          @click="emit('close')"
        >
          Anuluj
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import QrScanner from './QrScanner.vue'
import '../assets/styles/qr-overlay.css'

// const { props.showScanPrompt, title, desc, validateScan } = defineProps({
//   props.showScanPrompt: Boolean,
//   title: String,
//   desc: String,
//   validateScan: Function,
// })

const props = defineProps({
  showScanPrompt: Boolean,
  title: String,
  desc: String,
  validateScan: Function,
})

console.log(props)

// const { props.showScanPrompt, title, desc, validateScan } = props

const state = ref(0)
const loading = ref(false)
const msg = ref('')

// const { login, getResumeRouteName, currentTaskId } = useGameState()
const emit = defineEmits(['close'])

// state.value =

async function onScan(code) {
  //   loading.value = true
  //   error.value = ''
  state.value = 1
  const resp = await props.validateScan(code)
  console.log(resp)
  state.value = resp.OK ? 3 : 2
  msg.value = resp.msg
}
</script>
