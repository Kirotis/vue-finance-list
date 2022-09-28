<script setup lang="ts">
import HeaderComponentVue from '@/entites/header/HeaderComponent.vue'
import { GlobalThemeOverrides } from 'naive-ui'
import LogsList from '@/features/logs/LogsList.vue'
import colors from 'tailwindcss/colors'

const themeOverrides: GlobalThemeOverrides = {
	common: {
		successColor: colors.gray[900],
		// actionColor: colors.black,
		// baseColor: colors.gray[800],
		// borderColor: colors.black,
		// hoverColor: colors.black,
		// buttonColor2Hover: colors.black,
		// primaryColorHover: colors.black,
		// buttonColor2Pressed: colors.black,
		// buttonColor2: colors.black,

		textColor1: colors.pink[100],
		textColor2: colors.pink[100],
		textColor3: colors.pink[100],
	},
}
</script>

<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<div class="h-full">
			<HeaderComponentVue />
			<main class="p-3">
				<LogsList
					:logs="[
						{
							money: 200,
							title: 'test',
							category: 'test',
							date: new Date(),
							id: '5',
						},
						{
							money: 200,
							title: 'test',
							category: 'test',
							date: new Date(),
							id: '3',
						},
					]"
				></LogsList>
				<!-- <LogCardVue :item=""></LogCardVue> -->
				<!-- <router-view /> -->
			</main>
		</div>
	</n-config-provider>
</template>

<style>
#app {
	height: 100vh;
	width: 100vw;
}
</style>
