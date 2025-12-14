<template>
    <NuxtLayout>
        <header id="hero" class="h-screen flex items-center justify-center relative">
            <div ref="heroContent" class="text-center z-10 .introHeroContent">
                <h1 ref="heroTitle" class="text-6xl md:text-8xl font-bold mb-6 opacity-0">
                    <span class="text-rose-500 dark:text-rose-400">Maxence</span><br>
                    <span class="dark:text-white">Bessi</span>
                </h1>
                <p ref="heroSubtitle" class="text-xl md:text-2xl text-gray-800 dark:text-gray-300 mb-8 opacity-0">
                    Développeur Full Stack & Passionné
                </p>
                <RouterLink to="/projets">
                    <template #default>
                        <button ref="heroButton"
                            class="bg-rose-600 hover:bg-rose-700 px-8 py-3 rounded-lg font-semibold transition-colors opacity-0 text-white">
                            Voir mes projets
                        </button>
                    </template>
                </RouterLink>
            </div>
            <div ref="heroBackground" class="absolute inset-0 opacity-20">
                <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-800 dark:bg-rose-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-800 dark:bg-purple-500 rounded-full blur-3xl"></div>
            </div>
        </header>
        <section id="about" class="py-40 relative overflow-hidden">
            <div class="container mx-auto px-6 relative z-10">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div ref="aboutContent" class="space-y-6">
                        <div class="overflow-hidden">
                            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-rose-500 dark:text-rose-400 transform translate-y-full opacity-0"
                                ref="aboutTitle">
                                A Propos de Moi
                            </h2>
                        </div>
                        <div class="space-y-6">
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText1">
                                Développeur web spécialisé dans la conception d'applications performantes et fiables,
                                pensées pour répondre efficacement à des besoins concrets et métiers.
                            </p>
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText2">
                                Grâce à des technologies modernes comme Nuxt, TypeScript et Spring Boot,
                                je livre des solutions robustes, évolutives et maintenables, avec un fort souci de qualité et de pérennité.
                            </p>
                        </div>
                        <!-- Animated Skills Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CardAbout ref="skill1" class="skill-card">
                                <h4
                                    class="font-semibold text-rose-500 dark:text-rose-400 mb-2 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors">
                                    Frontend</h4>
                                <p class="text-gray-800 dark:text-gray-300 text-sm">Vue/Nuxt, Typescript, TailwindCss</p>
                            </CardAbout>
                            <CardAbout ref="skill2" class="skill-card">
                                <h4
                                    class="font-semibold text-rose-500 dark:text-rose-400 mb-2 group-hover:text-rose-500 dark:group-hover:text-rose-300 transition-colors">
                                    Backend</h4>
                                <p class="text-gray-800 dark:text-gray-300 text-sm">Node.js, Java, Spring, Docker</p>
                            </CardAbout>
                        </div>
                        <div class="flex space-x-8 mt-8">
                            <div class="metric-item transform translate-y-8 opacity-0" ref="metric1">
                                <div class="text-2xl font-bold text-rose-500 dark:text-rose-400">{{ (new Date()).getFullYear() - (new
                                    Date(about.devYearsStart)).getFullYear() }}+</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Ans d'apprentissage</div>
                            </div>
                            <div class="metric-item transform translate-y-8 opacity-0" ref="metric2">
                                <div class="text-2xl font-bold text-rose-500 dark:text-rose-400">{{ projects.length }}+</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Projets réalisés</div>
                            </div>
                        </div>
                    </div>
                    <div ref="aboutImage" class="relative group scale-90 lg:scale-100">
                        <div
                            class="relative w-full h-96 transform rotate-3 group-hover:rotate-6 transition-transform duration-700">
                            <div
                                class="absolute inset-0 bg-gradient-to-br from-rose-600 via-purple-600 to-pink-600 rounded-2xl transform rotate-6 opacity-80 group-hover:rotate-12 transition-all duration-700">
                            </div>
                            <div
                                class="absolute inset-0 bg-gradient-to-tl from-purple-600 via-rose-600 to-cyan-600 rounded-2xl opacity-60 group-hover:opacity-80 transition-all duration-500">
                            </div>
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
        <section id="projects"
            class="min-h-screen w-screen flex items-center justify-center py-40 relative overflow-hidden">
            <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center h-full">
                <div class="w-full md:w-1/2 h-full flex flex-col justify-center items-start pr-0 md:pr-12 z-10">
                    <h2 ref="projectsTitle" class="text-4xl md:text-5xl font-bold mb-8 text-rose-500 dark:text-rose-400">Mes Projets</h2>
                    <div v-for="(project, idx) in sortedProjects" :key="project.name" v-show="idx === currentProject"
                        class="group">
                        <div
                            class="project-card relative overflow-hidden bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:border-rose-400 transition-all duration-300">
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            </div>
                            <div class="relative z-10 w-full min-w-80">
                                <h3 class="text-2xl font-semibold dark:text-white mb-2">{{ project.name }}</h3>
                                <p class="text-gray-800 dark:text-gray-300 mb-4">{{ project.description }}</p>
                                <div class="flex flex-wrap gap-2 mb-4">
                                    <span v-for="tag in project.techs" :key="tag"
                                        class="bg-rose-500/20 text-rose-800 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-medium">
                                        {{ tag }}
                                    </span>
                                </div>
                                <RouterLink v-if="project.slug" :to="`/projets/${project.slug}`"
                                    class="inline-block mt-2 text-rose-500 dark:text-rose-400 hover:underline font-semibold">
                                    Voir le projet &rarr;
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-4 mt-8">
                        <button @click="toggleAutoRotate"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-rose-500 transition-colors text-white text-xl">
                            <UIcon v-if="isAutoRotateEnabled" name="ic-outline-motion-photos-auto" />
                            <UIcon v-else name="ic-outline-motion-photos-pause" />
                        </button>
                        <button @click="() => { prevProject(); stopAutoRotate(); isAutoRotateEnabled = false }"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-rose-500 transition-colors text-white text-xl">
                            <UIcon name="material-symbols-keyboard-double-arrow-left" />
                        </button>
                        <button @click="() => { nextProject(); stopAutoRotate(); isAutoRotateEnabled = false }"
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-rose-500 transition-colors text-white text-xl">
                            <UIcon name="material-symbols-keyboard-double-arrow-right" />
                        </button>
                    </div>
                </div>
                <div class="w-full md:w-1/2 h-full flex items-center justify-center relative z-10 mt-12 md:mt-0">
                    <transition name="fade" mode="out-in">
                        <img v-if="sortedProjects[currentProject]?.previewImage"
                            :src="sortedProjects[currentProject].previewImage"
                            :alt="sortedProjects[currentProject].name"
                            :key="sortedProjects[currentProject].previewImage"
                            class="rounded-2xl shadow-2xl object-cover w-[28rem] max-h-[22rem] md:w-[32rem] md:max-h-[28rem] transition-all duration-700" />
                        <!-- <div v-else
                            class="w-[28rem] h-[22rem] md:w-[32rem] md:h-[28rem] bg-gray-700 rounded-2xl flex items-center justify-center text-gray-400 text-xl">
                            Pas d'image
                        </div> -->
                    </transition>
                </div>
            </div>
            <div ref="heroBackground" class="absolute inset-0 opacity-20">
                <div class="absolute top-[15%] left-[15%] w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-[15%] right-1/4 w-64 h-64 bg-rose-500 rounded-full blur-3xl"></div>
            </div>
        </section>
        <section id="career" class="min-h-[75vh] py-40 relative overflow-hidden flex items-center justify-center">
            <div ref="careerTimeline" class="container mx-auto px-6 relative z-10 flex flex-col items-center mx-auto">
                <div class="mb-12 text-center">
                    <h2 ref="careerTitle" class="text-4xl md:text-5xl font-bold text-rose-500 dark:text-rose-400 mb-4">Mon Parcours</h2>
                    <p class="text-lg text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
                        Découvrez mon évolution professionnelle.
                    </p>
                </div>
                <div class="w-96">
                    <UTimeline :items="about.careers" :default-value="about.careers.length - 1" size="xs"
                        :ui="{ item: 'lg:even:flex-row-reverse lg:even:-translate-x-[calc(100%-1.5rem)] lg:even:text-right' }"
                        class="lg:translate-x-[calc(50%-1rem)]">
                        <template #title="{ item }">
                            <div class="flex justify-between gap-2">
                                <span>{{ item.status }}</span>
                                <span class="text-muted text-sm">
                                    {{ item.start }}
                                    -
                                    {{ item.end ? item.end : 'En cours' }}
                                </span>
                            </div>
                        </template>
                        <template #description="{ item }">
                            <div class="text-start">
                                <a v-if="item.link" :href="item.link" target="_blank"
                                    class="text-rose-500 dark:text-rose-400 hover:underline">
                                    {{ item.from }}
                                </a>
                                <span v-else>{{ item.from }}</span>
                            </div>
                            <CardAbout class="my-2 text-start text-gray-800 dark:text-gray-300">
                                {{ item.description }}
                            </CardAbout>
                        </template>
                    </UTimeline>
                </div>
            </div>
            <div class="absolute top-1/4 right-[15%] w-44 h-44 bg-rose-500 rounded-full blur-3xl"></div>
            <div class="absolute bottom-1/4 left-[15%] w-44 h-44 bg-purple-500 rounded-full blur-3xl"></div>
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '~/assets/data/about';

