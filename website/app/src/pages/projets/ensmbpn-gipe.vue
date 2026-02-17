<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">Gestion Informatique Pour l'Enseignement</h1>
                    <p>
                        GIPE est une projet réalisé à l'ENSM-BPN, ce projet à pour but de servir la partie RH de l'école, la gestion des cours et des exercices.
                    </p>
                    <img src="" alt="Présentation du projet GIPE">
                </header>
                <section class="py-20 grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1"/>
                    <div class="space-y-3">
                        <p class="text-justify">
                            
                        </p>
                        <p class="text-justify">
                            
                        </p>
                    </div>
                </section>
                <section class="py-20 grid grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <p class="text-justify">
                            
                        </p>
                        <p class="text-justify">
                            
                        </p>
                    </div>
                    <Galery :images="images2"/>
                </section>
                <footer class="pb-20 text-center">
                    <p>

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
        "publisher": {
            "@type": "Organization",
            "name": "Marine Nationale",
            "url": "https://www.defense.gouv.fr/marine"
        },
        "dateCreated": "2024-09",
        "datePublished": "2026-07",
        "keywords": [
            "framework",
            "discord",
            "handler",
            "typescript",
            "reflection"
        ]
    },
])

import image1CommandCode from "~/assets/data/images/projects/harmonix/commands_code.png";
import image1EventCode from "~/assets/data/images/projects/harmonix/event_code.png";
const images1 = [
    { url: image1CommandCode, alt: "Présentation de l'utilisation de l'annotation Command" },
    { url: image1EventCode, alt: "Présentation de l'utilisation de l'annotation Event" },
];

import image2HarmonixClass from "~/assets/data/images/projects/harmonix/harmonix_class.png";
import image2ExpressPuglinAdd from "~/assets/data/images/projects/harmonix/express_plugin_add.png";
import image2ExempleExpress from "~/assets/data/images/projects/harmonix/example_express.png";
const images2 = [
    { url: image2HarmonixClass, alt: "Présentation de la classe Harmonix" },
    { url: image2ExpressPuglinAdd, alt: "Installation d'un plugin dans le framework" },
    { url: image2ExempleExpress, alt: "Exemple d'utilisation du plugin expressjs" }
]
</script>