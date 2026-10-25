<template>
  <div class="document-card">
    <p class="document-card__eyebrow">FRAGMENT DO ZAŚPIEWANIA</p>
    <iframe
      width="400"
      height="315"
      src="https://www.youtube.com/embed/ltTZvDlcltY?si=CmqxtKuAkHZsJ44m"
      title="YouTube video player"
      frameborder="0"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>

    <p>Tekst do piosenki macie na odwrocie identyfikatora.</p>
    <p>
      Utworzone nagranie wyślijcie nam na grupę na WhatsAppie. Pamiętajcie, że wywiad to potem
      zweryfikuje!
    </p>
    <hr style="border: none; border-top: 1px dashed var(--paper-sepia); margin: 18px 0" />

    <button class="btn btn-primary btn-block" @click="videoSentCallback">
      Nagranie zostało wysłane
    </button>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { uploadRecording } from '../../data/api'
import { useGameState } from '../../store/useGameState'

const props = defineProps({ task: Object })
const emit = defineEmits(['completed'])
const { state } = useGameState()

const { videoSent } = ref(false)
const videoBlobUrl = ref('')

let mediaRecorder = null
let mediaStream = null
let chunks = []

async function videoSentCallback() {
  emit('completed')
}

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
