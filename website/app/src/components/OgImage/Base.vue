<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
	colorMode?: 'dark' | 'light'
	title?: string
	description?: string
	headline?: string
	theme?: string
}>(), {
	colorMode: 'dark',
	theme: '#f43f5e',
	title: 'title',
})

const HexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i

const colorMode = computed(() => {
	return props.colorMode || 'light'
})
const themeHex = computed(() => {
	// regex test if valid hex
	if (HexRegex.test(props.theme))
		return props.theme
	
	// if it's hex without the hash, just add the hash
	if (HexRegex.test(`#${props.theme}`))
		return `#${props.theme}`
	
	// if it's rgb or rgba, we convert it to hex
	if (props.theme.startsWith('rgb')) {
		const rgb = props.theme
			.replace('rgb(', '')
			.replace('rgba(', '')
			.replace(')', '')
			.split(',')
			.map(v => Number.parseInt(v.trim(), 10))
		const hex = rgb
			.map((v) => {
				const hex = v.toString(16)
				return hex.length === 1 ? `0${hex}` : hex
			})
			.join('')
		return `#${hex}`
	}
	return '#FFFFFF'
})
const themeRgb = computed(() => {
	// we want to convert it so it's just `<red>, <green>, <blue>` (255, 255, 255)
	return themeHex.value
		.replace('#', '')
		.match(/.{1,2}/g)
		?.map(v => Number.parseInt(v, 16))
		.join(', ')
})
</script>

<template>
	<div class="w-full h-full flex justify-between relative p-[60px]" :class="[
    colorMode === 'light' ? ['bg-white', 'text-black'] : ['bg-black', 'text-white'],
  ]">
		<div class="flex absolute top-0 right-[-100%]" :style="{
	      width: '200%',
	      height: '200%',
	      backgroundImage: `radial-gradient(circle, rgba(${themeRgb}, 0.5) 0%,  ${colorMode === 'dark' ? 'rgba(5, 5, 5,0.3)' : 'rgba(255, 255, 255, 0.7)'} 50%, ${props.colorMode === 'dark' ? 'rgba(5, 5, 5,0)' : 'rgba(255, 255, 255, 0)'} 70%)`,
	    }" />
		<!-- <div class="h-full w-full justify-between relative"></div> -->
		<div class="w-full h-full flex-col justify-center relative">
			<svg class="absolute top-[50px] right-[120px]" id="Calque_1" width="300" data-name="Calque 1"
			     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 608.98 779.81">
				<defs>
					<style>
						.cls-1 {
							fill: url(#Dégradé_sans_nom_3-3);
						}
						
						.cls-2 {
							fill: url(#Dégradé_sans_nom_3-4);
						}
						
						.cls-3 {
							fill: url(#Dégradé_sans_nom_3-2);
						}
						
						.cls-4 {
							fill: url(#Dégradé_sans_nom_3);
						}
					</style>
					<linearGradient id="Dégradé_sans_nom_3" data-name="Dégradé sans nom 3" x1="0" y1="486.15" x2="608.98"
					                y2="486.15" gradientUnits="userSpaceOnUse">
						<stop offset="0" stop-color="#eb6568" />
						<stop offset="1" stop-color="#e74041" />
					</linearGradient>
					<linearGradient id="Dégradé_sans_nom_3-2" data-name="Dégradé sans nom 3" x1="49.77" y1="89.23" x2="219.08"
					                y2="89.23" xlink:href="#Dégradé_sans_nom_3" />
					<linearGradient id="Dégradé_sans_nom_3-3" data-name="Dégradé sans nom 3" x1="16.68" y1="180.19" x2="194.83"
					                y2="180.19" xlink:href="#Dégradé_sans_nom_3" />
					<linearGradient id="Dégradé_sans_nom_3-4" data-name="Dégradé sans nom 3" x1="231.66" y1="104.05" x2="304.28"
					                y2="104.05" xlink:href="#Dégradé_sans_nom_3" />
				</defs>
				<path class="cls-4"
				      d="M608.98,522.1c-6.14,73.62-53.94,188.14-139.72,193.36-48.79,2.98-95.82-22.41-136.53-45.99,12.62,41.05,37.76,76.97,67.51,107.43-23.89,4.27-68.16,5.07-89.77-6.14-3.22-1.69-12.71-6.17-16.64-8.38-126.52-71.08-57.44-252.55,31.19-326.24-2.18,30.24-12.19,59.96-13.94,90.45-.52,8.87-.92,56.92,3.22,59.99,36.93-37.95,102.11-147.89,91.34-200.39-8.78-42.92-86.92-15.29-113.69-4.61-39.91,15.97-119.77,65.4-137.85,104.69-19.56,42.4,27.94,69.91,64.97,69.63l-29.57,8.75c-85.81,13.02-226.12-24.32-180.65-137.67,61.53-153.51,363.33-324.4,502.07-179.82,91.71,95.61-.89,271.96-86.12,342.45,65.12-7.86,129.9-31.04,184.18-67.51Z" />
				<path class="cls-3"
				      d="M219.08,178.23c-3.63,3.77-84.95-40.1-94.15-45.51-18.89-11.11-71.02-42.11-74.51-63.63C43.52,26.53,93.61-2.8,131.56.21c73.4,5.82,79.23,123.1,87.52,178.02Z" />
				<path class="cls-1"
				      d="M194.52,196.63c-43.54,13.38-93.38,27.53-139.42,21.26-51-6.95-51.37-70.53-.27-76.49,36.26-4.23,107.2,22.73,134.6,46.55,3.15,2.74,6.43,3.01,5.09,8.68Z" />
				<path class="cls-2"
				      d="M243.67,172.09c-4.48-36.8-32.56-115.62,16.72-132.16,79.83-26.8,30.35,74.78,9.76,104.94-3.07,4.5-21.32,31.84-26.48,27.22Z" />
			</svg>
			<div class="w-[600px] pl-[100px]">
				<p v-if="headline" class="text-[28px] text-rose-500 leading-tight">
					{{ headline }}
				</p>
				<h1 v-if="title" class="w-[600px] m-0 text-[60px] font-semibold mb-4 flex items-center">
					<span>{{ title }}</span>
				</h1>
				<p v-if="description" class="text-[32px] leading-tight">
					{{ description }}
				</p>
			</div>
		</div>
	</div>
</template>