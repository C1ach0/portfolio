import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"

let introInstance: any = null;
let timer: ReturnType<typeof setTimeout> | null = null;

export const useIntro = () => {

    if (import.meta.server) {
        return {
            intro: () => { },
            startIfEnabled: async () => { },
            pause: () => { },
            resume: () => { },
            stop: () => { }
        }
    }

    const route = useRoute();
    const router = useRouter();

    const scenario = ref<IntroScenario | null>(null);
    const isPaused = ref(false);

    const parseScenario = () => {
        if (route.query.intro !== "start") return null

        const control: IntroControl =
            route.query.control === "manual" ? "manual" : "auto"

        const duration = Number(route.query.duration) || 3500

        const projects: IntroProjectStep[] = String(route.query.projects || "")
            .split(",")
            .filter(Boolean)
            .map((raw) => {
                const match = raw.match(/^([a-z0-9-]+)(?:\[(in|out)\])?$/i)
                return {
                    slug: match?.[1] ?? raw,
                    mode: match?.[2] === "in" ? "in" : "out"
                }
            })

        return {
            control,
            duration,
            projects,
            currentIndex: 0
        }
    }

    const initIfNeeded = () => {
        if (!scenario.value) {
            scenario.value = parseScenario()
        }
    }

    /* -------------------------
    * AUTO MODE – moteur
    * ------------------------- */
    const startAutoTimer = () => {
        if (!scenario.value || scenario.value.control !== "auto") return
        if (isPaused.value) return

        clearTimer()

        timer = setTimeout(() => {
            nextStep()
        }, scenario.value.duration)
    }

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    const pause = () => {
        isPaused.value = true
        clearTimer()
    }

    const resume = () => {
        if (!isPaused.value) return
        isPaused.value = false
        startAutoTimer()
    }

    /* -------------------------
    * Navigation logique
    * ------------------------- */
    const nextStep = async () => {
        if (!scenario.value) return

        scenario.value.currentIndex++

        const step = scenario.value.projects[scenario.value.currentIndex]

        if (!step) {
            stop()
            return
        }

        // Toujours retour à /projets entre chaque projet
        await router.push({
            path: "/projets",
            query: route.query
        })

        startAutoTimer()
    }

    const stop = () => {
        clearTimer()
        scenario.value = null

        const { intro, ...rest } = route.query
        router.replace({ query: rest })
    }

    /* -------------------------
    * API pour les pages
    * ------------------------- */

    const getCurrentProject = () => {
        if (!scenario.value) return null
        return scenario.value.projects[scenario.value.currentIndex] ?? null
    }

    const isAuto = () => scenario.value?.control === "auto"

    /* -------------------------
    * Lifecycle
    * ------------------------- */
    onMounted(() => {
        initIfNeeded()
        if (scenario.value?.control === "auto") {
            startAutoTimer()
        }
    })

    onBeforeUnmount(() => {
        clearTimer()
    })

    return {
        scenario,
        getCurrentProject,
        isAuto,

        // auto controls
        pause,
        resume,
        stop,

        // 🚧 futur manuel
        // nextManualStep,
        // prevManualStep
    }
}

type IntroControl = "auto" | "manual"

interface IntroProjectStep {
    slug: string
    mode: "in" | "out"
}

interface IntroScenario {
    control: IntroControl
    duration: number
    projects: IntroProjectStep[]
    currentIndex: number
}

const parseIntroQuery = (route: any) => {
    if (route.query.intro !== "start") return null

    const duration = Number(route.query.duration) || 3500
    const control: IntroControl =
        route.query.control === "manual" ? "manual" : "auto"

    const projects: IntroProjectStep[] = String(route.query.projects || "")
        .split(",")
        .filter(Boolean)
        .map((raw) => {
            const match = raw.match(/^([a-z0-9-]+)(?:\[(in|out)\])?$/i)
            return {
                slug: match?.[1] ?? raw,
                mode:
                    control === "manual" && match?.[2] === "in" ? "in" : "out"
            }
        })

    return {
        duration,
        control,
        projects
    }
}
