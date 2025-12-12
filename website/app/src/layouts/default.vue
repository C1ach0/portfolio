<template>
    <nav ref="navbar"
        class="fixed top-0 w-full z-50 bg-slate-50/80 border-slate-50 dark:bg-black/80 backdrop-blur-sm border-b dark:border-black">
        <div class="container mx-auto px-6 py-4">
            <div class="flex justify-between items-center">
                <RouterLink to="/" class="text-2xl font-bold text-rose-500 dark:text-rose-400">
                    Maxence Bessi
                </RouterLink>
                <!-- Color Mode -->
                <div class="flex gap-5 items-center">
                    <UButton :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="ghost"
                        @click="isDark = !isDark" />
                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex space-x-8 dark:text-white">
                        <RouterLink to="/" class="nav-link hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer">
                            Accueil
                        </RouterLink>
                        <RouterLink to="/a-propos"
                            class="nav-link hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer">
                            A Propos
                        </RouterLink>
                        <RouterLink to="/projets" class="nav-link hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer">
                            Projets
                        </RouterLink>
                        <RouterLink to="/contact" class="nav-link hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer">
                            Contact
                        </RouterLink>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div ref="mobileMenu" v-show="isMenuOpen"
                        class="absolute top-full text-white left-0 w-full bg-black/95 backdrop-blur-sm border-b border-black md:hidden overflow-hidden">
                        <div class="flex flex-col space-y-4 px-6 py-4">
                            <RouterLink @click="isMenuOpen = false" to="/"
                                class="nav-link hover:text-rose-400 transition-colors cursor-pointer">
                                Accueil
                            </RouterLink>
                            <RouterLink @click="isMenuOpen = false" to="/a-propos"
                                class="nav-link hover:text-rose-400 transition-colors cursor-pointer">
                                A Propos
                            </RouterLink>
                            <RouterLink @click="isMenuOpen = false" to="/projets"
                                class="nav-link hover:text-rose-400 transition-colors cursor-pointer">
                                Projets
                            </RouterLink>
                            <RouterLink @click="isMenuOpen = false" to="/contact"
                                class="nav-link hover:text-rose-400 transition-colors cursor-pointer">
                                Contact
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <main class="min-h-screen bg-white dark:bg-black text-white overflow-x-hidden">
        <slot />
    </main>
    <footer id="contact" v-if="showFooter" class="py-20 bg-slate-50/80 dark:bg-black">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-8 text-rose-400">Travaillons ensemble</h2>
            <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
                Je suis toujours intéressé par de nouvelles opportunités et des projets passionnants.
                Discutons de la façon dont nous pouvons donner vie à vos idées.
            </p>
            <div class="flex justify-center space-x-6 mb-8">
                <a v-if="about.links.email" :href="`mailto:${about.links.email}`" target="_blank"
                    class="contact-link bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Email
                </a>
                <a v-if="about.links.linkedin" :href="about.links.linkedin" target="_blank"
                    class="contact-link border border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    LinkedIn
                </a>
            </div>
            <div class="py-10 flex flex-wrap gap-4 items-center justify-center">
                <a v-if="about.links.github" :href="about.links.github" target="_blank"
                    class="rounded-lg w-10 h-10 flex flex-col items-center justify-center hover:scale-105 ease-in duration-150 bg-white">
                    <UIcon name="mdi-github" class="w-7 h-7 text-black" />
                </a>
                <a v-if="about.links.linkedin" :href="about.links.linkedin" target="_blank"
                    class="rounded-lg w-10 h-10 flex flex-col items-center justify-center hover:scale-105 ease-in duration-150 bg-blue-500">
                    <UIcon name="mdi-linkedin" class="w-7 h-7" />
                </a>
                <a v-if="about.links.x" :href="about.links.x" target="_blank"
                    class="rounded-lg w-10 h-10 flex flex-col items-center justify-center hover:scale-105 ease-in duration-150 bg-white">
                    <UIcon name="ri-twitter-x-fill" class="w-7 h-7 text-black" />
                </a>
                <a v-if="about.links.discord" :href="about.links.discord" target="_blank"
                    class="rounded-lg w-10 h-10 flex flex-col items-center justify-center hover:scale-105 ease-in duration-150 bg-blue-600">
                    <UIcon name="ic-baseline-discord" class="w-7 h-7" />
                </a>
            </div>
            <p class="text-gray-500 text-sm">
                Développé par <strong>Maxence Bessi</strong>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '~/assets/data/about';

const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set(_isDark) {
        colorMode.preference = _isDark ? 'dark' : 'light'
    }
})

const showFooter = useState('showFooter', () => true);

const navbar = useTemplateRef("navbar");
const mobileMenu = useTemplateRef("mobileMenu");

const isMenuOpen = ref(false);

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Navbar background on scroll
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: "bg-black/95", targets: navbar.value }
    })

    // Mobile menu animation
    // Init mobile menu state
    if (mobileMenu.value) {
        gsap.set(mobileMenu.value, { height: 0, autoAlpha: 0 })
    }

    watch(isMenuOpen, (open) => {
        if (!mobileMenu.value) return

        if (open) {
            gsap.to(mobileMenu.value, {
                height: "auto",
                autoAlpha: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        } else {
            gsap.to(mobileMenu.value, {
                height: 0,
                autoAlpha: 0,
                duration: 0.3,
                ease: "power2.in"
            })
        }
    })
});
</script>

<style scoped>
.nav-link {
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    transition: width 0.3s ease;
    background-color: var(--color-rose-500);
}

.nav-link:hover::after {
    width: 100%;
}
</style>