<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="min-h-screen relative overflow-x-hidden max-w-6xl mx-auto">
                <header class="max-w-3xl mx-auto text-center space-y-5">
                    <h1 class="text-4xl font-bold">Application Rôle-Play</h1>
                    <p>RosyRP est un projet Discord visant à offrir aux joueurs console une plateforme optimisée pour le
                        rôle-play. Face aux limitations des outils existants, RosyRP propose une solution plus complète,
                        configurable et adaptée aux besoins des communautés RP.</p>
                    <img src="" alt="Présentation du projet RosyRP">
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
                            icon: 'java-light',
                            name: 'Java 21'
                        },
                        {
                            icon: 'spring-light',
                            name: 'Spring Boot'
                        },
                        {
                            icon: 'mysql-light',
                            name: 'MariaDB'
                        },
                        {
                            icon: 'redis-light',
                            name: 'Redis'
                        },
                        {
                            name: 'Stripe'
                        },
                        {
                            icon: 'discord',
                            name: 'DiscordJS v14'
                        },
                        {
                            icon: 'docker',
                            name: 'Docker'
                        }
                    ]"/>
                </header>
                <section class="py-20 grid grid-cols-2 gap-4 items-start">
                    <Galery :images="images1" />
                    <div class="space-y-3">
                        <p class="text-justify">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odio magnam tenetur suscipit incidunt. Aliquam quam, libero distinctio sit, voluptate, saepe perspiciatis placeat porro eos error recusandae temporibus facere velit.
                        </p>
                        <!-- <p class="text-justify">
                            Concernant les évènements, le décorateur <UKbd size="lg" class="kdb-text">Event</UKbd> va
                            encore plus loin en simplifiant considérablement l'implémentation des handlers. Harmonix se
                            charge automatiquement de relier l'évènement au gestionnaire correspondant et d'injecter les
                            paramètres nécessaires directement dans la méthode <UKbd size="lg" class="kdb-text">execute
                            </UKbd>. Ainsi, les données transportées par l'évènement sont résolues et typées sans
                            configuration additionnelle, ce qui améliore la lisibilité, réduit le risque d'erreur et
                            favorise une forte cohérence dans l'ensemble du système.
                        </p> -->
                    </div>
                </section>
                <!-- <section class="py-20 grid grid-cols-2 gap-4">
                    <div class="space-y-3">
                        <p class="text-justify">
                            Harmonix a été conçu avec une architecture modulaire permettant l'ajout de fonctionnalités complémentaires selon les besoins de l'application. Parmi ces extensions figure le plugin Express, développé afin d'intégrer une couche HTTP complète au sein de l'écosystème Harmonix. Ce module permet de mettre en place une API REST structurée tout en conservant la cohérence architecturale du framework, notamment en matière d'injection de dépendances et d'organisation par responsabilités.
                        </p>
                        <p class="text-justify">
                            L'intégration du plugin s'effectue simplement par sa déclaration et son initialisation dans le fichier <UKbd size="lg" class="kdb-text">index.ts</UKbd>. Une fois configuré, il devient possible de créer des contrôleurs et de définir des routes HTTP via des décorateurs dédiés tels que <UKbd class="kdb-text">@Controller</UKbd>, <UKbd class="kdb-text">@Get</UKbd> ou <UKbd class="kdb-text">@Post</UKbd>. Cette approche, inspirée des standards modernes du développement backend, favorise une structure claire, maintenable et adaptée à des applications évolutives.
                        </p>
                    </div>
                    <Galery :images="images2"/>
                </section> -->
                <footer class="pb-20 text-center">
                    <p>
                        Le développement de RosyRP a été interrompu avant sa finalisation en raison de contraintes de temps et de priorités personnelles. Malgré cela, ce projet m'a permis d'explorer la conception d'outils dédiés au rôle-play sur Discord, ainsi que d'approfondir l'utilisation de technologies telles que Java et Spring, et de mettre en place une intégration complète de Stripe pour la gestion de paiements mensuels. Cette expérience a également renforcé mes compétences en organisation, développement et conception d'interfaces adaptées aux besoins des utilisateurs.
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
            "rp",
            "discord",
            "bot",
            "role-play",
            "gta",
            "ps4",
            "ps5",
            "xbox"
        ]
    },
])

import image1CommandCode from "~/assets/data/images/projects/harmonix/commands_code.png";
import image1EventCode from "~/assets/data/images/projects/harmonix/event_code.png";
const images1 = [
    { url: image1CommandCode, alt: "Présentation de l'utilisation de l'annotation Command" },
    { url: image1EventCode, alt: "Présentation de l'utilisation de l'annotation Event" },
];
</script>