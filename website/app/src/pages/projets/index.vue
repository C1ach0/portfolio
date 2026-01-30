<template>
    <NuxtLayout>
        <section id="about"
            class="min-h-screen flex flex-col items-center py-20 justify-center relative overflow-hidden">
            <div ref="projectHero" class="container mx-auto px-6 relative z-10">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div ref="projectContent" class="space-y-6">
                        <div class="overflow-hidden">
                            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-rose-500 dark:text-rose-400 transform translate-y-full opacity-0"
                                ref="aboutTitle">
                                Mes Projets
                            </h2>
                        </div>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText1">
                                Découvrez une sélection de projets réalisés tout au long de mon parcours,
                                illustrant ma capacité à répondre à des problématiques variées et à relever des défis techniques concrets.
                            </p>
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText2">
                                Applications web, outils métiers ou contributions open source,
                                chaque projet met en avant des solutions pensées pour la performance,
                                la maintenabilité et l'innovation.
                            </p>
                        </div>
                        <!-- Animated Skills Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CardAbout ref="skill1" class="skill-card">
                                <h4
                                    class="font-semibold text-rose-500 dark:text-rose-400 mb-2 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors">
                                    Projets</h4>
                                <p class="text-gray-800 dark:text-gray-300 text-sm">{{ projects.length }} réalisations</p>
                            </CardAbout>
                            <CardAbout v-if="about.links.github" ref="skill1" class="skill-card">
                                <h4
                                    class="font-semibold text-rose-500 dark:text-rose-400 mb-1 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors">
                                    GitHub</h4>
                                <a :href="about.links.github" target="_blank"
                                    class="text-sm text-rose-500 dark:text-rose-400 hover:underline">
                                    Aller sur GitHub &rarr;
                                </a>
                            </CardAbout>
                        </div>
                    </div>
                    <div ref="projectImage" class="relative group scale-90 lg:scale-100 mx-4">
                        <div
                            class="relative w-full h-96 transform rotate-3 group-hover:rotate-6 transition-transform duration-700">
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-rose-600 via-purple-600 to-pink-600 rounded-2xl transform rotate-6 opacity-80 group-hover:rotate-12 transition-all duration-700">
                            </div>
                            <img :src="ogImageDisplay" class="absolute h-96 w-full object-cover object-center inset-0 rounded-2xl opacity-60 group-hover:opacity-80 transition-all duration-500"/>
                        </div>
                        <div
                            class="absolute -top-4 -right-4 w-24 h-24 bg-rose-500/20 rounded-full blur-xl animate-pulse">
                        </div>
                        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"
                            style="animation-delay: 1s;"></div>
                        <div class="absolute top-8 right-8 w-4 h-4 bg-rose-400 rotate-45 animate-bounce"
                            style="animation-delay: 0.5s;"></div>
                        <div class="absolute bottom-8 left-8 w-3 h-3 bg-purple-400 rounded-full animate-ping"
                            style="animation-delay: 1.5s;"></div>
                        <div class="absolute -top-6 left-1/4 tech-float">
                            <div
                                class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                Vue
                            </div>
                        </div>
                        <div class="absolute -right-6 top-1/3 tech-float" style="animation-delay: 0.8s;">
                            <div
                                class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                TS
                            </div>
                        </div>
                        <div class="absolute -bottom-6 right-1/4 tech-float" style="animation-delay: 1.2s;">
                            <div
                                class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                Java
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-20 px-6 max-w-screen-2xl mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="(project, index) in sortedProjects" :key="index" :id="`p_${project.slug}`" :data-intro-id="`project-${project.slug}`" class="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100/70 to-gray-200/60 dark:from-gray-800/70 dark:to-gray-900/60 border border-gray-100 dark:border-gray-700 hover:border-rose-500/50 shadow-md hover:shadow-rose-500/10 transition-all duration-300 group relative flex flex-col justify-between">
                    <RouterLink :to="`/projets/${project.slug}`" class="absolute inset-0 z-10"
                        aria-label="Aller au projet" />
                    <div class="p-5 relative z-20 flex flex-col flex-1">
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        </div>
                        <div class="flex items-center justify-between mb-2">
                            <h3
                                class="text-xl font-bold transition-colors duration-300">
                                {{ project.name }}
                            </h3>
                            <h2 class="text-sm text-gray-500 dark:text-gray-300">{{ from(project.devFrom) }}</h2>
                            
                        </div>
                        <p class="text-gray-800 dark:text-gray-300 text-sm mt-2 flex-1">
                            {{ project.description }}
                        </p>
                        <div class="flex flex-wrap gap-2 mt-3">
                            <span v-for="tag in project.techs" :key="tag"
                                class="bg-rose-500/20 text-rose-500 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-medium">
                                {{ tag }}
                            </span>
                        </div>
                        <div class="mt-4">
                            <RouterLink :to="`/projets/${project.slug}`"
                                class="inline-block bg-rose-500/10 text-rose-500 dark:text-rose-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-rose-500/20 transition-colors duration-300"
                                @click.stop>
                                Voir le projet
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <IntroPage intro-id="projects" :steps="[]"/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '~/assets/data/projects';
import { about } from '~/assets/data/about';

