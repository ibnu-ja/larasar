<script lang="ts" setup>
import { Inertia } from '@inertiajs/inertia'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const progress = ref(0)
const loading = ref(false)

Inertia.on('start', () => startProgress())
const trickleSpeed = 200

Inertia.on('finish', () => done())

function trickle () {
  let amount: number
  if (progress.value >= 0 && progress.value < 0.2) amount = 0.1
  else if (progress.value >= 0.2 && progress.value < 0.5) amount = 0.04
  else if (progress.value >= 0.5 && progress.value < 0.8) amount = 0.02
  else if (progress.value >= 0.8 && progress.value < 0.99) amount = 0.005
  else amount = 0
  progress.value = clamp(progress.value + amount, 0, 0.994)
}

function startProgress () {
  progress.value = 0
  loading.value = true
  const work = function () {
    setTimeout(function () {
      if (!loading.value) return
      trickle()
      if (progress.value >= 0) work()
    }, trickleSpeed)
  }
  work()
}

// stop the progress bar
function done () {
  progress.value = 1
  setTimeout(() => {
    loading.value = false
  }, 350)
}
function clamp (n: number, min: number, max: number) {
  if (n < min) return min
  if (n > max) return max
  return n
}

const $q = useQuasar()
</script>

<template>
  <q-linear-progress
    v-show="loading"
    animation-speed="200"
    :value="progress"
    :color="$q.dark.isActive ? 'primary-dark' : 'primary'"
  />
</template>
