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
    title: 'Pociąg „Kościuszko”',
    component: 'Task1Time',
    direction:
      'Wywiad donosi, że dziś z Warszawy Wileńskiej do Ossowa wyrusza pociąg specjalny „Kościuszko”. Udajcie się na Dworzec Wileński i odszukajcie kod QR. Tam dostaniecie depeszę z dalszymi rozkazami.',
    qrHint: 'Kod QR przy peronie / tablicy odjazdów',
    briefing:
      // TODO - usunac podpowiedz
      [
        'Wiedzieliście, że... W okolicach Ossowa w sierpniu 1920 roku rozegrała się jedna z bitew, które zdecydowały o losach Polski i o jej niepodległości? Dziś w tym miejscu znajduje się cmentarz poległych.',
        'Pociąg specjalny „Kościuszko” kursuje dziś z Warszawy Wileńskiej do Ossowa. W Ossowie czeka na niego delegacja, a pociąg musi stanąć na miejscu punktualnie o 18:32. Podróż trwa dokładnie 30 minut. Nie ma mowy o spóźnieniu, od punktualności zależy powodzenie całej operacji.',
        'Wasze zadanie: ustalcie, o której godzinie pociąg musi odjechać z Warszawy Wileńskiej, żeby zdążyć na czas. Wskazówka dla młodszych agentów: cofnijcie zegar o czas podróży. Wynik ustawcie w polu poniżej.',
      ],
    // poprawna odpowiedź do walidacji w Task1Time.vue — patrz sekcja "correctTime" niżej
    correctTime: '18:00',
    unlockWord: 'SKORUPKA',
    completionNote:
      'Co do minuty, agenci. Pociąg „Kościuszko” dojedzie na czas dzięki wam. Zapiszcie słowo-klucz i ruszajcie dalej.',
  },
  {
    // id: 'task-2-krzyz',
    id: 'task-2',
    title: 'Krzyż Poległych',
    component: 'Task2Pray',
    direction:
      'Nie każda misja polega na pośpiechu. Udajcie się do miejsca upamiętniającego tych, którzy polegli w walce o wolność: Krzyż Poległych, koło Cerkwii św. Magdaleny. Kod QR znajdziecie w pobliżu krzyża.',
    qrHint: 'Kod QR przy krzyżu',
    briefing: [
      'To zadanie wymaga ciszy i skupienia. ',
      'Krok 1. Zatrzymajcie się przy krzyżu. Niech wszyscy przestaną rozmawiać i chwilę postoją w milczeniu. ',
      'Krok 2. Jedna osoba (najlepiej najmłodszy agent, który umie już dobrze czytać) odczytuje na głos modlitwę poniżej, a reszta słucha albo modli się razem z nią.',
      'Panie Boże, Ojcze nasz,\
        wspominamy dziś tych, którzy oddali życie za Ojczyznę.\
        Dziękujemy Ci za ich odwagę, za ich poświęcenie\
        i za wolność, którą nam zostawili. \
        Daj im pokój wieczny i światło, które nie gaśnie. \
        Pociesz rodziny, które po nich płakały. \
        Naucz nas pamiętać o nich nie tylko od święta, ale każdego dnia, \
        i strzec wolności, za którą zapłacili tak wielką cenę \
        Wieczny odpoczynek racz im dać, Panie, \
        a światłość wiekuista niechaj im świeci. \
        Niech odpoczywają w pokoju. \
        Amen.',
    ],
    unlockWord: 'PATRIOTYZM',
    completionNote: 'Chwila zadumy za wami. Ruszajcie dalej — kolejny punkt czeka...',
  },
  {
    // id: 'task-3-flaga',
    id: 'task-3',
    title: 'Namaluj flagę',
    component: 'Task3Flag',
    direction: 'Skierujcie się do wskazanej sali. Na miejscu czeka na was prowadzący zadanie.',
    qrHint: 'Kod pokazywany przez prowadzącego po ukończeniu malowania',
    briefing: [
      'W tej sali czeka na was zadanie plastyczne — namalujcie flagę zgodnie z poleceniem prowadzącego. Gdy skończycie, poproście o kod QR potwierdzający wykonanie.',
    ],
    unlockWord: 'FLAGA',
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
    briefing: [
      'Odsłuchajcie fragment piosenki poniżej, a następnie nagrajcie, jak śpiewacie go wspólnie.',
    ],
    // audioSrc / lyricsUrl uzupełnisz, gdy będziecie mieli finalny materiał
    audioSrc: '',
    lyricsUrl: '',
    unlockWord: 'NIEPODLEGŁOŚĆ',
    completionNote: 'Ale głosy! Dobra robota, agenci. Ostatnia prosta — udajcie się do...',
  },
  {
    // id: 'task-5-wierszyk',
    id: 'task-5',
    title: 'Popraw co nie pasuje',
    component: 'Task5Poem',
    direction: [
      'Czas na powrót do szkoły... Na miejscu zeskanujcie kod QR, by odblokować treść wierszyka.',
    ],
    qrHint: 'Kod QR w punkcie zadania',
    briefing: [
      'W poniższym wierszyku pojawiły się błędy. Dla każdej luki wybierzcie poprawną wersję słowa.',
    ],
    // przykładowa treść — PODMIEŃ na docelowy wierszyk od kolegów.
    // Każda luka to obiekt: { id, options: [...], correct }
    poem: {
      lines: [
        'Sto dwadzieścia trzy lata trwała ciężka {b1},',
        'lecz Polska żyła w pieśni, w {b2} i w szkole.',
        '{b3} chcieli zetrzeć jej imię z mapy,',
        'lecz serca Polaków nie wpadły w ich łapy.',
        '',
        'W {b4} tysiąc dziewięćset osiemnastego roku',
        'Polska wróciła na mapę po wielu latach mroku.',
        '{b5} Piłsudski stanął na czele wojska,',
        'a naród odetchnął: znów jest wolna, jest polska.',
        '',
        'Co roku jedenastego listopada, gdy {b6} świętuje,',
        'każdy {b7} w sercu za wolność dziękuje.',
        'Pamiętamy o tych, którzy za Polskę {b8} oddali,',
        'bo dzięki ich {b9} dziś wolni jesteśmy i cali.',
        '',
        'Dlatego dziś śpiewamy {b10} z dumą i radością,',
        'bo {b11} to skarb, który strzeżemy z miłością.',
      ],
      blanks: [
        { id: 'b1', options: ['niewóla', 'niewola', 'niewolla'], correct: 'niewola' },
        { id: 'b2', options: ['modlitfie', 'modlitwje', 'modlitwie'], correct: 'modlitwie' },
        { id: 'b3', options: ['Zaborcy', 'Zabożcy', 'Zaborzy'], correct: 'Zaborcy' },
        {
          id: 'b4',
          options: ['listopatzie', 'listopadzie', 'listopadżie'],
          correct: 'listopadzie',
        },
        { id: 'b5', options: ['Marszalek', 'Marszałęk', 'Marszałek'], correct: 'Marszałek' },
        {
          id: 'b6',
          options: ['Rzeczypospolita', 'Żeczpospolita', 'Rzeczpospolita'],
          correct: 'Rzeczpospolita',
        },
        { id: 'b7', options: ['Polak', 'Połak', 'Polac'], correct: 'Polak' },
        { id: 'b8', options: ['rzycie', 'życie', 'zycie'], correct: 'życie' },
        { id: 'b9', options: ['odwatze', 'odważe', 'odwadze'], correct: 'odwadze' },
        { id: 'b10', options: ['himn', 'hymn', 'hym'], correct: 'hymn' },
        { id: 'b11', options: ['wolnosć', 'wolność', 'wólność'], correct: 'wolność' },
      ],
    },
    unlockWord: 'ROZBOIRY',
    completionNote: 'Wierszyk poprawiony! Gratulacje, przejdź do kolejnego punktu.',
  },
  {
    // id: 'task-6-mis',
    id: 'task-6',
    title: 'Zadanie z misiem',
    component: 'Task6Placeholder',
    direction: 'Treść tego punktu jeszcze w opracowaniu — miejsce zarezerwowane w trasie.',
    qrHint: 'TBD',
    briefing: ['Treść tego zadania zostanie uzupełniona później.'],
    unlockWord: 'PIŁSUDSKI',
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
