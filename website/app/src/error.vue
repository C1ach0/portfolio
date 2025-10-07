<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout>
    <header class="max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4 h-[75vh]">
      <h2 class="text-9xl font-bold text-rose-500">{{ error?.statusCode }}</h2>
      <span>{{ error?.message }}</span>
      <UButton to="/">Back to Home</UButton>
    </header>
  </NuxtLayout>
</template>