defineMeta({
    title: "Maxence Bessi - Développeur FullStack",
    description: "Maxence Bessi, développeur passionné, spécialisé dans la création d'applications et l'exploration de technologies variées pour proposer des solutions performantes et innovantes.",
    image: {
        component: "Base",
        props: {
            colorMode: "light",
            headline: "Portfolio",
            title: "Maxence Bessi",
            description: "Découvrez mes réalisations : des projets variés alliant créativité, performance et technologies modernes."
        }
    }
})

const ogImageDisplay = ref("/__og-image__/image/og.png");
const route = useRoute();
const { scenario, registerSteps } = useIntro();

const from = (devFrom: string|undefined) => {
    return {
        "home": "Personnel",
        "school": "Scolaire",
        "work": "Professionnel"
    }[devFrom || "home"];
}

const projectContent = useTemplateRef("projectContent");
const hovered = ref<number | null>(null)

// 👑 Animation au hover
watch(hovered, async (newVal, oldVal) => {
    if (typeof newVal === 'number') {
        await nextTick()
        const el = document.querySelector(`.project-${newVal}`) as HTMLElement
        if (el) {
            gsap.killTweensOf(el)
            gsap.fromTo(
                el,
                { height: 0, opacity: 0 },
                { height: el.scrollHeight, opacity: 1, duration: 0.4, ease: 'power2.out' }
            )
        }
    }
    if (typeof oldVal === 'number' && oldVal !== newVal) {
        const el = document.querySelector(`.project-${oldVal}`) as HTMLElement
        if (el) {
            gsap.killTweensOf(el)
            gsap.to(el, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            })
        }
    }
})

const sortedProjects = computed(() => {
    return projects.slice().sort((a, b) => {
        if (a.date === 'dev' && b.date !== 'dev') return -1
        if (b.date === 'dev' && a.date !== 'dev') return 1

        const dateA = a.date === 'dev' ? new Date() : new Date(a.date)
        const dateB = b.date === 'dev' ? new Date() : new Date(b.date)

        return dateB.getTime() - dateA.getTime()
    })
})

onMounted(async () => {
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger)

    const projectTl = gsap.timeline({
        scrollTrigger: {
            trigger: projectContent.value,
            start: "top 80%",
            end: "bottom 20%"
        }
    })

    projectTl
        .fromTo("#about h2",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo("#about p",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" },
            "-=0.4"
        )
        .fromTo(".skill-card",
            { opacity: 0, y: 40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.7)" },
            "-=0.3"
        )

    // Si on est en mode intro, construire les steps dynamiquement
    if (route.query.intro === 'start') {
        // Attendre un peu que le DOM soit prêt
        await nextTick()
        await new Promise(resolve => setTimeout(resolve, 100))

        const steps: any[] = []

        // Premier step : la section hero
        steps.push({
            element: "#about",
            intro: "Découvrez mes projets phares, illustrant ma passion pour le développement et l'innovation technologique.",
            title: "Mes Projets"
        })

        // Steps pour chaque projet listé dans la query
        const projectSlugs = String(route.query.projects || "").split(',').filter(Boolean)

        for (const slug of projectSlugs) {
            // Ignorer home, about (ce sont des pages, pas des projets)
            if (slug === 'home' || slug === 'about') continue

            // Nettoyer le slug (enlever [in]/[out])
            const cleanSlug = slug.replace(/\[(in|out)\]/, '')

            const project = sortedProjects.value.find(p => p.slug === cleanSlug)
            if (project) {
                // Vérifier que l'élément existe
                const element = document.querySelector(`#p_${project.slug}`)
                if (element) {
                    const mode = slug.includes('[in]') ? 'in' : 'out'
                    const modeLabel = mode === 'in' ? ' (cliquez pour explorer)' : ''

                    steps.push({
                        element: `#p_${project.slug}`,
                        intro: project.description.split('.')[0] + '.' + modeLabel,
                        title: project.name
                    })
                }
            }
        }

        console.log(`📝 Registering ${steps.length} steps for projects page`)
        await registerSteps('projects', steps)
    }
});
</script>