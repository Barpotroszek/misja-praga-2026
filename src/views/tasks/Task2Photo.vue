<template>
  <div class="document-card">
    <p class="muted">Zróbcie wspólną fotkę całą rodziną w tym miejscu.</p>

    <label class="btn btn-secondary btn-block" style="text-align: center; cursor: pointer">
      {{ photoPreview ? 'Zrób zdjęcie ponownie' : 'Zrób zdjęcie' }}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        style="display: none"
        @change="onFile"
      />
    </label>

    <img v-if="photoPreview" :src="photoPreview" alt="Podgląd zdjęcia" class="photo-preview" />

    <button class="btn btn-primary btn-block" :disabled="!photoPreview" @click="$emit('completed')">
      Zatwierdź i idź dalej
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({ task: Object })
defineEmits(['completed'])

const photoPreview = ref('')

function onFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    photoPreview.value = reader.result
    // Zdjęcie trzymane tylko w pamięci widoku — nie trafia jeszcze
    // nigdzie na serwer. Do uzupełnienia razem z endpointem uploadu.
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.photo-preview {
  width: 100%;
  border-radius: var(--radius-sm);
  margin: 14px 0;
  border: 2px solid var(--paper-sepia);
}
</style>
