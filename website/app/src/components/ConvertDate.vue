<template>
    <span>{{ formatDate }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    date: string,
    convert: "date"|"datetime"|"time"
}>();

const formatDate = computed(() => {
    const date = new Date(props.date);
    
    const options: Intl.DateTimeFormatOptions = {};
    if (props.convert === "datetime") {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        options.hour = '2-digit';
        options.minute = '2-digit';
    } else if (props.convert === "date") {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
    } else if (props.convert === "time") {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
	return date.toLocaleDateString('fr-FR', options);
});
</script>