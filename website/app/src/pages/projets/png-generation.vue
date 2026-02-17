<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">PNG Génération - Framework DiscordJS</h1>
                    <p>
                        Png Generation est un projet visant à simplifier la création d'images dynamiques à partir de
                        technologies web standards telles que le HTML et le CSS, avec la possibilité d'utiliser
                        TailwindCSS ainsi que des frameworks comme VueJS ou React. L'objectif est de permettre la
                        génération d'images structurées et entièrement personnalisables en s'appuyant sur des outils
                        familiers du développement frontend, sans recourir à des solutions plus complexes comme l'API
                        Canvas. L'idée du projet est née à la suite de la découverte de Nuxt Og Image, qui met en avant
                        la génération d'images dynamiques pour des usages tels que les cartes Open Graph, et a conduit
                        au développement d'une solution plus générique, flexible et adaptée à différents contextes
                        applicatifs.
                    </p>
                    <img src="https://png-generation.maxence-bessi.com/banner.png" alt="Présentation du projet PNG Generation">
                    <div class="flex items-center justify-center gap-4 lg:gap-10 flex-wrap">
                        <UButton href="https://github.com/c1ach0/png-generation" target="_blank" class="rounded-full">
                            Github</UButton>
                        <UButton href="https://png-generation.maxence-bessi.com" target="_blank" class="rounded-full">
                            Documentation</UButton>
                    </div>
                </header>
                <section class="py-20 grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1" />
                    <div class="space-y-3">
                        <p class="text-justify">
                            L’utilisation du projet repose sur un principe simple : définir une structure d’image à l’aide de HTML et de CSS (ou TailwindCSS), comme pour n’importe quelle interface web. Le template peut être conçu avec des composants VueJS ou React afin de bénéficier d’une logique dynamique et d’un système de props pour personnaliser le rendu. L’image finale est ensuite générée à partir de ce rendu, permettant de produire des visuels cohérents, maintenables et facilement modifiables.
                        </p>
                        <p class="text-justify">
                            Côté API, l’intégration consiste à exposer un endpoint chargé de générer l’image à la demande. Les données sont transmises via des paramètres ou un corps de requête, injectées dans le template, puis converties en image au moment de l’appel. Cette approche permet de générer dynamiquement des visuels personnalisés (cartes, aperçus, certificats, bannières, etc.) tout en conservant une structure de code claire et proche des standards du développement frontend.
                        </p>
                    </div>
                </section>
                <footer class="pb-20 text-center">
                    <p>Ce projet illustre une volonté de proposer une approche moderne et accessible
                        à la génération d'images dynamiques, en réutilisant des standards du
                        développement frontend pour simplifier des problématiques habituellement
                        techniques et complexes.</p>
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
            "api",
            "generation",
            "image",
            "utils",
            "service",
            "micro-service"
        ]
    },
])

import image1HTMLCode from "~/assets/data/images/projects/png-gen/html_code.png";
import image1ToAPICode from "~/assets/data/images/projects/png-gen/toapi_code.png";
const images1 = [
    { url: image1HTMLCode, alt: "Présentation d'un script html simple" },
    { url: image1ToAPICode, alt: "Présentation de l'utilisation de l'API de création d'image" },
];
</script>