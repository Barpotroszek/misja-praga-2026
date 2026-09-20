import { reactive, computed, watch } from 'vue'
import { getActiveTasks, getTaskById } from '../data/tasks/taskDefinitions'

/**
 * Cały stan gry trzymany lokalnie w telefonie (localStorage).
 * Brak haseł / wrażliwych danych — nie ma potrzeby szyfrowania.
 *
 * STORAGE_KEY -> jeden obiekt JSON, żeby uprościć odczyt/zapis.
 */
const STORAGE_KEY = 'misja-praga:state'

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Nie udało się odczytać zapisanego stanu gry:', e)
  }
  return {
    auth: null, // { identifier, familyName, codename, taskOrder }
    rulesAccepted: false,
    currentIndex: 0, // indeks w taskOrder — które zadanie jest "aktywne"
    phase: 'direction', // 'direction' (info dokąd iść) | 'task' (treść zadania odblokowana po QR)
    completedTaskIds: [], // w kolejności ukończenia
    unlockedWords: [], // [{ taskId, word }] w kolejności odblokowania — do krzyżówki
    missionComplete: false,
  }
}

const state = reactive(loadInitialState())

watch(
  state,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true }
)

export function useGameState() {
  const isLoggedIn = computed(() => !!state.auth)

  // Kolejność zadań: z danych grupy (serwer), a jeśli brak — domyślna z definicji.
  const taskOrder = computed(() => {
    if (state.auth?.taskOrder?.length) return state.auth.taskOrder
    return getActiveTasks().map((t) => t.id)
  })

  const currentTaskId = computed(() => taskOrder.value[state.currentIndex] ?? null)
  const currentTask = computed(() =>
    currentTaskId.value ? getTaskById(currentTaskId.value) : null
  )
  const totalTasks = computed(() => taskOrder.value.length)
  const isLastTask = computed(() => state.currentIndex >= totalTasks.value - 1)

  function login(agentData) {
    state.auth = {
      identifier: agentData.identifier,
      familyName: agentData.familyName,
      codename: agentData.codename,
      taskOrder: agentData.taskOrder,
    }
  }

  function acceptRules() {
    state.rulesAccepted = true
  }

  /** Odblokowanie treści zadania po zeskanowaniu kodu QR na miejscu. */
  function unlockCurrentTask(scannedTaskId) {
    if (scannedTaskId !== currentTaskId.value) {
      return { ok: false, reason: 'ZLY_KOD' }
    }
    state.phase = 'task'
    return { ok: true }
  }

  /** Oznaczenie bieżącego zadania jako ukończone + zapis hasła do krzyżówki. */
  function completeCurrentTask() {
    const task = currentTask.value
    if (!task) return

    if (!state.completedTaskIds.includes(task.id)) {
      state.completedTaskIds.push(task.id)
      state.unlockedWords.push({ taskId: task.id, word: task.unlockWord })
    }

    if (isLastTask.value) {
      state.missionComplete = true
    } else {
      state.currentIndex += 1
      state.phase = 'direction'
    }
  }

  function completeMission() {
    state.missionComplete = true
  }

  /** Reset całego postępu (przydatne do testów / nowej rundy na tym samym telefonie). */
  function resetProgress() {
    state.auth = null
    state.rulesAccepted = false
    state.currentIndex = 0
    state.phase = 'direction'
    state.completedTaskIds = []
    state.unlockedWords = []
    state.missionComplete = false
  }

  /**
   * Wylicza, na jaki ekran powinien trafić użytkownik — używane przez router,
   * żeby po odświeżeniu strony zawsze wrócić w dobre miejsce i nie dać
   * przeskoczyć zadań.
   */
  function getResumeRouteName() {
    if (!state.auth) return 'welcome'
    if (!state.rulesAccepted) return 'rules'
    if (state.missionComplete) return 'success'
    if (!currentTask.value) return 'final'
    return state.phase === 'task' ? 'task' : 'direction'
  }

  return {
    state,
    isLoggedIn,
    taskOrder,
    currentTaskId,
    currentTask,
    totalTasks,
    isLastTask,
    login,
    acceptRules,
    unlockCurrentTask,
    completeCurrentTask,
    completeMission,
    resetProgress,
    getResumeRouteName,
  }
}
