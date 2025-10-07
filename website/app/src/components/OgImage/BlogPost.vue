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
		<div class="w-full h-full flex-col justify-center relative">
			<div class="w-[900px] pl-[100px]">
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