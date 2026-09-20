<template>
  <div class="screen screen--center" v-if="task">
    <div class="document-card">
      <h1 style="font-size: 1.4rem">{{ task.title }} — zaliczone!</h1>
      <p class="document-card__eyebrow">ODBLOKOWANE HASŁO:</p>

      <div class="pill" style="font-size: 1rem; margin-bottom: 14px">{{ task.unlockWord }}</div>
      <p class="muted">Zapiszcie to hasło w notatniku — przyda się do finałowej krzyżówki.</p>

      <p style="margin-top: 18px">{{ task.completionNote }}</p>
    </div>

    <div class="spacer" />
    <button class="btn btn-primary btn-block" @click="goNext">Dalej</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getTaskById } from '../data/tasks/taskDefinitions'
import { useGameState } from '../store/useGameState'

const props = defineProps({ taskId: String })
const router = useRouter()
const { getResumeRouteName, currentTaskId } = useGameState()

const task = computed(() => getTaskById(props.taskId))

function goNext() {
  const name = getResumeRouteName()
  const params = ['direction', 'scan', 'task'].includes(name) ? { taskId: currentTaskId.value } : {}
  router.push({ name, params })
}
</script>
