import { createRouter, createWebHistory } from 'vue-router'
import { useGameState } from '../store/useGameState'

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('../views/WelcomeView.vue'),
  },
  {
    path: '/zasady',
    name: 'rules',
    component: () => import('../views/RulesView.vue'),
  },
  {
    path: '/kierunek/:taskId',
    name: 'direction',
    component: () => import('../views/DirectionView.vue'),
    props: true,
  },
  {
    path: '/skanuj/:taskId',
    name: 'scan',
    component: () => import('../views/QrScanView.vue'),
    props: true,
  },
  {
    path: '/zadanie/:taskId',
    name: 'task',
    component: () => import('../views/TaskView.vue'),
    props: true,
  },
  {
    path: '/ukonczono/:taskId',
    name: 'complete',
    component: () => import('../views/TaskCompleteView.vue'),
    props: true,
  },
  {
    path: '/szyfr',
    name: 'final',
    component: () => import('../views/FinalCrosswordView.vue'),
  },
  {
    path: '/koniec',
    name: 'success',
    component: () => import('../views/SuccessView.vue'),
  },
  {
    // dowolny nieznany adres -> wróć tam, gdzie trzeba
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

const TASK_SCOPED_ROUTES = ['direction', 'scan', 'task']

/**
 * Strażnik nawigacji — to jest odpowiedź na pytanie "jak wracać po
 * odświeżeniu strony we właściwe miejsce i nie dać przeskoczyć zadań":
 * przy KAŻDEJ nawigacji liczymy, gdzie użytkownik "powinien" być
 * (na podstawie stanu z localStorage) i jeśli wchodzi gdzie indziej —
 * przekierowujemy go tam, gdzie faktycznie jest w grze.
 */
router.beforeEach((to) => {
  const { isLoggedIn, getResumeRouteName, currentTaskId, state } = useGameState()

  const resumeLocation = () => {
    const name = getResumeRouteName()
    if (TASK_SCOPED_ROUTES.includes(name)) {
      return { name, params: { taskId: currentTaskId.value } }
    }
    return { name }
  }

  // Ekran powitalny: jeśli już zalogowani, nie ma po co tu wracać
  if (to.name === 'welcome') {
    return isLoggedIn.value ? resumeLocation() : true
  }

  // Wszystko poniżej wymaga zalogowania
  if (!isLoggedIn.value) {
    return { name: 'welcome' }
  }

  // Ekran "Brawo agenci" jest przejściowy — stan gry przesuwa się dalej
  // zanim ten ekran zostanie odwiedzony, więc sprawdzamy go osobno:
  // wolno wejść tylko na ekran ukończenia zadania, które faktycznie ukończono.
  if (to.name === 'complete') {
    const taskId = to.params.taskId
    return state.completedTaskIds.includes(taskId) ? true : resumeLocation()
  }

  // "direction" i "scan" to dwa podekrany TEGO SAMEGO etapu (informacja
  // dokąd iść / właściwe skanowanie na miejscu) — oba są dozwolone,
  // dopóki zadanie nie zostało jeszcze odblokowane kodem QR.
  if (to.name === 'direction' || to.name === 'scan') {
    if (state.phase !== 'direction') return resumeLocation() // już odblokowane -> idź do treści zadania
    if (to.params.taskId !== currentTaskId.value) return resumeLocation()
    return true
  }

  if (to.name === 'task') {
    if (state.phase !== 'task') return resumeLocation() // jeszcze nie odblokowane kodem QR
    if (to.params.taskId !== currentTaskId.value) return resumeLocation()
    return true
  }

  // Pozostałe trasy (rules, final, success) — proste porównanie z etapem gry
  if (to.name !== getResumeRouteName()) {
    return resumeLocation()
  }

  return true
})

export default router
