<template>
    <div v-bind="$attrs" class="group">
        <div
            class="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-rose-400 transition-all duration-300">
            <div
                class="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
            <div class="relative z-10">
                <slot/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>