/**
 * Warstwa komunikacji z "serwerem".
 * Na razie (bez backendu) czyta statyczne pliki z /public/mock-server/,
 * dokładnie tak jak docelowo czytałaby je z prawdziwego API — wystarczy
 * podmienić BASE_URL i te dwie funkcje na prawdziwe zapytania (fetch/axios).
 *
 * Docelowa struktura na serwerze (do ustalenia z backendem):
 *   GET /agents/{identifier}  -> { identifier, familyName, codename, taskOrder }
 *   POST /uploads/recording   -> upload nagrania wideo z zadania nr 4
 */

const BASE_URL = '/mock-server'

/**
 * Symuluje "deszyfrowanie tajnych akt" — pobranie danych grupy po
 * zeskanowaniu identyfikatora z pakietu startowego.
 * @param {string} identifier np. "AG-7F3K2"
 */
export async function fetchAgentData(identifier) {
  // sztuczne opóźnienie, żeby ekran "deszyfrowania" miał sens wizualnie
  await new Promise((r) => setTimeout(r, 700))

  const res = await fetch(`${BASE_URL}/agents/${encodeURIComponent(identifier)}.json`)
  if (!res.ok) {
    throw new Error('NIEZNANY_IDENTYFIKATOR')
  }
  return res.json()
}

/**
 * Placeholder pod wysyłkę nagrania z zadania 4 (śpiew).
 * Do uzupełnienia, gdy będzie gotowy endpoint na serwerze.
 * @param {Blob} videoBlob
 * @param {string} agentIdentifier
 * @param {string} taskId
 */
export async function uploadRecording(videoBlob, agentIdentifier, taskId) {
  // TODO: docelowo np.
  // const form = new FormData()
  // form.append('video', videoBlob, `${agentIdentifier}-${taskId}.webm`)
  // return fetch(`${BASE_URL}/uploads/recording`, { method: 'POST', body: form })
  console.warn('[uploadRecording] TODO: podłączyć prawdziwy endpoint serwera', {
    agentIdentifier,
    taskId,
    size: videoBlob?.size,
  })
  return { ok: true, mocked: true }
}
