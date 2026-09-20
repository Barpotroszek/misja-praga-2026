<template>
  <div class="document-card">
    <p class="document-card__eyebrow">FRAGMENT DO ZAŚPIEWANIA</p>

    <audio v-if="task.audioSrc" :src="task.audioSrc" controls style="width: 100%" />
    <p v-else class="muted">TODO: podłączyć plik audio (src="task.audioSrc").</p>

    <p v-if="task.lyricsUrl">
      <a :href="task.lyricsUrl" target="_blank" rel="noopener">Zobacz tekst piosenki</a>
    </p>
    <p v-else class="muted">TODO: dodać link do tekstu piosenki.</p>

    <hr style="border: none; border-top: 1px dashed var(--paper-sepia); margin: 18px 0" />

    <div v-if="!videoBlobUrl">
      <button v-if="!recording" class="btn btn-primary btn-block" @click="startRecording">
        Nagraj wideo
      </button>
      <button v-else class="btn btn-danger-outline btn-block" @click="stopRecording">
        Zatrzymaj nagrywanie
      </button>
      <video v-if="recording" ref="liveVideo" autoplay muted playsinline class="video-preview" />
    </div>

    <div v-else>
      <video :src="videoBlobUrl" controls playsinline class="video-preview" />
      <div class="stack" style="margin-top: 10px">
        <button class="btn btn-secondary btn-block" @click="resetRecording">Nagraj jeszcze raz</button>
        <button class="btn btn-primary btn-block" :disabled="uploading" @click="submitRecording">
          {{ uploading ? 'Wysyłanie…' : 'Wyślij nagranie' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { uploadRecording } from '../../data/api'
import { useGameState } from '../../store/useGameState'

const props = defineProps({ task: Object })
const emit = defineEmits(['completed'])
const { state } = useGameState()

const recording = ref(false)
const uploading = ref(false)
const liveVideo = ref(null)
const videoBlobUrl = ref('')

let mediaRecorder = null
let mediaStream = null
let chunks = []

async function startRecording() {
  chunks = []
  mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  recording.value = true
  await nextTickAttachStream()

  mediaRecorder = new MediaRecorder(mediaStream)
  mediaRecorder.ondataavailable = (e) => e.data.size && chunks.push(e.data)
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    videoBlobUrl.value = URL.createObjectURL(blob)
    mediaStream?.getTracks().forEach((t) => t.stop())
  }
  mediaRecorder.start()
}

function nextTickAttachStream() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      if (liveVideo.value) liveVideo.value.srcObject = mediaStream
      resolve()
    })
  })
}

function stopRecording() {
  recording.value = false
  mediaRecorder?.stop()
}

function resetRecording() {
  videoBlobUrl.value = ''
  chunks = []
}

async function submitRecording() {
  uploading.value = true
  const blob = await fetch(videoBlobUrl.value).then((r) => r.blob())
  await uploadRecording(blob, state.auth?.identifier, props.task.id)
  uploading.value = false
  emit('completed')
}

onBeforeUnmount(() => {
  mediaStream?.getTracks().forEach((t) => t.stop())
})
</script>

<style scoped>
.video-preview {
  width: 100%;
  border-radius: var(--radius-sm);
  margin-top: 10px;
  background: #000;
}
</style>
