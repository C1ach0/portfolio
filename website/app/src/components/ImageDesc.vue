<template>
    <div class="m-2">
        <div class="relative group overflow-hidden rounded-xl cursor-pointer" @click="open">
            <img :src="image.url" :alt="image.alt"
                class="w-full max-h-[500px] object-cover object-center transition-transform duration-300 group-hover:scale-105" />
            <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <UIcon name="i-heroicons-magnifying-glass-plus" class="text-white text-xl" />
            </div>
        </div>

        <div v-if="fullscreen" class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-6"
            @click.self="close">
            <img :src="image.url" :alt="image.alt" class="max-w-[90%] max-h-[80%] object-contain object-center" />

            <div v-if="image.description" class="mt-6 text-white text-center max-w-2xl">
                <p class="text-sm opacity-90">
                    {{ image.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
    image: {
        url: string
        alt?: string
        description?: string
    }
}>()

const fullscreen = ref(false)

function open() {
    fullscreen.value = true
}

function close() {
    fullscreen.value = false
}
</script>