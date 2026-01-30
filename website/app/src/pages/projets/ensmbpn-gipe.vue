<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <article class="h-screen relative overflow-x-hidden max-w-6xl mx-auto">
                <p>
                    A faire pour mieux créer la page :
                    - Afficher des schemas fonctionnement (MVC, logique metier, ...)
                    - Organisations :
                    - 1 présentation rapide du projet et de mon travail
                    - 2 image du projet
                    - 3 présentation du projet avec logo sur le coté
                    - 4 blabla bullshit
                    - 5 3x présentation de features que j'ai développer au sein de l'app, avec une galerie (3, 4 images)
                    - 6 blabla final
                    - 7 gestion full SEO avec les schemas.org
                </p>


                <div class="absolute top-1/4 right-[15%] w-44 h-44 bg-rose-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-1/4 left-[15%] w-44 h-44 bg-purple-500 rounded-full blur-3xl"></div>
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

defineSeoSchema([
    {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Projet GIPE - Maxence Bessi",
        "description": "Présentation du projet GIPE réalisé en alternance : conception et développement d'un outil interne de gestion RH et pédagogique.",
        "url": "https://maxence-bessi.com/projets/gipe",
        "inLanguage": "fr",
        "isPartOf": {
            "@type": "WebSite",
            "name": "Maxence Bessi - Développeur Full Stack",
            "url": "https://maxence-bessi.com"
        },
        "about": {
            "@type": "CreativeWork",
            "name": "GIPE",
            "description": "Outil interne de gestion des ressources humaines et de la pédagogie développé dans le cadre d'une alternance.",
            "publisher": {
                "@type": "Organization",
                "name": "Marine Nationale",
                "url": "https://www.defense.gouv.fr/marine"
            },
            "creator": {
                "@type": "Role",
                "roleName": "Alternant développeur Full Stack",
                "startDate": "2024-09",
                "endDate": "2026-06",
                "creator": {
                    "@type": "Person",
                    "name": "Maxence Bessi"
                },
                "organization": {
                    "@type": "Organization",
                    "name": "Marine Nationale",
                    "url": "https://www.defense.gouv.fr/marine"
                }
            },
            "dateCreated": "2024-09",
            "keywords": [
                "application web",
                "outil interne",
                "gestion RH",
                "gestion pédagogique"
            ]
        }
    }
])


</script>