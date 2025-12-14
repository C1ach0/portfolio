import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"

export const useIntro = () => {
    const intro = ref<any | null>(null)

    if (import.meta.server) {
        return {
            intro,
            startIfEnabled: async () => { },
            pause: () => { },
            resume: () => { },
            stop: () => { }
        }
    }

    const route = useRoute()
    const router = useRouter()

    let isPaused = false
    let timer: ReturnType<typeof setTimeout> | null = null
    let introJs: any = null

    const loadIntro = async () => {
        if (introJs) return introJs
        const mod = await import("intro.js")
        introJs = mod.default
        return introJs
    }

    const autoNext = (delay = 3500) => {
        if (isPaused || !intro.value) return

        timer = setTimeout(() => {
            intro.value!.nextStep()
            autoNext(delay)
        }, delay)
    }

    const clearTimer = () => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    const pause = () => {
        isPaused = true
        clearTimer()
    }

    const resume = () => {
        if (!isPaused) return
        isPaused = false
        autoNext()
    }

    const stop = () => {
        clearTimer()
        isPaused = false
        intro.value?.exit()
    }

    const startIfEnabled = async (
        steps: any[],
        nextDelay?: number,
        nextPath?: string
    ) => {
        if (route.query.intro !== "true") return

        // 🐾 attendre DOM + hydration
        await nextTick()

        const introJs = await loadIntro()

        if (!intro.value) {
            intro.value = introJs()
        }

        intro.value.setOptions({
            steps,
            showBullets: false,
            showButtons: false,
            exitOnOverlayClick: false,
            exitOnEsc: false,
            disableInteraction: true,
            overlayOpacity: 0.65
        })

        intro.value.start()
        autoNext(nextDelay)

        if (nextPath) {
            intro.value.onComplete(() => {
                router.push({
                    path: nextPath,
                    query: { ...route.query, intro: "true" }
                })
            })
        }
    }

    const onKeydown = (e: KeyboardEvent) => {
        if (route.query.intro !== "true") return

        switch (e.key.toLowerCase()) {
            case "p":
                pause()
                break
            case "r":
                resume()
                break
            case "s":
                stop()
                break
        }
    }

    onMounted(() => {
        window.addEventListener("keydown", onKeydown)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", onKeydown)
        clearTimer()
    })

    return {
        intro,
        startIfEnabled,
        pause,
        resume,
        stop
    }
}
