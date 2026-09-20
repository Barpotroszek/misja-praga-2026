<template>
  <div class="screen screen--center">
    <div class="document-card">
      <div class="stamp" style="margin-bottom: 14px">MISJA ZAKOŃCZONA</div>
      <h1 style="font-size: 1.5rem">Niepodległość odzyskana!</h1>
      <p>
        Gratulacje, {{ state.auth?.familyName }} ({{ state.auth?.codename }}). Dzięki waszej
        odwadze i sprytowi misja zakończyła się sukcesem.
      </p>
      <p class="muted">Dziękujemy za grę i do zobaczenia na kolejnej misji, agenci.</p>
    </div>
  </div>
</template>

<script setup>
import { useGameState } from '../store/useGameState'
const { state } = useGameState()
</script>
