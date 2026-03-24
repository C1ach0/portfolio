<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto px-2">
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
                    <SkillBadge :tech-uses="[
                        {
                            icon: 'typescript',
                            name: 'TypeScript'
                        },
                        {
                            icon: 'nuxtjs-light',
                            name: 'Nuxt'
                        },
                        {
                            icon: 'tailwindcss-light',
                            name: 'TailwindCSS'
                        },
                        {
                            icon: 'github-light',
                            name: 'GitHub'
                        },
                        {
                            icon: 'docker',
                            name: 'Docker'
                        }
                    ]" />
                </header>
                <section class="py-20 flex flex-col-reverse lg:grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1" />
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Présentation du projet</h2>
                        <p class="text-justify">
                            Ce portfolio a été pensé comme un projet à part entière, avec les mêmes exigences qu'une
                            application en production. Il centralise mes réalisations tout en illustrant ma capacité à
                            concevoir des interfaces modernes, performantes et évolutives.
                        </p>
                        <p class="text-justify">
                            Au-delà de l'aspect visuel, l'accent a été mis sur une architecture front-end robuste, une
                            expérience utilisateur fluide, ainsi que sur l'optimisation et l'accessibilité. L'ensemble a
                            été structuré pour être maintenable dans le temps et facilement extensible.
                        </p>
                    </div>
                </section>
                <section class="py-20 flex flex-col lg:grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Optimisation SEO</h2>
                        <p class="text-justify">
                            Le projet repose sur Nuxt 3 afin de bénéficier du Server-Side Rendering (SSR) et d'une
                            optimisation SEO native, améliorant significativement les performances et la visibilité.
                        </p>
                        <p class="text-justify">
                            L'interface est construite avec TailwindCSS, favorisant rapidité d'itération et cohérence
                            visuelle. L'application est organisée en composants réutilisables (cartes projets, galerie
                            dynamique, layout global), assurant une base maintenable et évolutive.
                        </p>
                        <p class="text-justify">
                            Une attention particulière a été portée à la gestion des performances et à l'expérience
                            utilisateur, notamment à travers l'optimisation du chargement des ressources, la gestion des
                            états d'interface et la fluidité de navigation entre les différentes sections.
                        </p>
                        <p class="text-justify">
                            Le référencement est également renforcé par l'utilisation de données structurées
                            (schema.org), permettant d'améliorer la compréhension du contenu par les moteurs de
                            recherche et d'optimiser l'affichage des résultats.
                        </p>
                    </div>
                    <Galery :images="images2" />
                </section>
                <section class="py-20 flex flex-col-reverse lg:grid grid-cols-2 gap-4">
                    <Galery :images="images3" />
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Présentation des projets</h2>
                        <p class="text-justify">
                            Afin de présenter plusieurs projets de manière simple et cohérente, j'ai fait le choix d'opter pour une intégration statique directement dans l'application.
                        </p>
                        <p class="text-justify">
                            Cette décision a été motivée par la volonté de garder un contrôle total sur la structure de chaque page projet, tout en facilitant la création de pages dédiées avec un contenu riche et personnalisé.
                        </p>
                        <p class="text-justify">
                            Une approche dynamique avec base de données aurait nécessité une gestion supplémentaire (modélisation, synchronisation, génération de pages), sans réel gain dans ce contexte. Le choix du statique permet ainsi de conserver une implémentation plus simple, tout en restant adaptée aux besoins du projet.
                        </p>
                    </div>
                </section>
                <section class="py-20 flex flex-col lg:grid grid-cols-2 gap-4">
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold">Mise en ligne</h2>
                        <p class="text-justify">
                            Afin de simplifier le déploiement de l'application, j'ai choisi d'utiliser Docker, ce qui me permet de créer une image reproductible et de la déployer rapidement sur mon serveur.
                        </p>
                        <p class="text-justify">
                            Pour automatiser ce processus, j'ai mis en place un pipeline GitHub. À chaque mise à jour sur la branche principale, celui-ci récupère les dernières modifications, construit une nouvelle image Docker, puis déclenche automatiquement le redéploiement en appelant une API sur mon serveur.
                        </p>
                    </div>
                    <Galery :images="images4" />
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
        "description": project.value?.description!,
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
        "datePublished": "2026-03",
        "keywords": [
            "webiste",
            "portfolio",
            "cv",
            "présentation",
            "Maxence Bessi",
            "Bessi",
            "Développement",
            "Informatique"
        ]
    },
])

import landingPage from "~/assets/data/images/projects/portfolio/landingpage.png";
const images1 = [
    {
        url: landingPage,
        alt: "Page d'accueil de ce site (portfolio)",
        description: "Page d'accueil de ce site"
    }
];

import ssrSeoCode from "~/assets/data/images/projects/portfolio/ssr_image.png";
const images2 = [
    {
        url: "/__og-image__/image/projets/ensmbpn-gipe/og.png",
        alt: "Exemple d'image de prévisualisation Open Graph générée dynamiquement à partir des données récupérées",
        description: "Exemple d'image de prévisualisation Open Graph générée dynamiquement à partir des données récupérées"
    },
    {
        url: ssrSeoCode,
        alt: "Mise en place de l'affichage Open Graph ",
        description: "Mise en place de l'affichage Open Graph dynamiquement"
    }
]
import projectsPage from "~/assets/data/images/projects/portfolio/projects_page.png";
const images3 = [
    {
        url: projectsPage,
        alt: "Affichage de la page projets",
        description: "Présentation de la page projets, où ce trouvent tout les projets disponible et automatiquement importé depuis les données"
    }
];

import cicdGithub from "~/assets/data/images/projects/portfolio/cicd_github.png";
const images4 = [
    {
        url: cicdGithub,
        alt: "Pipeline CI/CD sur Github",
        description: "Exemple de resultat suite à une nouvelle mise à jour reçu sur GitHub"
    }
]
</script>