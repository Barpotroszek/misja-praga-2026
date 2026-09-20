/**
 * DEFINICJE ZADAŃ
 * ----------------
 * Tu edytujesz treści, kierunki (gdzie mają iść) i hasła do krzyżówki.
 * Kolejność w tej tablicy = kolejność wykonywania zadań (o ile serwer
 * nie nadpisze jej inną kolejnością dla danej grupy — patrz src/data/agents/).
 *
 * Pola każdego zadania:
 *  - id:            unikalny identyfikator (używany też jako treść kodu QR)
 *  - title:         nazwa zadania (widoczna w UI, np. w nagłówku)
 *  - component:     nazwa komponentu z src/views/tasks/, który renderuje zadanie
 *  - direction:     tekst kierunku — dokąd uczestnicy mają się udać PRZED zeskanowaniem QR
 *  - qrHint:        krótka podpowiedź co skanują na miejscu (opcjonalne, do UI skanera)
 *  - briefing:      treść polecenia pokazywana po odblokowaniu (ekran zadania)
 *  - unlockWord:    hasło odblokowywane po ukończeniu zadania (trafia do krzyżówki)
 *  - completionNote: tekst na ekranie "Brawo agenci..." po ukończeniu tego zadania
 */

export const tasks = [
  {
    // id: 'task-1-godzina',
    id: 'task-1',
    title: 'Godzina odjazdu',
    component: 'Task1Time',
    direction:
      'Udajcie się na dworzec kolejowy — do miejsca, z którego wyruszał transport. Tam znajdziecie kod QR z dalszymi instrukcjami.',
    qrHint: 'Kod QR przy peronie / tablicy odjazdów',
    briefing:
      // TODO - usunac podpowiedz
      'Odnajdźcie w okolicy informację (rozkład, tablicę, plakietkę) i podajcie dokładną godzinę odjazdu pociągu. (psst - 18:00)',
    // poprawna odpowiedź do walidacji w Task1Time.vue — patrz sekcja "correctTime" niżej
    correctTime: '18:00',
    unlockWord: 'PRZYKŁAD1',
    completionNote: 'Brawo, agenci. Dobra robota. Przed wami kolejne zadanie: udajcie się...',
  },
  {
    // id: 'task-2-krzyz',
    id: 'task-2',
    title: 'Krzyż Poległych',
    component: 'Task2Photo',
    direction:
      'Waszym celem jest krzyż upamiętniający poległych podczas walk. Odszukajcie go i zeskanujcie kod QR umieszczony w tym miejscu.',
    qrHint: 'Kod QR przy krzyżu',
    briefing:
      'Zatrzymajcie się na chwilę w miejscu pamięci. Zróbcie wspólne zdjęcie całą grupą, a następnie potwierdźcie wykonanie zadania.',
    unlockWord: 'PRZYKŁAD2',
    completionNote: 'Chwila zadumy za wami. Ruszajcie dalej — kolejny punkt czeka...',
  },
  {
    // id: 'task-3-flaga',
    id: 'task-3',
    title: 'Namaluj flagę',
    component: 'Task3Flag',
    direction: 'Skierujcie się do wskazanej sali. Na miejscu czeka na was prowadzący zadanie.',
    qrHint: 'Kod pokazywany przez prowadzącego po ukończeniu malowania',
    briefing:
      'W tej sali czeka na was zadanie plastyczne — namalujcie flagę zgodnie z poleceniem prowadzącego. Gdy skończycie, poproście o kod QR potwierdzający wykonanie.',
    unlockWord: 'PRZYKŁAD3',
    completionNote: 'Flaga gotowa! Czas na kolejne wyzwanie — kierujcie się do...',
  },
  {
    // id: 'task-4-piosenka',
    id: 'task-4',
    title: 'Zaśpiewaj piosenkę',
    component: 'Task4Song',
    direction:
      'Udajcie się do wskazanego punktu, gdzie zeskanujecie kod QR odblokowujący nagranie.',
    qrHint: 'Kod QR w punkcie zadania',
    briefing:
      'Odsłuchajcie fragment piosenki poniżej, a następnie nagrajcie, jak śpiewacie go wspólnie.',
    // audioSrc / lyricsUrl uzupełnisz, gdy będziecie mieli finalny materiał
    audioSrc: '',
    lyricsUrl: '',
    unlockWord: 'PRZYKŁAD4',
    completionNote: 'Ale głosy! Dobra robota, agenci. Ostatnia prosta — udajcie się do...',
  },
  {
    // id: 'task-5-wierszyk',
    id: 'task-5',
    title: 'Popraw co nie pasuje',
    component: 'Task5Poem',
    direction:
      'Czas na powrót do szkoły... Na miejscu zeskanujcie kod QR, by odblokować treść wierszyka.',
    qrHint: 'Kod QR w punkcie zadania',
    briefing:
      'W poniższym wierszyku pojawiły się błędy. Dla każdej luki wybierzcie poprawną wersję słowa.',
    // przykładowa treść — PODMIEŃ na docelowy wierszyk od kolegów.
    // Każda luka to obiekt: { id, options: [...], correct }
    poem: {
      lines: [
        'Szli przez pola i przez lasy,',
        'Bronić {blank1} swej ojczyzny,',
        'Choć wróg silny był i {blank2},',
        'Duch narodu był {blank3}.',
      ],
      blanks: [
        { id: 'blank1', options: ['granic', 'granicz', 'graniec'], correct: 'granic' },
        { id: 'blank2', options: ['Krzyżacy', 'Krzyrzacy', 'Kżyżacy'], correct: 'Krzyżacy' },
        { id: 'blank3', options: ['niezłomny', 'nie złomny', 'niezłomnny'], correct: 'niezłomny' },
      ],
    },
    unlockWord: 'PRZYKŁAD5',
    completionNote: 'Wierszyk poprawiony! Gratulacje, przejdź do kolejnego punktu.',
  },
  {
    // id: 'task-6-mis',
    id: 'task-6',
    title: 'Zadanie z misiem',
    component: 'Task6Placeholder',
    direction: 'Treść tego punktu jeszcze w opracowaniu — miejsce zarezerwowane w trasie.',
    qrHint: 'TBD',
    briefing: 'Treść tego zadania zostanie uzupełniona później.',
    unlockWord: 'PRZYKŁAD6',
    completionNote: 'Świetnie! Ruszajcie dalej...',
    disabled: true, // ustaw na false, gdy zadanie będzie gotowe — wtedy pojawi się w trasie
  },
]

// Lista "aktywnych" zadań, w kolejności wykonywania (pomija disabled)
export function getActiveTasks() {
  return tasks.filter((t) => !t.disabled)
}

export function getTaskById(id) {
  return tasks.find((t) => t.id === id)
}
