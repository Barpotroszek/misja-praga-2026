<template>
  <div class="document-card">
    <p class="muted">
      Namalujcie flagę zgodnie z poleceniem prowadzącego. Gdy skończycie, poproście go o pokazanie
      kodu potwierdzającego i zeskanujcie go poniżej.
    </p>

    <p v-if="wrong" class="error-banner">To nie ten kod — poproście prowadzącego o właściwy.</p>

    <button v-if="!showScanner" class="btn btn-primary btn-block" @click="showScanner = true">
      Zeskanuj kod prowadzącego
    </button>

    <QrScanner v-else @scan="onScan" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QrScanner from '../../components/QrScanner.vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['completed'])

const showScanner = ref(false)
const wrong = ref(false)

function onScan(code) {
  if (code.toLowerCase() === `murzyn-na-jawie`) {
    wrong.value = false
    emit('completed')
  } else {
    wrong.value = true
  }
}
</script>
