<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">Mon Portfolio</h1>
                    <p>
                        Ce portfolio est un espace personnel conçu comme une vitrine évolutive de mon parcours de
                        développeur.
                        Il regroupe une sélection de projets réalisés au fil de mon apprentissage et de mes expériences
                        professionnelles.

                        À travers cette plateforme et son blog intégré, je partage mes réalisations, ma méthodologie de
                        travail,
                        mes réflexions techniques et les compétences que j'ai développées. Chaque projet présenté
                        illustre une
                        problématique concrète, une solution technique apportée et une progression continue.
                    </p>
                    <div class="flex items-center justify-center gap-4 lg:gap-10 flex-wrap">
                        <UButton href="https://github.com/c1ach0/portfolio" target="_blank" class="rounded-full">Github
                        </UButton>
                    </div>
                </header>
                <section class="py-20 grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1" />
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Présentation du projet</h2>
                        <p class="text-justify">
                            Ce portfolio a été pensé comme un projet à part entière et non comme une simple vitrine
                            statique.
                            Il centralise mes projets et met en avant ma capacité à structurer une application moderne,
                            maintenable et évolutive.
                        </p>
                        <p class="text-justify">
                            L'objectif principal était de concevoir une interface claire, performante et agréable à
                            parcourir,
                            tout en respectant les bonnes pratiques actuelles en matière d'architecture front-end,
                            d'accessibilité et d'optimisation.
                        </p>
                    </div>
                </section>
                <section class="py-20 grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Stack technique</h2>
                        <p class="text-justify">
                            Le site est développé avec Nuxt 3, permettant de bénéficier du Server-Side Rendering (SSR)
                            et d'une optimisation SEO native. Cette approche améliore les performances perçues
                            et le référencement naturel.
                        </p>
                        <p class="text-justify">
                            L'interface repose sur TailwindCSS avec une approche utility-first, garantissant
                            une cohérence visuelle et une grande rapidité de développement.
                            L'architecture est organisée en composants réutilisables (cartes projets,
                            galerie dynamique, layout global), favorisant la maintenabilité et l'évolutivité.
                        </p>
                        <p class="text-justify">
                            L'utilisation de la Composition API permet une meilleure séparation des responsabilités
                            et une gestion claire de la logique métier.
                        </p>
                    </div>
                    <Galery :images="images2" />
                </section>
                <section class="py-20 text-center max-w-lg mx-auto">
                    <h2 class="text-2xl font-bold mb-4">Perspectives d'évolution</h2>
                    <p>
                        Ce portfolio a vocation à évoluer avec mon parcours.
                        Des améliorations sont prévues comme l'ajout d'un blog technique,
                        l'optimisation SEO avancée, et autres.
                    </p>
                </section>
                <footer class="pb-20 text-center">
                    <p>
                        Ce projet reflète ma manière de travailler : structurer, optimiser,
                        itérer et améliorer continuellement. Il évoluera au même rythme que
                        mes compétences et mes expériences.
                    </p>
                </footer>
            </article>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { projects } from '~/assets/data/projects';

definePageMeta({
    ssr: true
})

const route = useRoute();

const project = computed(() => {
    const slugRouteSplit = route.path.split('/');
    const slugRoute = slugRouteSplit[slugRouteSplit.length - 1];
    return projects.find(p => p.slug === slugRoute);
})

defineMeta({
    title: `Maxence Bessi - ${project.value?.name}`,
    description: project.value?.description!,
    image: {
        component: `BlogPost`,
        props: {
            headline: `Maxence Bessi`,
            title: project.value?.name,
            description: project.value?.ogDescription || project.value?.description.split('.')[0]
        }
    }
})

defineSchema([
    {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": `Maxence Bessi - ${project.value?.name}`,
        "description": "Mission réalisée en alternance consistant à concevoir et développer un outil interne de gestion RH et pédagogique.",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Maxence Bessi - Développeur Full Stack",
            "url": "https://maxence-bessi.com"
        },
        "author": {
            "@type": "Person",
            "name": "Bessi Maxence"
        },
        "dateCreated": "2025-12",
        "datePublished": "2026-01",
        "keywords": [
            "webiste",
            "portfolio",
            "cv",
            "présentation",
            "Maxence Bessi"
        ]
    },
])

import image1CommandCode from "~/assets/data/images/projects/harmonix/commands_code.png";
import image1EventCode from "~/assets/data/images/projects/harmonix/event_code.png";
const images1 = [
    { url: image1CommandCode, alt: "Présentation de l'utilisation de l'annotation Command" }
];

import image2HarmonixClass from "~/assets/data/images/projects/harmonix/harmonix_class.png";
import image2ExpressPuglinAdd from "~/assets/data/images/projects/harmonix/express_plugin_add.png";
import image2ExempleExpress from "~/assets/data/images/projects/harmonix/example_express.png";
const images2 = [
    { url: image2HarmonixClass, alt: "Présentation de la classe Harmonix" },
    { url: image2ExpressPuglinAdd, alt: "Installation d'un plugin dans le framework" }
]
</script>