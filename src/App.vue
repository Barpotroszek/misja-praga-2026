<script setup>
import { computed } from 'vue'
import AgencyHeader from './components/AgencyHeader.vue'
import { useGameState } from './store/useGameState'
const { state, totalTasks } = useGameState()
const progressLabel = computed(() => `Zadanie ${state.currentIndex + 1} / ${totalTasks.value}`)
// Cała logika trzymana jest w widokach + src/store/useGameState.js —
// App.vue jest świadomie "głupim" kontenerem na router-view.
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component, route }">
      <AgencyHeader :codename="state.auth?.codename" :progress-label="progressLabel" />
      <transition name="page-turn" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>
