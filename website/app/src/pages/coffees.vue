<template>
    <NuxtLayout>
        <header id="hero"
            class="h-[75vh] flex flex-col items-center justify-center relative overflow-x-hidden max-w-6xl mx-auto px-2">
            <div class="text-center z-10">
                <h1 class="text-6xl md:text-8xl font-bold mb-6">
                    <span class="dark:text-white">Mon aventure avec une</span><br>
                    <span class="text-rose-500 dark:text-rose-400">Tasse à la Main</span>
                </h1>
                <p class="text-center max-w-xs mx-auto text-lg text-gray-800 dark:text-gray-300">
                    Merci à toutes les machines à café qui ont soutenu ma productivité
                </p>
            </div>
        </header>
        <section class="p-6 py-20 max-w-7xl mx-auto">
            <div :class='["grid gap-4 grid-cols-2"]'>
                <div v-for="(column, colIndex) in columns" :key="colIndex" class="space-y-4">
                    <div class="group/card" v-for="(item, n) in column" :key="n">
                        <div
                            class="relative overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:border-rose-400 transition-all duration-300">
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-purple-600/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                            </div>
                            <div class="relative group/image overflow-hidden rounded-md">
                                <img :src="item.path" class="w-full block grayscale group-hover/image:grayscale-0" />
                                <div class="absolute bottom-0 left-0 right-0 z-10 p-3 
                                        bg-white/70 backdrop-blur-sm
                                        transition-all duration-300
                                        group-hover/image:bg-white/30 fade-in">
                                    <div class="flex items-center justify-between gap-2">
                                        <div>
                                            <h3 class="text-lg font-semibold text-gray-900">
                                                {{ item.company }}
                                            </h3>
                                            <span v-if="item.subName" class="text-gray-700 text-sm">
                                                {{ item.subName }}
                                            </span>
                                        </div>
                                        <span v-if="item.end" class="text-gray-700 text-sm">{{ (new Date(item.end)).toLocaleDateString("FR-fr", {
                                            year: "2-digit",
                                            month: "2-digit"
                                        }) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { coffees } from '~/assets/data/about'
import type { Coffee } from '~/models/About.models'

const columnCount = 2;

const sortedCoffees = computed(() => {
    return coffees.slice().sort((a, b) => {
        if (!a.end && b.end) return -1
        if (!b.end && a.end) return 1

        const dateA = a.end ? new Date(a.end) : new Date()
        const dateB = b.end ? new Date(b.end) : new Date()

        return dateB.getTime() - dateA.getTime()
    })
})

const columns = computed<Coffee[][]>(() => {
    const cols: Coffee[][] = Array.from({ length: columnCount }, () => [])

    sortedCoffees.value.forEach((item, index) => {
        cols[index % columnCount].push(item)
    })

    return cols
})
</script>