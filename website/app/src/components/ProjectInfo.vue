<template>
    <div class="flex flex-col items-center justify-center gap-2 py-20 text-muted text-sm">
        <div class="flex items-center justify-center gap-4">
            <span>{{ project.name }}</span>
            <span>-</span>
            <span v-if="project.date === 'dev'">En développement</span>
            <ConvertDate v-else :date="project.date" convert="date" />
        </div>
        <span v-if="project.locationName">{{ project.locationName }}<span v-if="project.sndName"> - {{ project.sndName }}</span></span>
        <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in project.types" :key="tag"
                class="bg-rose-400/20 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 px-3 py-1 rounded-full text-xs font-medium">
                {{ tag }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProjectData } from '~/models/Project.models';


defineProps<{
    project: ProjectData
}>()

</script>