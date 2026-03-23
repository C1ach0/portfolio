<template>
  <div class="m-2">
    <div v-if="images.length > 1" :class="gridClass" class="gap-2">
      <div v-for="(image, i) in images" :key="i" :class="imageClass(i)"
        class="relative group overflow-hidden rounded-xl cursor-pointer" @click="open(image.url)">
        <img :src="image.url" :alt="image.alt"
          class="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110" />

        <div
          class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <UIcon name="i-heroicons-magnifying-glass-plus" class="text-white text-xl" />
        </div>
      </div>
    </div>

    <div v-else class="relative group overflow-hidden rounded-xl cursor-pointer" @click="open(images[0].url)">
      <img :src="images[0].url" :alt="images[0].alt"
        class="w-full max-h-[500px] object-cover object-center transition-transform duration-300 group-hover:scale-105" />
    </div>

    <div v-if="fullscreen" class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6"
      @click.self="close">
      <div
        class="absolute top-10 right-10 p-3 rounded-full bg-white shadow-xl flex flex-col items-center justify-center hover:scale-105 hover:bg-primary-100 cursor-pointer"
        @click="close">
        <UIcon name="i-heroicons-x-mark" class="h-7 w-7 text-black" />
      </div>
      <img :src="fullscreen.url" :alt="fullscreen.alt" class="max-w-[90%] max-h-[80%] object-contain object-center" />
      <div v-if="fullscreen.description" class="mt-6 text-white text-center max-w-2xl">
        <p class="text-sm opacity-90">
          {{ fullscreen.description }}
        </p>
      </div>

      <div
        class="absolute -translate-y-1/2 left-5 p-3 rounded-full shadow-xl flex flex-col items-center justify-center cursor-pointer"
        @click="goto('prev')">
        <UIcon name="i-heroicons-chevron-left" class="h-7 w-7 text-white" />
      </div>
      <div
        class="absolute -translate-y-1/2 right-5 p-3 rounded-full shadow-xl flex flex-col items-center justify-center cursor-pointer"
        @click="goto('next')">
        <UIcon name="i-heroicons-chevron-right" class="h-7 w-7 text-white" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const props = defineProps<{
  images: {
    url: string
    alt?: string
    description?: string
  }[]
}>()

const fullscreen = ref<{
  url: string
  alt?: string
  description?: string
} | null>(null)

function open(url: string) {
  fullscreen.value = props.images.find(i => i.url === url)!;
}

function goto(next: "prev" | "next") {
  const current = fullscreen.value;
  if (!current) return;

  const currentIndex = props.images.findIndex(i => i.url === current.url);
  if (currentIndex === -1) return;

  let newIndex;

  if (next === "next") {
    newIndex = (currentIndex + 1) % props.images.length;
  } else {
    newIndex = (currentIndex - 1 + props.images.length) % props.images.length;
  }

  fullscreen.value = props.images[newIndex];
}

function close() {
  fullscreen.value = null
}

defineShortcuts({
  escape: () => {
    close();
  }
})

const gridClass = computed(() => {
  if (props.images.length >= 3) {
    return "grid grid-cols-2"
  }
  return "grid grid-cols-1"
})

function imageClass(index: number) {
  if (props.images.length === 3 && index === 2) {
    return "col-span-2"
  }
  return ""
}
</script>