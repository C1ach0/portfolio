<template>
    <NuxtLayout>
        <template v-if="project">
            <ProjectInfo :project />
            <section class="h-screen relative overflow-hidden flex items-center justify-center">
                <div class="flex flex-col items-center justify-center">
                    <h1 class="text-4xl font-bold">En cours de développement</h1>
                </div>
                <div class="absolute top-1/4 right-[15%] w-44 h-44 bg-rose-500 rounded-full blur-3xl"></div>
                <div class="absolute bottom-1/4 left-[15%] w-44 h-44 bg-purple-500 rounded-full blur-3xl"></div>
            </section>
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
            description: project.value?.ogDescription
        }
    }
})

</script>