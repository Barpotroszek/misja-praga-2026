<template>
  <div class="screen">
    <!-- <AgencyHeader :codename="state.auth?.codename" /> -->

    <div class="document-card" style="margin-top: 20px">
      <p class="document-card__eyebrow">BRIEFING OPERACYJNY</p>
      <h1 style="font-size: 1.4rem">Witajcie, {{ state.auth?.familyName }}</h1>

      <!-- TODO: podmień na docelowy opis zasad gry -->
      <p>
        Czeka na was pięć punktów rozrzuconych po Pradze. W każdym z nich znajdziecie kod QR —
        dopiero po jego zeskanowaniu na miejscu poznacie treść zadania. Zadania trzeba wykonywać
        po kolei; aplikacja zawsze pokaże wam, dokąd iść dalej.
      </p>
      <p>
        Za każde ukończone zadanie dostaniecie hasło. Zapiszcie je w notatniku — przyda się na
        koniec gry, do rozwiązania krzyżówki z waszego pakietu startowego.
      </p>
      <p class="muted">Powodzenia, agenci. Praga na was liczy.</p>
    </div>

    <div class="spacer" />
    <button class="btn btn-primary btn-block" @click="onAccept">Przejdź do zadania</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AgencyHeader from '../components/AgencyHeader.vue'
import { useGameState } from '../store/useGameState'

const router = useRouter()
const { state, acceptRules, currentTaskId } = useGameState()

function onAccept() {
  acceptRules()
  router.push({ name: 'direction', params: { taskId: currentTaskId.value } })
}
</script>
