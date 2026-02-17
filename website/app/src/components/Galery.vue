<template>
  <div class="m-2">
    <!-- MULTIPLE IMAGES -->
    <div
      v-if="images.length > 1"
      :class="gridClass"
      class="gap-2"
    >
      <div
        v-for="(image, i) in images"
        :key="i"
        :class="imageClass(i)"
        class="relative group overflow-hidden rounded-xl cursor-pointer"
        @click="open(image.url)"
      >
        <img
          :src="image.url"
          :alt="image.alt"
          class="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />

        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <UIcon name="i-heroicons-magnifying-glass-plus" class="text-white text-xl"/>
        </div>
      </div>
    </div>

    <!-- SINGLE IMAGE -->
    <div
      v-else
      class="relative group overflow-hidden rounded-xl cursor-pointer"
      @click="open(images[0].url)"
    >
      <img
        :src="images[0].url"
        :alt="images[0].alt"
        class="w-full max-h-[500px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <!-- FULLSCREEN -->
    <div
      v-if="fullscreen"
      class="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
      @click="close"
    >
      <img
        :src="fullscreen"
        class="max-w-[90%] max-h-[90%] object-contain object-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const props = defineProps<{
  images: {
    url: string
    alt?: string
  }[]
}>()

const fullscreen = ref<string | null>(null)

function open(url: string) {
  fullscreen.value = url
}

function close() {
  fullscreen.value = null
}

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