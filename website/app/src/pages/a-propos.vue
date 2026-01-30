<template>
    <NuxtLayout>
        <section id="about"
            class="min-h-screen flex flex-col items-center py-20 justify-center relative overflow-hidden">
            <div class="container mx-auto px-6 relative z-10">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div ref="aboutContent" class="space-y-6" data-intro-id="about-content">
                        <div class="overflow-hidden">
                            <h2 class="text-4xl md:text-5xl font-bold mb-6 text-rose-500 dark:text-rose-400 transform translate-y-full opacity-0"
                                ref="aboutTitle">
                                A Propos de Moi
                            </h2>
                        </div>
                        <div class="space-y-3">
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText1">
                                Développeur spécialisé dans la création d'applications modernes et variées,
                                j'interviens sur des projets aux problématiques diverses en m'appuyant sur des technologies actuelles
                                et des pratiques éprouvées.
                            </p>
                            <p class="text-lg text-gray-800 dark:text-gray-300 leading-relaxed transform translate-y-8 opacity-0"
                            ref="aboutText2">
                                Grâce à un parcours mêlant auto-apprentissage, formation et projets concrets,
                                j'ai développé une expertise solide me permettant de concevoir des applications performantes,
                                innovantes et centrées sur la qualité ainsi que l'expérience utilisateur.
                            </p>
                        </div>

                        <!-- Animated Skills Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CardAbout ref="skill1" class="skill-card">
                                <h4
                                    class="font-semibold text-rose-500 dark:text-rose-400 mb-2 group-hover:text-rose-300 transition-colors">
                                    Frontend</h4>
                                <p class="text-gray-800 dark:text-gray-300 text-sm">Vue/Nuxt, Typescript, TailwindCss</p>
                            </CardAbout>
                            <CardAbout ref="skill2" class="skill-card">
                                <h4
                                    class="font-semibold text-rose-500 dark:text-rose-400 mb-2 group-hover:text-rose-300 transition-colors">
                                    Backend</h4>
                                <p class="text-gray-800 dark:text-gray-300 text-sm">Node.js, Java, Spring, Docker</p>
                            </CardAbout>
                        </div>
                        <div class="flex space-x-8 mt-8">
                            <div class="metric-item transform translate-y-8 opacity-0" ref="metric1">
                                <div class="text-2xl font-bold text-rose-500 dark:text-rose-400">{{ (new Date()).getFullYear() - (new
                                    Date(about.devYearsStart)).getFullYear() }}+</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">Ans de pratique</div>
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
                            <img src="~/assets/data/images/face.jpg" class="absolute h-96 w-full object-cover object-center inset-0 rounded-2xl opacity-60 group-hover:opacity-80 transition-all duration-500"/>
                            <!-- <div
                                class="absolute inset-0 bg-gradient-to-tl from-purple-600 via-rose-600 to-cyan-600 rounded-2xl opacity-60 group-hover:opacity-80 transition-all duration-500">
                            </div> -->
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
        <section id="skills" class="py-10 flex flex-col items-center justify-center mx-2">
            <div ref="skillContent" class="max-w-screen-sm mx-auto flex flex-wrap gap-3 items-center justify-center" data-intro-id="skill-content">
                <UIcon v-for="skill in about.skills" :key="skill" :name="`skill-icons:${skill}`" class="h-10 w-10"/>
            </div>
            <p class="text-sm text-mutted text-center">...</p>
        </section>
        <section id="career" class="py-40 relative overflow-hidden flex items-center justify-center">
            <div class="container mx-auto px-6 relative z-10 flex flex-col items-center">
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
                                    class="text-rose-400 hover:underline">
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
        <section id="school" class="py-40 relative overflow-hidden flex items-center justify-center">
            <div ref="schoolSection" class="container mx-auto px-6 relative z-10 flex flex-col items-center" data-intro-id="school-section">
                <div class="mb-12 text-center">
                    <h2 ref="schoolTitle" class="text-4xl md:text-5xl font-bold text-rose-500 dark:text-rose-400 mb-4">Mon Education</h2>
                    <p class="text-lg text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
                        Découvrez mon parcours éducatif et les écoles que j'ai fréquentées.
                    </p>
                </div>
                <div class="w-96">
                    <UTimeline :items="about.schools" :default-value="about.schools.length - 1" size="xs"
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
                                    class="text-rose-400 hover:underline">
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
        </section>
        <IntroPage intro-id="about" :steps="introSteps"/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ICS } from "~/models/About.models";
import { projects } from '~/assets/data/projects';
import { about } from '~/assets/data/about';

defineMeta({
    title: "Maxence Bessi - Développeur FullStack",
    description: "Maxence Bessi, développeur passionné, spécialisé dans la création d'applications et l'exploration de technologies variées pour proposer des solutions performantes et innovantes.",
    image: {
        component: "Base",
        props: {
            headline: "Portfolio",
            title: "Maxence Bessi",
            description: "Développeur passionné et curieux, toujours en quête d'amélioration et de nouvelles compétences."
        }
    }
})


const route = useRoute()
const { registerSteps } = useIntro()

// Template refs
const aboutContent = useTemplateRef("aboutContent");
const skillContent = useTemplateRef("skillContent");
const careerTitle = useTemplateRef("careerTitle");
const schoolTitle = useTemplateRef("schoolTitle");
const schoolSection = useTemplateRef("schoolSection");

const careers = ref<ICS[]>([]);
const schools = ref<ICS[]>([]);

const imageUrl = computed(() => {
    return `https://skills-icons.vercel.app/api/icons?i=${
        about.skills.join(',')
    }&perline=10`
})

const introSteps = [
    {
        element: '[data-intro-id="about-content"]',
        intro: "Apprenez-en plus sur moi, mon parcours et mes compétences en développement.",
        title: "À Propos de Moi"
    },
    {
        element: '[data-intro-id="skill-content"]',
        intro: "Découvrez mes compétences techniques et les technologies que je maîtrise.",
        title: "Mes compétences"
    },
    {
        element: '[data-intro-id="school-section"]',
        intro: "Explorez mon parcours éducatif et les institutions qui ont façonné mes connaissances.",
        title: "Mon éducation"
    }
];

onMounted(async () => {
    gsap.registerPlugin(ScrollTrigger)

    // Enregistrer les steps pour l'intro si elle est active
    if (route.query.intro === 'start') {
        await nextTick()
        await new Promise(resolve => setTimeout(resolve, 100))
        await registerSteps('about', introSteps)
        console.log('📝 Registered steps for about page')
    }

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
    gsap.fromTo(
        "#school .skill-item",
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: schoolTitle.value,
                start: "top 80%",
            }
        }
    );
});

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