defineMeta({
    title: "Maxence Bessi - Développeur FullStack",
    description: "Maxence Bessi, développeur full-stack, passionné, spécialisé dans la création d'applications et l'exploration de technologies variées pour proposer des solutions performantes et innovantes.",
    image: {
        component: "Base",
        props: {
            headline: "Portfolio",
            title: "Maxence Bessi",
            description: "Développeur full-stack et passionné, toujours en quête d'amélioration et de nouvelles compétences."
        }
    }
})
import { useIntro } from '~/services/useIntro.client';
const { startIfEnabled } = useIntro();

// Template refs
const heroContent = useTemplateRef("heroContent");
const heroTitle = useTemplateRef("heroTitle");
const heroSubtitle = useTemplateRef("heroSubtitle");
const heroButton = useTemplateRef("heroButton");
const heroBackground = useTemplateRef("heroBackground");
const aboutContent = useTemplateRef("aboutContent");
const projectsTitle = useTemplateRef("projectsTitle");
const careerTitle = useTemplateRef("careerTitle");
const careerTimeline = useTemplateRef("careerTimeline");

import {
    projects
} from "~/assets/data/projects";

const sortedProjects = computed(() => {
    return projects.slice().sort((a, b) => {
        // Projets en dev en haut
        if (a.date === 'dev' && b.date !== 'dev') return -1
        if (b.date === 'dev' && a.date !== 'dev') return 1

        // Convertir en Date pour les autres projets
        const dateA = a.date === 'dev' ? new Date() : new Date(a.date)
        const dateB = b.date === 'dev' ? new Date() : new Date(b.date)

        return dateB.getTime() - dateA.getTime()
    })
})

