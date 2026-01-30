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

                <div class="text-justify">

                </div>
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

</script>