# Misja Praga — odzyskać niepodległość

Rodzinna gra terenowa jako PWA (Vue 3 + Vue Router). **Bez backendu** — wszystko
(logowanie, postęp, odblokowane hasła) działa lokalnie na telefonie, przez
`localStorage`. Symulowany "serwer" to statyczne pliki JSON w `public/mock-server/`
— łatwo je później podmienić na prawdziwe zapytania w `src/data/api.js`.

## Uruchomienie

```bash
npm install
npm run dev        # tryb developerski, http://localhost:5173
npm run build      # build produkcyjny -> katalog dist/
npm run preview    # podgląd builda produkcyjnego
```

Uwaga: kamera (skanowanie QR, nagrywanie wideo) w przeglądarce wymaga
**HTTPS** albo `localhost`. Do testów w terenie na telefonie najlepiej
zbudować i wystawić `dist/` pod HTTPS (np. Netlify/Vercel/dowolny hosting
statyczny), albo użyć tunelu (ngrok itp.) w trakcie developmentu.

## Jak przetestować bez prawdziwych kodów QR

Każdy ekran skanowania ma rozwijaną sekcję **"Wpisz kod ręcznie"** — można tam
wpisać identyfikator/kod zamiast skanować. Do zalogowania się użyj np.
`AG-7F3K2` (przykładowe dane w `public/mock-server/agents/AG-7F3K2.json`).

## Struktura katalogów

```
public/
  icons/                     ikony PWA (placeholder — podmień na docelowe)
  mock-server/agents/*.json  "serwer": dane grup agentów (id, rodzina, pseudonim, kolejność zadań)
                             -> docelowo zastąp prawdziwym API (patrz src/data/api.js)

src/
  main.js                    punkt wejścia aplikacji
  App.vue                    kontener na router-view + przejścia między ekranami

  router/index.js            trasy + strażnik pilnujący kolejności zadań
                             i przywracający właściwy ekran po odświeżeniu strony

  store/useGameState.js      cały stan gry (logowanie, postęp, hasła) + zapis
                             do localStorage — jedyne miejsce z logiką stanu

  data/
    api.js                   "warstwa serwera" — na razie mock, docelowo fetch/axios
    tasks/taskDefinitions.js TREŚĆ ZADAŃ: tytuły, kierunki (dokąd iść), briefingi,
                             hasła do krzyżówki — tu edytujesz zawartość gry

  views/                     WSZYSTKIE EKRANY (jeden komponent = jeden ekran)
    WelcomeView.vue           ekran powitalny + logowanie (skan identyfikatora)
    RulesView.vue             zasady gry po zalogowaniu
    DirectionView.vue         "kierunek marszu" — dokąd iść przed zadaniem
    QrScanView.vue            skan kodu QR odblokowującego treść zadania
    TaskView.vue               treść zadania (renderuje odpowiedni komponent z tasks/)
    TaskCompleteView.vue      "Brawo agenci..." + odblokowane hasło
    FinalCrosswordView.vue    lista haseł + pole na szyfr końcowy
    SuccessView.vue           ekran gratulacji

    tasks/                    KOMPONENTY POSZCZEGÓLNYCH ZADAŃ (osadzane w TaskView)
      Task1Time.vue            zad. 1 — godzina odjazdu (input type="time")
      Task2Photo.vue           zad. 2 — zdjęcie przy krzyżu poległych
      Task3Flag.vue            zad. 3 — malowanie flagi + skan kodu prowadzącego
      Task4Song.vue            zad. 4 — audio + nagranie wideo (MediaRecorder)
      Task5Poem.vue            zad. 5 — wierszyk z lukami (rozwijane listy inline)
      Task6Placeholder.vue     zad. 6 — "zadanie z misiem", do uzupełnienia

  components/
    GameLogo.vue              logo — placeholder div w proporcji 4:3 (podmień na grafikę)
    AgencyHeader.vue          górny pasek z pseudonimem grupy i postępem
    QrScanner.vue             skaner QR (kamera) + pole do ręcznego wpisania kodu

  assets/styles/
    colors.css                WSZYSTKIE KOLORY jako zmienne CSS — zmieniaj tylko tu
    main.css                  typografia, layout, style komponentów (klasy .btn, .document-card itp.)
```

## Co jeszcze trzeba uzupełnić

Poszukaj komentarzy `TODO` w kodzie — najważniejsze miejsca:

- **`src/data/tasks/taskDefinitions.js`** — docelowe treści zadań, kierunki,
  hasła do krzyżówki; wierszyk w zadaniu 5 (`poem.lines` / `poem.blanks`);
  audio i tekst piosenki w zadaniu 4 (`audioSrc`, `lyricsUrl`); zadanie 6.
- **`src/data/api.js`** — podłączenie prawdziwego serwera (dane grup +
  upload nagrań z zadania 4) zamiast plików mock.
- **Kody QR** — wygeneruj kody z wartościami równymi `id` zadań z
  `taskDefinitions.js` (np. `task-1-godzina`) do rozstawienia w terenie,
  oraz identyfikatory grup (np. `AG-7F3K2`) do pakietów startowych. Dla
  zadania 3 kod potwierdzający dla prowadzącego to `task-3-flaga-potwierdzenie`.
- **Ikony PWA** (`public/icons/icon-192.png`, `icon-512.png`) — obecnie
  proste placeholdery, warto podmienić na docelowe logo.
- **`src/components/GameLogo.vue`** — podmień placeholder na docelową grafikę.

## Uwaga o "bezpieczeństwie"

Zgodnie z założeniami: brak logowania hasłem, brak szyfrowania — dane w
`localStorage` to tylko identyfikator grupy, postęp gry i odblokowane słowa,
więc nie ma tu niczego wrażliwego do zabezpieczania.
