<template>
  <div class="document-card">
    <p class="muted">
      To zadanie jest jeszcze w przygotowaniu. Miejsce w trasie jest zarezerwowane — gdy treść
      będzie gotowa, uzupełnij ją w <code>src/data/tasks/taskDefinitions.js</code> (zadanie
      <code>task-6-mis</code>) i ustaw tam <code>disabled: false</code>, żeby pojawiło się w grze.
    </p>
    <button class="btn btn-primary btn-block" @click="$emit('completed')">
      (Test) Oznacz jako ukończone
    </button>
  </div>
</template>

<script setup>
defineProps({ task: Object })
defineEmits(['completed'])
</script>
