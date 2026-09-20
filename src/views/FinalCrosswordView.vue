<template>
  <div class="screen">
    <div class="document-card" style="margin-top: 20px">
      <p class="document-card__eyebrow">OSTATNI ETAP</p>
      <h1 style="font-size: 1.3rem">Wszystkie zadania wykonane!</h1>
      <p>
        Aby odzyskać niepodległość, dopasujcie odblokowane hasła do krzyżówki z waszego pakietu
        startowego — w tej samej kolejności, w jakiej je zdobyliście.
      </p>

      <p class="document-card__eyebrow" style="margin-top: 18px">WASZE HASŁA (w kolejności)</p>
      <ol class="stack" style="gap: 6px">
        <li v-for="(entry, i) in state.unlockedWords" :key="entry.taskId" class="stamp-font">
          {{ i + 1 }}. {{ entry.word }}
        </li>
      </ol>
    </div>

    <div class="document-card" style="margin-top: 16px">
      <p class="document-card__eyebrow">SZYFR KOŃCOWY</p>
      <p class="muted">
        Gdy ułożycie krzyżówkę, wpiszcie tutaj hasło, które z niej wyszło i zgłoście je
        prowadzącemu w wyznaczonym miejscu.
      </p>
      <div class="field">
        <label for="final-code">Odczytany szyfr</label>
        <input id="final-code" v-model="finalCode" type="text" placeholder="np. NIEPODLEGLOSC" />
      </div>
    </div>

    <div class="spacer" />
    <button class="btn btn-primary btn-block" :disabled="!finalCode.trim()" @click="finish">
      Zakończ misję
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '../store/useGameState'

const router = useRouter()
const { state, completeMission } = useGameState()
const finalCode = ref('')

function finish() {
  // Na tym etapie nie ma weryfikacji hasła z serwerem — zgłoszenie
  // odbywa się fizycznie u prowadzącego. Zapisujemy je tylko lokalnie.
  localStorage.setItem('misja-praga:final-code', finalCode.value.trim())
  completeMission()
  router.push({ name: 'success' })
}
</script>
