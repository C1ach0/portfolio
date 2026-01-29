// composables/useIntro.ts
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue"
import { useRoute, useRouter } from "vue-router"

/* ----------------------------------
 * Types
 * ---------------------------------- */
type IntroControl = "auto" | "manual"

interface IntroProjectStep {
    slug: string
    mode: "in" | "out"
}

interface IntroScenario {
    control: IntroControl
    duration: number
    projectsToShow: IntroProjectStep[] // Les projets à montrer dans /projets
    currentPageIndex: number // Index dans le cycle home → about → projects
}

interface RegisteredPageSteps {
    id: string
    steps: any[]
}

/* ----------------------------------
 * Singleton state (persistent multi-route)
 * ---------------------------------- */
const intro = ref<any | null>(null)
let introJs: any = null
let autoTimer: ReturnType<typeof setTimeout> | null = null
let isPaused = false
let isNavigating = false
const scenario = ref<IntroScenario | null>(null)
const registeredSteps = ref<RegisteredPageSteps[]>([])

// ✅ Ordre fixe des pages à visiter
const PAGE_CYCLE = ["home", "about", "projects"] as const

/* ----------------------------------
 * Composable
 * ---------------------------------- */
export const useIntro = () => {
    if (import.meta.server) {
        return {
            intro: null,
            scenario: null,
            initScenario: () => { },
            registerSteps: () => { },
            pause: () => { },
            resume: () => { },
            stop: () => { },
            nextManualStep: () => { },
            prevManualStep: () => { }
        }
    }

    const route = useRoute()
    const router = useRouter()

    /* ----------------------------------
     * Utils
     * ---------------------------------- */
    const loadIntro = async () => {
        if (introJs) return introJs
        const mod = await import("intro.js")
        introJs = mod.default
        return introJs
    }

    const clearAutoTimer = () => {
        if (autoTimer) {
            clearTimeout(autoTimer)
            autoTimer = null
        }
    }

    /* ----------------------------------
     * Helper pour convertir HTMLElement en sélecteur
     * ---------------------------------- */
    const convertElementToSelector = (element: HTMLDivElement | string, fallbackId: string): string => {
        if (typeof element === 'string') {
            return element
        }
        console.log(element);
        if (!element?.hasAttribute('data-intro-id')) {
            element?.setAttribute('data-intro-id', fallbackId)
        }

        return `[data-intro-id="${element.getAttribute('data-intro-id')}"]`
    }

    /* ----------------------------------
     * Scenario parsing (query)
     * ---------------------------------- */
    const initScenario = () => {
        if (scenario.value || route.query.intro !== "start") return

        // ✅ Parse les projets à montrer (pour la page /projets)
        const projectsRaw = String(route.query.projects || "").split(",").filter(Boolean)

        scenario.value = {
            control: route.query.control === "manual" ? "manual" : "auto",
            duration: Number(route.query.duration) || 3500,
            currentPageIndex: 0, // Toujours commencer par home
            projectsToShow: projectsRaw.map((raw) => {
                const match = raw.match(/^([a-z0-9-]+)(?:\[(in|out)\])?$/i)
                return {
                    slug: match?.[1] ?? raw,
                    mode: (match?.[2] as "in" | "out") || "out"
                }
            })
        }

        console.log("🌸 Scenario initialized:", {
            currentPageIndex: scenario.value.currentPageIndex,
            currentPage: PAGE_CYCLE[scenario.value.currentPageIndex],
            control: scenario.value.control,
            duration: scenario.value.duration,
            projectsToShow: scenario.value.projectsToShow.map(p => `${p.slug}${p.mode === "in" ? "[in]" : ""}`)
        })
    }

    /* ----------------------------------
     * Page ID mapping
     * ---------------------------------- */
    const getCurrentPageId = (): string | null => {
        if (!scenario.value) return null
        return PAGE_CYCLE[scenario.value.currentPageIndex]
    }

    const getTargetPath = (pageIndex: number): string => {
        const pageId = PAGE_CYCLE[pageIndex]
        
        switch (pageId) {
            case "home":
                return "/"
            case "about":
                return "/a-propos"
            case "projects":
                return "/projets"
            default:
                return "/"
        }
    }

    /* ----------------------------------
     * AUTO engine
     * ---------------------------------- */
    const scheduleAutoNext = () => {
        if (!scenario.value || scenario.value.control !== "auto") return
        if (isPaused || !intro.value) return

        clearAutoTimer()
        autoTimer = setTimeout(() => {
            if (intro.value && !isPaused) {
                intro.value.nextStep()
                scheduleAutoNext()
            }
        }, scenario.value.duration)
    }

    const pause = () => {
        if (!scenario.value) return
        console.log("⏸️ Paused")
        isPaused = true
        clearAutoTimer()
    }

    const resume = () => {
        if (!scenario.value || !isPaused) return
        console.log("▶️ Resumed")
        isPaused = false
        if (scenario.value.control === "auto") {
            scheduleAutoNext()
        }
    }

    const stop = () => {
        console.log("⏹️ Stopped")
        clearAutoTimer()
        isPaused = false
        isNavigating = false

        if (intro.value) {
            intro.value.exit()
            intro.value = null
        }

        scenario.value = null
        registeredSteps.value = []

        const { intro: _i, control: _c, duration: _d, projects: _p, ...rest } = route.query
        router.replace({ query: rest })
    }

    /* ----------------------------------
     * Navigation logic
     * ---------------------------------- */
    const goToPage = async (pageIndex: number) => {
        if (!scenario.value || isNavigating) return

        // ✅ Cycle infini
        console.log(`➡️ Navigating to page index ${pageIndex}`)
        if (pageIndex < 0) {
            pageIndex = PAGE_CYCLE.length - 1
            console.log("🔄 Cycling to last page")
        }
        if (pageIndex >= PAGE_CYCLE.length) {
            pageIndex = 0
            console.log("🔄 Cycling back to first page")
        }

        isNavigating = true
        clearAutoTimer()

        // Exit current intro
        if (intro.value) {
            intro.value.exit()
            intro.value = null
        }

        scenario.value.currentPageIndex = pageIndex
        const pageId = PAGE_CYCLE[pageIndex]
        const targetPath = getTargetPath(pageIndex)

        console.log(`🎯 Page ${pageIndex + 1}/${PAGE_CYCLE.length}: ${pageId} → ${targetPath}`)

        // Navigate if needed
        if (route.path !== targetPath) {
            await router.push({ path: targetPath, query: route.query })
            await nextTick()
            await new Promise(resolve => setTimeout(resolve, 200))
        }

        isNavigating = false

        // Try to start intro on current page
        const expectedPageId = getCurrentPageId()
        if (expectedPageId) {
            await tryStartIntro(expectedPageId)
        }
    }

    const nextManualStep = () => {
        if (!scenario.value || scenario.value.control !== "manual") return
        
        // ✅ Si intro est actif, Intro.js gère déjà la navigation entre steps
        // On laisse juste Intro.js faire son travail
        if (intro.value) {
            console.log("➡️ Manual: next step (handled by Intro.js)")
            intro.value.nextStep()
        } else {
            // Pas d'intro actif, passer directement à la page suivante
            console.log("➡️ Manual: next page (no intro active)")
            goToPage(scenario.value.currentPageIndex + 1)
        }
    }

    const prevManualStep = () => {
        if (!scenario.value || scenario.value.control !== "manual") return
        
        // ✅ Si intro est actif, Intro.js gère déjà la navigation entre steps
        if (intro.value) {
            console.log("⬅️ Manual: previous step (handled by Intro.js)")
            intro.value.previousStep()
        } else {
            // Pas d'intro actif, revenir directement à la page précédente
            console.log("⬅️ Manual: previous page (no intro active)")
            goToPage(scenario.value.currentPageIndex - 1)
        }
    }

    const goToNextPage = async () => {
        if (!scenario.value || scenario.value.control === "manual") return
        console.log("⏭️ Auto: advancing to next page")
        await goToPage(scenario.value.currentPageIndex + 1)
    }

    /* ----------------------------------
     * Pages API — step registration
     * ---------------------------------- */
    const registerSteps = async (id: string, steps: any[]) => {
        if (!scenario.value) {
            console.log(`⚠️ No scenario active, skipping registration for "${id}"`)
            return
        }

        console.log(`📝 Registering ${steps.length} steps for "${id}"`)

        // ✅ Convertir les HTMLElement en sélecteurs
        const processedSteps = steps.map((step, index) => ({
            ...step,
            element: convertElementToSelector(step.element, `${id}-step-${index}`)
        }))

        // Update or add registration
        const existingIndex = registeredSteps.value.findIndex(s => s.id === id)
        if (existingIndex >= 0) {
            registeredSteps.value[existingIndex] = { id, steps: processedSteps }
        } else {
            registeredSteps.value.push({ id, steps: processedSteps })
        }

        await nextTick()

        // Check if this page matches our current scenario step
        const expectedPageId = getCurrentPageId()

        console.log(`🔍 Page "${id}" registered, expected: "${expectedPageId}", current page index: ${scenario.value.currentPageIndex}`)

        // If we're on the expected page for current step, start intro
        if (id === expectedPageId && !intro.value && !isNavigating) {
            console.log(`✅ Page matches current step, starting intro!`)
            await tryStartIntro(id)
        }
    }

    const tryStartIntro = async (id: string) => {
        if (!scenario.value || isNavigating) {
            return
        }

        const expectedPageId = getCurrentPageId()
        if (id !== expectedPageId) {
            console.log(`⏭️ Skipping "${id}" (expected: "${expectedPageId}")`)
            return
        }

        const entry = registeredSteps.value.find(s => s.id === id)
        if (!entry || entry.steps.length === 0) {
            console.warn(`⚠️ No steps found for "${id}"`)
            return
        }

        await nextTick()

        // Wait for DOM to be ready
        const firstElement = entry.steps[0]?.element
        if (firstElement) {
            const maxWait = 10
            let attempts = 0
            while (attempts < maxWait && !document.querySelector(firstElement)) {
                await new Promise(resolve => setTimeout(resolve, 50))
                attempts++
            }
            if (attempts >= maxWait) {
                console.warn(`⚠️ Element "${firstElement}" not found after ${maxWait * 50}ms`)
                return
            }
        }

        console.log(`✅ Starting intro for "${id}" (${entry.steps.length} steps)`)

        const Intro = await loadIntro()
        intro.value = Intro()

        intro.value.setOptions({
            steps: entry.steps,
            showBullets: false,
            showButtons: false,
            exitOnOverlayClick: false,
            exitOnEsc: false,
            disableInteraction: true,
            overlayOpacity: 0.65,
            scrollToElement: true,
            scrollPadding: 30
        })

        intro.value.oncomplete(() => {
            console.log(`✅ Completed intro for "${id}"`)
            // ✅ Quand tous les steps de la page sont terminés, passer à la page suivante
            if (scenario.value?.control === "auto") {
                goToNextPage()
            } else if (scenario.value?.control === "manual") {
                // En mode manual, on attend que l'utilisateur appuie sur →
                // Mais on pourrait aussi passer automatiquement :
                console.log("✅ All steps completed. Press → to go to next page")
            }
        })

        intro.value.onexit(() => {
            console.log(`🚪 Exited intro for "${id}"`)
        })

        intro.value.start()

        // Start auto-advance timer if in auto mode
        if (scenario.value.control === "auto" && !isPaused) {
            scheduleAutoNext()
        }
    }

    /* ----------------------------------
     * Keyboard controls
     * ---------------------------------- */
    const onKeydown = (e: KeyboardEvent) => {
        if (!scenario.value || route.query.intro !== "start") return

        switch (e.key.toLowerCase()) {
            case "p":
                pause()
                e.preventDefault()
                break
            case "r":
                resume()
                e.preventDefault()
                break
            case "s":
                stop()
                e.preventDefault()
                break
            case "arrowright":
                if (scenario.value.control === "manual") {
                    nextManualStep()
                    e.preventDefault()
                }
                break
            case "arrowleft":
                if (scenario.value.control === "manual") {
                    prevManualStep()
                    e.preventDefault()
                }
                break
        }
    }

    /* ----------------------------------
     * Lifecycle
     * ---------------------------------- */
    onMounted(() => {
        initScenario()
        window.addEventListener("keydown", onKeydown)

        if (scenario.value) {
            console.log("🌸 Scenario ready, waiting for page to register steps...")
        }
    })

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onKeydown)
        clearAutoTimer()
    })

    /* ----------------------------------
     * Exposed API
     * ---------------------------------- */
    return {
        intro,
        scenario,
        initScenario,
        registerSteps,
        pause,
        resume,
        stop,
        nextManualStep,
        prevManualStep
    }
}