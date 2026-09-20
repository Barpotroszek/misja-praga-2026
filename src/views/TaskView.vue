<template>
  <div class="screen" v-if="task">
    <!-- <AgencyHeader :codename="state.auth?.codename" /> -->

    <div class="document-card" style="margin-top: 20px">
      <div class="stamp" style="float: right; margin-left: 10px">ODTAJNIONE</div>
      <p class="document-card__eyebrow">ZADANIE ODBLOKOWANE</p>
      <h1 style="font-size: 1.3rem">{{ task.title }}</h1>
      <p>{{ task.briefing }}</p>
    </div>

    <div style="margin-top: 20px">
      <component :is="taskComponent" :task="task" @completed="onCompleted" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import AgencyHeader from '../components/AgencyHeader.vue'
import { useGameState } from '../store/useGameState'

defineProps({ taskId: String })

const router = useRouter()
const { state, currentTask, completeCurrentTask } = useGameState()

const task = computed(() => currentTask.value)

// Mapowanie "nazwa komponentu z taskDefinitions.js" -> plik w views/tasks/
const taskComponents = {
  Task1Time: defineAsyncComponent(() => import('./tasks/Task1Time.vue')),
  Task2Photo: defineAsyncComponent(() => import('./tasks/Task2Photo.vue')),
  Task3Flag: defineAsyncComponent(() => import('./tasks/Task3Flag.vue')),
  Task4Song: defineAsyncComponent(() => import('./tasks/Task4Song.vue')),
  Task5Poem: defineAsyncComponent(() => import('./tasks/Task5Poem.vue')),
  Task6Placeholder: defineAsyncComponent(() => import('./tasks/Task6Placeholder.vue')),
}

const taskComponent = computed(() => taskComponents[task.value?.component] ?? null)

function onCompleted() {
  const finishedTaskId = task.value.id
  completeCurrentTask()
  router.push({ name: 'complete', params: { taskId: finishedTaskId } })
}
</script>
