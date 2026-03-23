<template>
    <div class="py-3 flex flex-wrap gap-4 max-w-xl items-center justify-center mx-auto">
        <UBadge v-for="(tech, i) in techUses" :key="i" :icon="tech.icon ? `i-skill-icons-${tech.icon}` : undefined" size="lg" color="neutral"
            variant="soft">
            {{ tech.name }}
        </UBadge>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    techUses: {
        icon?: string,
        name: string
    }[]
}>();
</script>