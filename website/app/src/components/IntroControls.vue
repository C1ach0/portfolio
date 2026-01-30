<template>
    <Teleport to="body">
        <div v-if="scenario" class="fixed inset-0 pointer-events-none z-[99999999]">
            <!-- Progress bar en haut -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-gray-800/50 backdrop-blur-sm pointer-events-auto">
                <div
                    class="h-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-300"
                    :style="{ width: progressPercentage + '%' }"
                />
            </div>

            <!-- Indicateur de page et step en haut à droite -->
            <div class="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700 pointer-events-auto">
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2">
                        <UIcon name="material-symbols:map-outline" class="w-5 h-5 text-rose-400" />
                        <span class="text-sm font-medium">{{ currentPageName }}</span>
                    </div>
                    <div class="w-px h-4 bg-gray-700" />
                    <span class="text-sm text-gray-400">
                        {{ currentStepIndex + 1 }} / {{ totalSteps }}
                    </span>
                </div>
            </div>

            <!-- Contrôles en bas au centre -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
                <div class="bg-gray-900/90 backdrop-blur-md rounded-full shadow-2xl border border-gray-700 px-6 py-3">
                    <div class="flex items-center gap-4">
                        <!-- Bouton Stop -->
                        <button
                            @click="stop"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors group"
                            title="Arrêter la visite (S)"
                        >
                            <UIcon name="material-symbols:stop" class="w-5 h-5" />
                        </button>

                        <!-- Séparateur -->
                        <div class="w-px h-6 bg-gray-700" />

                        <!-- Mode Auto: Play/Pause -->
                        <button
                            v-if="scenario.control === 'auto'"
                            @click="togglePlayPause"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-white transition-colors"
                            :title="isPaused ? 'Reprendre (R)' : 'Pause (P)'"
                        >
                            <UIcon v-if="isPaused" name="material-symbols:play-arrow" class="w-6 h-6" />
                            <UIcon v-else name="material-symbols:pause" class="w-6 h-6" />
                        </button>

                        <!-- Mode Manual: Précédent -->
                        <button
                            v-if="scenario.control === 'manual'"
                            @click="prevManualStep"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="isFirstStep"
                            title="Étape précédente (←)"
                        >
                            <UIcon name="material-symbols:arrow-back" class="w-5 h-5" />
                        </button>

                        <!-- Mode Manual: Suivant -->
                        <button
                            v-if="scenario.control === 'manual'"
                            @click="nextManualStep"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-rose-500/80 hover:bg-rose-500 text-white transition-colors"
                            title="Étape suivante (→)"
                        >
                            <UIcon name="material-symbols:arrow-forward" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <!-- Légende des raccourcis -->
                <div class="mt-3 text-center">
                    <p class="text-xs text-gray-400">
                        <kbd class="px-2 py-1 bg-gray-800 rounded border border-gray-700">S</kbd>
                        Stop
                        <template v-if="scenario.control === 'auto'">
                            <span class="mx-2">•</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded border border-gray-700">P</kbd>
                            Pause
                            <span class="mx-2">•</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded border border-gray-700">R</kbd>
                            Reprendre
                        </template>
                        <template v-else>
                            <span class="mx-2">•</span>
                            <kbd class="px-2 py-1 bg-gray-800 rounded border border-gray-700">←</kbd>
                            <kbd class="px-2 py-1 bg-gray-800 rounded border border-gray-700">→</kbd>
                            Naviguer
                        </template>
                    </p>
                </div>
            </div>

            <!-- Indicateur de timer (mode auto seulement) -->
            <div
                v-if="scenario.control === 'auto' && !isPaused"
                class="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none"
            >
                <div class="relative w-16 h-16">
                    <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#374151"
                            stroke-width="8"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#f43f5e"
                            stroke-width="8"
                            stroke-linecap="round"
                            :stroke-dasharray="283"
                            :stroke-dashoffset="timerProgress"
                            class="transition-all duration-100"
                        />
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-white text-xs font-medium">{{ timeRemaining }}s</span>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

const { scenario, intro, pause, resume, stop, nextManualStep, prevManualStep } = useIntro()

const isPaused = ref(false)
const currentStepIndex = ref(0)
const totalSteps = ref(0)
const timeRemaining = ref(0)

// Noms des pages
const PAGE_NAMES: Record<string, string> = {
    home: 'Accueil',
    about: 'À Propos',
    projects: 'Projets'
}

const PAGE_CYCLE = ['home', 'about', 'projects'] as const

const currentPageName = computed(() => {
    if (!scenario?.value) return ''
    const pageId = PAGE_CYCLE[scenario?.value.currentPageIndex]
    return PAGE_NAMES[pageId] || pageId
})

const progressPercentage = computed(() => {
    if (!totalSteps.value) return 0
    return ((currentStepIndex.value + 1) / totalSteps.value) * 100
})

const isFirstStep = computed(() => {
    return scenario?.value?.currentPageIndex === 0 && currentStepIndex.value === 0
})

// Timer progress (pour le cercle animé)
const timerProgress = computed(() => {
    if (!scenario?.value) return 283
    const duration = scenario.value.duration / 1000 // en secondes
    const progress = timeRemaining.value / duration
    return 283 - (283 * progress)
})

function togglePlayPause() {
    isPaused.value = !isPaused.value
    if (isPaused.value) {
        pause()
    } else {
        resume()
    }
}

// Écouter les changements dans intro.value pour mettre à jour les infos
watch(() => intro?.value, (newIntro) => {
    if (newIntro) {
        updateStepInfo()
    }
}, { immediate: true })

function updateStepInfo() {
    if (!intro?.value) return

    // Accéder aux informations d'Intro.js
    try {
        const stepIndex = typeof intro.value.getCurrentStep === 'function'
            ? intro.value.getCurrentStep()
            : intro.value._currentStep
        currentStepIndex.value = stepIndex || 0
        totalSteps.value = intro.value._options?.steps?.length || 0
    } catch (e) {
        console.warn('Could not access intro.js internal state', e)
    }
}

// Timer pour le mode auto
let timerInterval: ReturnType<typeof setInterval> | null = null

function startTimer() {
    if (!scenario?.value || scenario.value.control !== 'auto') return

    stopTimer()
    timeRemaining.value = Math.floor(scenario.value.duration / 1000)

    timerInterval = setInterval(() => {
        if (isPaused.value) return

        timeRemaining.value--
        if (timeRemaining.value <= 0) {
            timeRemaining.value = Math.floor(scenario.value!.duration / 1000)
        }
    }, 1000)
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
    }
}

// Écouter les événements d'Intro.js
watch(() => intro?.value, (newIntro) => {
    if (newIntro) {
        // Hook sur les événements intro.js
        const originalOnChange = newIntro.onchange
        newIntro.onchange = function(targetElement: any) {
            updateStepInfo()
            if (scenario?.value?.control === 'auto') {
                timeRemaining.value = Math.floor(scenario.value.duration / 1000)
            }
            if (originalOnChange) {
                originalOnChange.call(newIntro, targetElement)
            }
        }
    }
}, { immediate: true })

onMounted(() => {
    if (scenario?.value?.control === 'auto') {
        startTimer()
    }
    updateStepInfo()
})

onBeforeUnmount(() => {
    stopTimer()
})

watch(() => scenario?.value?.control, (control) => {
    if (control === 'auto') {
        startTimer()
    } else {
        stopTimer()
    }
})

watch(() => isPaused.value, (paused) => {
    if (!paused && scenario?.value?.control === 'auto') {
        startTimer()
    } else {
        stopTimer()
    }
})
</script>

<style scoped>
kbd {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
}
</style>
