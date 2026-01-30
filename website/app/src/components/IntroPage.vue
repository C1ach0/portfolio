<template>
    <div v-if="!introStarted" class="hidden lg:inline-block fixed z-50 bottom-5 right-7">
        <div class="bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-slate-300 dark:border-slate-700 hover:rotate-1 hover:skew-1 duration-200 ease-in">
            <button
                @click="configIntro"
                class="text-slate-800 dark:text-slate-200 font-medium"
            >
                Démarrer la visite guidée
            </button>
        </div>
    </div>

    <!-- Afficher les contrôles pendant l'intro -->
    <IntroControls v-if="introStarted" />

    <!-- Afficher l'overlay sur les pages de projets en mode [in] -->
    <IntroProjectOverlay />

    <!-- Modal de configuration -->
    <IntroConfig />
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const { initScenario } = useIntro();

const introStarted = computed(() => route.query.intro === 'start');

function configIntro() {
    router.push({ path: route.path, query: { intro: 'config' } });
}

// Initialiser le scénario au montage
onMounted(() => {
    if (introStarted.value) {
        initScenario();
    }
})
</script>