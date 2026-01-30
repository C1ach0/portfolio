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
    currentProjectIndex: number // Index du projet actuellement affiché (dans projectsToShow)
    isInProjectDetail: boolean // Est-on dans la page détail d'un projet ?
}

interface RegisteredPageSteps {
    id: string
    steps: any[]
}

/* ----------------------------------
 * Intro.js minimal typing
 * ---------------------------------- */
type IntroStep = Record<string, unknown> & { element?: string }

interface IntroInstance {
    setOptions(options: {
        steps: IntroStep[]
        showBullets?: boolean
        showButtons?: boolean
        exitOnOverlayClick?: boolean
        exitOnEsc?: boolean
        disableInteraction?: boolean
        overlayOpacity?: number
        scrollToElement?: boolean
        scrollPadding?: number
    }): void
    start(): void
    exit(): void
    nextStep(): void
    previousStep(): void
    onbeforechange(cb: (targetElement: HTMLElement | null) => boolean | void | Promise<boolean | void>): void
    oncomplete(cb: () => void): void
    onexit(cb: () => void): void
    onchange?: ((targetElement: HTMLElement | null) => void) | null
    getCurrentStep: () => number
    _currentStep?: number
    _options?: { steps?: IntroStep[] }
}

type IntroFactory = () => IntroInstance
type IntroModule = IntroFactory & { tour?: IntroFactory }

/* ----------------------------------
 * Singleton state (persistent multi-route)
 * ---------------------------------- */