const currentProject = ref(0);
let autoRotateInterval: number | undefined;
const isAutoRotateEnabled = ref(true);

function nextProject() {
    currentProject.value = (currentProject.value + 1) % sortedProjects.value.length;
}

function prevProject() {
    currentProject.value =
        (currentProject.value - 1 + sortedProjects.value.length) % sortedProjects.value.length;
}

function startAutoRotate() {
    stopAutoRotate();
    autoRotateInterval = window.setInterval(() => {
        nextProject();
    }, 10 * 1000);
}

function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = undefined;
    }
}

function toggleAutoRotate() {
    isAutoRotateEnabled.value = !isAutoRotateEnabled.value;
    if (isAutoRotateEnabled.value) {
        startAutoRotate();
    } else {
        stopAutoRotate();
    }
}

onMounted(async () => {
    startAutoRotate()
    gsap.registerPlugin(ScrollTrigger)

    // Hero animations
    const tl = gsap.timeline()
    tl
        .to(heroTitle.value, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(heroSubtitle.value, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to(heroButton.value, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    // Background animations
    gsap.to(heroBackground.value?.children || [], {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    })

    // About section animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: aboutContent.value,
            start: "top 80%",
            end: "bottom 20%"
        }
    })

    // Animate about title
    aboutTl
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
        .fromTo(".metric-item",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
        );

    // Projects animation
    const projectsTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
            end: "bottom 20%",
        }
    })

    // Animate projects title
    projectsTl.fromTo(
        projectsTitle.value,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )

    // Animate carousel controls
    projectsTl.fromTo(
        "#projects .flex.space-x-4.mt-8 button",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
    )
    // Animate project card
    projectsTl.fromTo(
        ".project-card",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" },
        "-=0.5"
    )

    // Timeline animation for new design (career section)
    gsap.fromTo(
        "#career .skill-item",
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: careerTitle.value,
                start: "top 80%",
            }
        }
    );

    // Gestion intro animation
    await startIfEnabled([
        {
            element: heroContent.value as HTMLElement,
            intro: "Bienvenue sur mon portfolio ! Je suis Maxence Bessi, développeur Full Stack passionné.",
            title: "Présentation"
        },
        {
            element: aboutContent.value as HTMLElement,
            intro: "Découvrez mon parcours, mes compétences et les technologies que j'utilise au quotidien.",
            title: "À propos de moi"
        },
        {
            element: careerTimeline.value as HTMLElement,
            intro: "Voici mon parcours professionnel, de mes débuts à aujourd'hui.",
            position: "bottom",
            title: "Mon parcours"
        }
    ], Number(useRoute().query.duration) || 10_000, "/a-propos");
});
onUnmounted(() => {
    stopAutoRotate()
})

</script>

<style scoped>
.timeline-item::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 50px;
    width: 2px;
    height: calc(100% - 50px);
    background: #374151;
}

.timeline-item:last-child::before {
    display: none;
}
</style>