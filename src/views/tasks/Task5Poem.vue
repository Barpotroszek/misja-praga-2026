<template>
  <div class="document-card document-card--old">
    <p v-if="showErrors && hasWrongAnswers" class="error-banner">
      Coś tu nie gra — popraw podświetlone słowa.
    </p>

    <p v-for="(line, i) in task.poem.lines" :key="i" class="poem-line">
      <template v-for="(part, j) in parseLine(line)" :key="j">
        <span v-if="part.type === 'text'">{{ part.value }}</span>
        <span
          v-else
          class="poem-blank"
          :class="{ 'poem-blank--error': showErrors && wrongBlankIds.has(part.id) }"
        >
          <select v-model="answers[part.id]">
            <option value="" disabled>wybierz…</option>
            <option v-for="opt in optionsFor(part.id)" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </span>
      </template>
    </p>

    <button class="btn btn-primary btn-block" style="margin-top: 14px" @click="check">
      Zalicz zadanie
    </button>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['completed'])

const answers = reactive(Object.fromEntries(props.task.poem.blanks.map((b) => [b.id, ''])))
const showErrors = ref(false)

function optionsFor(blankId) {
  return props.task.poem.blanks.find((b) => b.id === blankId)?.options ?? []
}

// Rozbija linię tekstu na kawałki zwykłego tekstu i luki "{blankX}"
function parseLine(line) {
  return line
    .split(/(\{[a-zA-Z0-9_]+\})/g)
    .filter((s) => s !== '')
    .map((part) => {
      const match = part.match(/^\{([a-zA-Z0-9_]+)\}$/)
      return match ? { type: 'blank', id: match[1] } : { type: 'text', value: part }
    })
}

/**
const wrongBlankIds = computed(() => {
  
})
  */
const wrongBlankIds = ref(new Set())
const hasWrongAnswers = computed(() => wrongBlankIds.value.size > 0)

function check() {
  const wrong = new Set()
  for (const b of props.task.poem.blanks) {
    if (answers[b.id] !== b.correct) wrong.add(b.id)
  }
  // return wrong
  wrongBlankIds.value = wrong
  showErrors.value = true
  if (!hasWrongAnswers.value) emit('completed')
}
</script>

<style scoped>
.poem-line {
  font-family: 'Vollkorn', Georgia, serif;
  font-style: italic;
  font-size: 1.08rem;
}
</style>
