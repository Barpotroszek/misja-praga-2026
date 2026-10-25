<template>
  <header class="agency-bar">
    <img src="/icons/icon.png" alt="" srcset="" style="width: 4em; margin: none; padding: none" />
    <div class="stack" style="gap: 2px">
      <span class="agency-bar__title">Misja Praga — Akta Tajne</span>
      <strong v-if="agentName">{{ agentName }}</strong>
    </div>
    <div class="spacer" />
    <span v-if="progressLabel" class="pill">{{ progressLabel }}</span>
  </header>
</template>

<script setup>
defineProps({
  agentName: { type: String, default: '' },
  progressLabel: { type: String, default: '' },
})
</script>