const intro = ref<IntroInstance | null>(null)
let introJs: IntroModule | null = null
let autoTimer: ReturnType<typeof setTimeout> | null = null
let isPaused = false
let isNavigating = false
let isIntroCompleted = false // Flag pour savoir si l'intro de la page actuelle est terminé
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
            prevManualStep: () => { },
            continueFromProject: () => { }
        }
    }

    const route = useRoute()
    const router = useRouter()

    /* ----------------------------------
     * Utils
     * ---------------------------------- */
    const loadIntro = async (): Promise<IntroModule> => {
        if (introJs) return introJs
        const mod = await import("intro.js")
        const imported = (mod as unknown as { default?: IntroModule }).default ?? (mod as unknown as IntroModule)
        introJs = imported
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
    const convertElementToSelector = (element: HTMLDivElement | string | null, fallbackId: string): string => {
        if (typeof element === 'string') {
            return element
        }

        // Si l'élément est null ou undefined, retourner un sélecteur avec le fallback
        if (!element) {
            console.warn(`Element is null for fallbackId: ${fallbackId}`)
            return `[data-intro-id="${fallbackId}"]`
        }

        console.log(element);
        if (!element.hasAttribute('data-intro-id')) {
            element.setAttribute('data-intro-id', fallbackId)
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
            currentProjectIndex: -1, // Pas encore de projet affiché
            isInProjectDetail: false, // Pas encore dans un projet
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
        if (!scenario.value) {
            console.error("❌ No scenario, cannot navigate")
            return
        }

        if (isNavigating) {
            console.warn("⚠️ Already navigating, skipping")
            return
        }

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
            console.log("🚪 Exiting current intro before navigation")
            intro.value.exit()
            intro.value = null
        }

        scenario.value.currentPageIndex = pageIndex
        const pageId = PAGE_CYCLE[pageIndex]
        const targetPath = getTargetPath(pageIndex)

        console.log(`🎯 Navigating to page ${pageIndex + 1}/${PAGE_CYCLE.length}: ${pageId} → ${targetPath}`)

        // Navigate if needed
        if (route.path !== targetPath) {
            console.log(`🔀 Route change: ${route.path} → ${targetPath}`)
            await router.push({ path: targetPath, query: route.query })
            await nextTick()
            await new Promise(resolve => setTimeout(resolve, 300))
        } else {
            console.log("✅ Already on target path")
        }

        isNavigating = false
        console.log("✅ Navigation completed, trying to start intro")

        // Try to start intro on current page
        const expectedPageId = getCurrentPageId()
        if (expectedPageId) {
            console.log(`🎬 Starting intro for page: ${expectedPageId}`)
            await tryStartIntro(expectedPageId)
        } else {
            console.error("❌ No expected page ID")
        }
    }

    const nextManualStep = () => {
        if (!scenario.value || scenario.value.control !== "manual") return

        // Bloquer les inputs pendant la navigation
        if (isNavigating) {
            console.warn("⚠️ Navigation in progress, ignoring input")
            return
        }

        // ✅ Si l'intro est complété, passer à la page suivante
        if (isIntroCompleted) {
            console.log("➡️ Manual: intro completed, going to next page")
            isIntroCompleted = false
            goToPage(scenario.value.currentPageIndex + 1)
            return
        }

        // ✅ Si intro est actif, vérifier si on est sur le dernier step
        if (intro.value) {
            const currentStep = intro.value.getCurrentStep()
            const totalSteps = intro.value._options?.steps?.length || 0

            console.log(`➡️ Manual: current step ${currentStep + 1}/${totalSteps}`)

            // Si currentStep est NaN ou invalide, ignorer (l'intro vient de démarrer)
            if (isNaN(currentStep) || currentStep === undefined || currentStep === null) {
                console.warn("⚠️ Manual: step not initialized yet, ignoring")
                return
            }

            // Si on est sur le dernier step, passer à la page suivante
            if (currentStep >= totalSteps - 1) {
                console.log("➡️ Manual: last step, going to next page")
                goToPage(scenario.value.currentPageIndex + 1)
            } else {
                // Sinon, passer au step suivant
                console.log("➡️ Manual: next step (handled by Intro.js)")
                intro.value.nextStep()
            }
        } else {
            // Pas d'intro actif, passer directement à la page suivante
            console.log("➡️ Manual: next page (no intro active)")
            goToPage(scenario.value.currentPageIndex + 1)
        }
    }

    const prevManualStep = () => {
        if (!scenario.value || scenario.value.control !== "manual") return

        // ✅ Si intro est actif, vérifier si on est sur le premier step
        if (intro.value) {
            const currentStep = intro.value.getCurrentStep()

            console.log(`⬅️ Manual: current step ${currentStep + 1}`)

            // Si on est sur le premier step, revenir à la page précédente
            if (currentStep === 0) {
                console.log("⬅️ Manual: first step, going to previous page")
                goToPage(scenario.value.currentPageIndex - 1)
            } else {
                // Sinon, revenir au step précédent
                console.log("⬅️ Manual: previous step (handled by Intro.js)")
                intro.value.previousStep()
            }
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
     * Project detail navigation
     * ---------------------------------- */
    const continueFromProject = async () => {
        if (!scenario.value || !scenario.value.isInProjectDetail) return

        console.log("⬅️ Returning from project detail to projects page")

        scenario.value.isInProjectDetail = false

        // Retourner à la page projets
        await router.push({ path: "/projets", query: route.query })
        await nextTick()

        // Reprendre l'intro si on a un intro actif
        if (intro.value) {
            // Passer au step suivant (le prochain projet ou la fin)
            intro.value.nextStep()

            // Reprendre le timer si on était en mode auto
            if (scenario.value.control === "auto") {
                resume()
            }
        }
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
        if (!scenario.value) {
            console.error(`❌ No scenario, cannot start intro for "${id}"`)
            return
        }

        if (isNavigating) {
            console.warn(`⚠️ Still navigating, skipping intro start for "${id}"`)
            return
        }

        const expectedPageId = getCurrentPageId()
        if (id !== expectedPageId) {
            console.log(`⏭️ Skipping "${id}" (expected: "${expectedPageId}")`)
            return
        }

        // Attendre que les steps soient enregistrés (avec retry)
        let entry = registeredSteps.value.find(s => s.id === id)
        if (!entry || entry.steps.length === 0) {
            console.log(`⏳ Waiting for steps to be registered for "${id}"...`)
            const maxRetries = 10
            let retries = 0
            while (retries < maxRetries && (!entry || entry.steps.length === 0)) {
                await new Promise(resolve => setTimeout(resolve, 100))
                entry = registeredSteps.value.find(s => s.id === id)
                retries++
            }

            if (!entry || entry.steps.length === 0) {
                console.error(`❌ No steps found for "${id}" after ${maxRetries} retries. Registered pages:`, registeredSteps.value.map(s => s.id))
                return
            }
            console.log(`✅ Steps registered after ${retries * 100}ms`)
        }

        await nextTick()

        // Wait for DOM to be ready
        const firstElement = entry.steps[0]?.element
        if (firstElement) {
            console.log(`🔍 Waiting for element: ${firstElement}`)
            const maxWait = 20 // Augmenté à 20 tentatives = 1 seconde
            let attempts = 0
            while (attempts < maxWait && !document.querySelector(firstElement)) {
                await new Promise(resolve => setTimeout(resolve, 50))
                attempts++
            }
            if (attempts >= maxWait) {
                console.error(`❌ Element "${firstElement}" not found after ${maxWait * 50}ms`)
                return
            }
            console.log(`✅ Element found after ${attempts * 50}ms`)
        }

        console.log(`🎬 Starting intro for "${id}" with ${entry.steps.length} steps`)

        // Réinitialiser le flag de complétion
        isIntroCompleted = false

        const Intro = await loadIntro()
        intro.value = typeof Intro.tour === "function" ? Intro.tour() : Intro()

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

        intro.value.onbeforechange(async function(this: IntroInstance, targetElement: HTMLElement | null) {
            if (!scenario.value) return

            // Détecter si on est sur la page projets et si le step actuel est un projet avec mode [in]
            if (id === "projects" && scenario.value.projectsToShow.length > 0) {
                const currentStepIndex = this.getCurrentStep()

                // Le premier step est le hero de la page projets, donc les projets commencent à l'index 1
                const projectIndex = currentStepIndex - 1

                if (projectIndex >= 0 && projectIndex < scenario.value.projectsToShow.length) {
                    const project = scenario.value.projectsToShow[projectIndex]

                    // Si le projet a le mode [in], on doit naviguer vers la page du projet
                    if (project.mode === "in") {
                        console.log(`📍 Entering project detail: ${project.slug}`)
                        scenario.value.currentProjectIndex = projectIndex
                        scenario.value.isInProjectDetail = true

                        // Pause l'intro
                        pause()

                        // Naviguer vers la page du projet
                        await router.push(`/projets/${project.slug}`)

                        // Arrêter temporairement l'intro (on reprendra après)
                        return false
                    }
                }
            }
        })

        intro.value.oncomplete(() => {
            console.log(`✅ Completed intro for "${id}"`)
            // ✅ Quand tous les steps de la page sont terminés
            if (scenario.value?.control === "auto") {
                // En mode auto, passer automatiquement à la page suivante
                goToNextPage()
            } else if (scenario.value?.control === "manual") {
                // En mode manual, marquer l'intro comme complété
                // L'utilisateur appuiera sur → pour passer à la page suivante
                isIntroCompleted = true
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
        prevManualStep,
        continueFromProject
    }
}
