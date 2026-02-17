<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">HarmonixJS - Framework DiscordJS</h1>
                    <p>HarmonixJS est un framework complet et modulaire destiné à faciliter la création de robots Discord. L'outil est basé sur l'utilisation des décorateurs (annotations) et de la réflexion. Il permet ainsi de créer facilement des fichiers correctement annotés, qui seront ensuite détectés et exécutés automatiquement.</p>
                    <img src="" alt="Présentation du projet HarmonixJS">
                    <div class="flex items-center justify-center gap-4 lg:gap-10 flex-wrap">
                        <UButton href="https://github.com/harmonixjs" class="rounded-full">Github</UButton>
                        <UButton class="rounded-full" disabled>Documentation (dev)</UButton>
                    </div>
                </header>
                <section class="py-20 grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1"/>
                    <div class="space-y-3">
                        <p class="text-justify">
                            Afin de structurer proprement la logique métier et de séparer clairement les responsabilités au sein d'une application basée sur Harmonix, il est possible d'utiliser les décorateurs <UKbd size="lg" class="kdb-text">Command</UKbd> et <UKbd size="lg" class="kdb-text">Event</UKbd>. Ces décorateurs permettent de déclarer des actions métier de manière explicite, typée et centralisée, tout en évitant une configuration manuelle répétitive. Lorsqu'un décorateur <UKbd size="lg" class="kdb-text">Command</UKbd> est appliqué à une classe, celle-ci est automatiquement enregistrée dans le bus interne et devient exécutable via le système de dispatch fourni par le framework. Cela garantit une architecture orientée intention, où chaque commande représente un cas d'usage clair et isolé.
                        </p>
                        <p class="text-justify">
                            Concernant les évènements, le décorateur <UKbd size="lg" class="kdb-text">Event</UKbd> va encore plus loin en simplifiant considérablement l'implémentation des handlers. Harmonix se charge automatiquement de relier l'évènement au gestionnaire correspondant et d'injecter les paramètres nécessaires directement dans la méthode <UKbd size="lg" class="kdb-text">execute</UKbd>. Ainsi, les données transportées par l'évènement sont résolues et typées sans configuration additionnelle, ce qui améliore la lisibilité, réduit le risque d'erreur et favorise une forte cohérence dans l'ensemble du système.
                        </p>
                    </div>
                </section>
                <section class="py-20 grid grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <p class="text-justify">
                            Harmonix a été conçu avec une architecture modulaire permettant l'ajout de fonctionnalités complémentaires selon les besoins de l'application. Parmi ces extensions figure le plugin Express, développé afin d'intégrer une couche HTTP complète au sein de l'écosystème Harmonix. Ce module permet de mettre en place une API REST structurée tout en conservant la cohérence architecturale du framework, notamment en matière d'injection de dépendances et d'organisation par responsabilités.
                        </p>
                        <p class="text-justify">
                            L'intégration du plugin s'effectue simplement par sa déclaration et son initialisation dans le fichier <UKbd size="lg" class="kdb-text">index.ts</UKbd>. Une fois configuré, il devient possible de créer des contrôleurs et de définir des routes HTTP via des décorateurs dédiés tels que <UKbd class="kdb-text">@Controller</UKbd>, <UKbd class="kdb-text">@Get</UKbd> ou <UKbd class="kdb-text">@Post</UKbd>. Cette approche, inspirée des standards modernes du développement backend, favorise une structure claire, maintenable et adaptée à des applications évolutives.
                        </p>
                    </div>
                    <Galery :images="images2"/>
                </section>
                <footer class="pb-20 text-center">
                    <p>Ce projet m'a permis d'approfondir ma compréhension de l'architecture modulaire et des mécanismes avancés de TypeScript, notamment à travers l'utilisation des décorateurs et de la réflexion. Il m'a également initié aux bonnes pratiques de versioning et de publication de packages sur <a href="https://www.npmjs.com/" target="_blank" class="underline decoration-rose-500">npm</a>.</p>
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
            "name": "HarmonixJS",
            "url": "https://github.com/harmonixjs"
        },
        "dateCreated": "2025-12",
        "datePublished": "2026-01",
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