<template>
    <div v-if="!introStarted" class="hidden lg:inline-block fixed z-50 bottom-5 right-7">
        <div class="bg-slate-200/50 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-slate-300 hover:rotate-1 hover:skew-1 duration-200 ease-in">
            <button 
                @click="configIntro"
                class="text-slate-800 font-medium"
            >
                Démarrer la visite guidée
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const { initScenario, registerSteps } = useIntro();

const introStarted = computed(() => route.query.intro === 'start');

function configIntro() {
    router.push({ path: route.path, query: { intro: 'config' } });
}

const props = defineProps<{
    introId: string;
    steps: Array<any>;
}>();

onMounted(async () => {
    console.log("IntroPage mounted with introId:", props.introId);

    if (introStarted.value) {
        initScenario();
        await registerSteps(props.introId, props.steps || []);
    }
})
</script>