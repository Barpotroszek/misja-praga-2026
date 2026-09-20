Jasne. Jeśli przesiadasz się na Vue i piszesz w JS, to taka ściąga wystarczy Ci na start.

## Vue 3 — ściąga dla JS

### 1. `ref()` — pojedyncza wartość reaktywna

```js
import { ref } from 'vue'

const count = ref(0)

count.value++
```

W template nie potrzebujesz `.value`:

```vue
<button @click="count++">
  {{ count }}
</button>
```

**Myśl o `ref` jako:** „chcę, żeby Vue wiedziało, że ta wartość się zmienia”.

---

### 2. `reactive()` — reaktywny obiekt

```js
import { reactive } from 'vue'

const user = reactive({
  name: 'Jan',
  age: 30,
})

user.name = 'Adam'
```

W template:

```vue
<div>{{ user.name }}</div>
```

Najprostsza zasada:

```text
ref()      → pojedyncza wartość / cokolwiek
reactive() → obiekt
```

W praktyce możesz spokojnie bardzo dużo robić samym `ref()`.

---

### 3. `computed()` — wartość wynikająca z innych wartości

```js
const firstName = ref('Jan')
const lastName = ref('Kowalski')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
```

```vue
{{ fullName }}
```

Czyli:

```text
firstName + lastName
        ↓
     computed
        ↓
     fullName
```

---

### 4. `watch()` — „zrób coś, kiedy coś się zmieni”

```js
const search = ref('')

watch(search, (newValue, oldValue) => {
  console.log('Zmiana:', newValue)
})
```

`computed` **wylicza wartość**.

`watch` **wykonuje efekt uboczny**.

Np. request do API:

```js
watch(search, async (value) => {
  const response = await fetch(`/api/search?q=${value}`)
})
```

---

### 5. Props — przekazywanie danych do komponentu

Rodzic:

```vue
<UserCard :name="user.name" :age="user.age" />
```

Dziecko:

```vue
<script setup>
const props = defineProps({
  name: String,
  age: Number,
})
</script>

<template>
  <div>{{ props.name }} — {{ props.age }}</div>
</template>
```

Możesz też zrobić:

```js
const { name, age } = defineProps({
  name: String,
  age: Number,
})
```

---

### 6. `emit` — dziecko komunikuje się z rodzicem

Dziecko:

```vue
<script setup>
const emit = defineEmits(['save'])

function save() {
  emit('save', 'hello')
}
</script>

<template>
  <button @click="save">Zapisz</button>
</template>
```

Rodzic:

```vue
<UserForm @save="handleSave" />
```

```js
function handleSave(value) {
  console.log(value)
}
```

Czyli:

```text
props  → rodzic → dziecko
emit   → dziecko → rodzic
```

To jest **bardzo ważny schemat Vue**.

---

### 7. `v-if` — warunek

```vue
<div v-if="isLoggedIn">
  Witaj!
</div>

<div v-else>
  Zaloguj się
</div>
```

---

### 8. `v-for` — pętla

```js
const users = ref([
  { id: 1, name: 'Jan' },
  { id: 2, name: 'Adam' },
])
```

```vue
<div v-for="user in users" :key="user.id">
  {{ user.name }}
</div>
```

**Zawsze dawaj `:key`**, najlepiej z prawdziwym ID.

---

### 9. `v-model` — dwukierunkowe powiązanie

```js
const name = ref('')
```

```vue
<input v-model="name" />
```

Wpisujesz:

```text
Jan
```

i `name` automatycznie staje się:

```js
'Jan'
```

---

### 10. `:` — przekazanie wartości JS

```vue
<UserCard :age="user.age" />
```

oznacza:

> przekaż wartość `user.age`

Natomiast:

```vue
<UserCard age="user.age" />
```

oznacza:

> przekaż tekst `"user.age"`

To samo dotyczy HTML:

```vue
<button :disabled="isLoading">
```

---

### 11. `@` — event

```vue
<button @click="save">
```

to skrót:

```vue
<button v-on:click="save">
```

Najczęściej:

```vue
@click @input @change @submit @keydown
```

---

### 12. `v-show`

```vue
<div v-show="isVisible">
```

Element **pozostaje w DOM**, tylko jest ukrywany.

`v-if`:

```text
DOM
 ├── element istnieje
 └── element nie istnieje
```

`v-show`:

```text
DOM
 └── element istnieje
      ├── display: ...
      └── display: none
```

---
