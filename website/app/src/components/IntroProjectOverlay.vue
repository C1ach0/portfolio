<template>
    <Teleport to="body">
        <div v-if="showOverlay" class="fixed inset-0 z-[99999998] pointer-events-none">
            <!-- Overlay semi-transparent -->
            <div class="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" />

            <!-- Message et bouton -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                <div class="bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 p-8 max-w-md">
                    <div class="flex items-center justify-center mb-4">
                        <div class="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                            <UIcon name="material-symbols:explore" class="w-8 h-8 text-rose-400" />
                        </div>
                    </div>

                    <h2 class="text-2xl font-bold text-white text-center mb-3">
                        Explorez ce projet
                    </h2>

                    <p class="text-gray-300 text-center mb-6">
                        Prenez le temps de découvrir les détails de ce projet.
                        Quand vous êtes prêt, cliquez sur le bouton ci-dessous pour continuer la visite guidée.
                    </p>

                    <div class="flex flex-col gap-3">
                        <button
                            @click="handleContinue"
                            class="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>Continuer la visite</span>
                            <UIcon name="material-symbols:arrow-forward" class="w-5 h-5" />
                        </button>

                        <button
                            @click="handleDismiss"
                            class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            Masquer ce message
                        </button>
                    </div>

                    <p class="text-xs text-gray-500 text-center mt-4">
                        Vous pouvez également utiliser les contrôles en bas de l'écran
                    </p>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const { scenario, continueFromProject } = useIntro()
const isDismissed = ref(false)

const showOverlay = computed(() => {
    return scenario?.value?.isInProjectDetail && !isDismissed.value
})

function handleContinue() {
    isDismissed.value = true
    continueFromProject()
}

function handleDismiss() {
    isDismissed.value = true
}

// Réinitialiser isDismissed quand on quitte le mode projet
watch(() => scenario?.value?.isInProjectDetail, (isInDetail) => {
    if (!isInDetail) {
        isDismissed.value = false
    }
})
</script>
