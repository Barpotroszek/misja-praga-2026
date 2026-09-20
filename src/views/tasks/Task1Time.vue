<template>
  <div class="document-card">
    <p v-if="wrong" class="error-banner">To nie ta godzina. Rozejrzyjcie się jeszcze raz.</p>

    <div class="field" :class="{ 'field--error': wrong }">
      <label for="departure-time">Godzina odjazdu</label>
      <input id="departure-time" v-model="answer" type="time" />
    </div>

    <button class="btn btn-primary btn-block" :disabled="!answer" @click="check">
      Zatwierdź odpowiedź
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['completed'])

const answer = ref('')
const wrong = ref(false)

function check() {
  if (answer.value === props.task.correctTime) {
    wrong.value = false
    emit('completed')
  } else {
    wrong.value = true
  }
}
</script>
