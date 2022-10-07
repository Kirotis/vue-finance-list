<script setup lang="ts">
import HeaderComponentVue from '@/features/header/HeaderComponent.vue'
import { useThemeStore } from '@/features/header/model/theme.store'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { computed, onMounted } from 'vue'
// import colors from 'tailwindcss/colors'

const store = useThemeStore()

onMounted(() => store.initTheme())

const lightThemeOverrides: GlobalThemeOverrides = {}

const darkThemeOverrides: GlobalThemeOverrides = {
	// common: {
	// 	primaryColor: colors.gray[900],
	// 	// borderColor: colors.black,
	// 	textColor1: colors.pink[100],
	// },
	// Input: {
	// 	borderHover: colors.black,
	// 	borderFocus: colors.gray[800]
	// },
}

const theme = computed(() => (store.currentTheme == 'dark' ? darkTheme : null))
const themeOverrides = computed(() =>
	store.currentTheme == 'dark' ? darkThemeOverrides : lightThemeOverrides
)
</script>

<template>
	<n-config-provider :theme="theme" :theme-overrides="themeOverrides">
		<div class="h-full overflow-hidden">
			<HeaderComponentVue class="h-16"/>
			<main class="p-3 h-[calc(100vh-4.5rem)]">
				<router-view />
			</main>
		</div>
	</n-config-provider>
</template>

<style>
#app {
	@apply w-screen;
	@apply h-screen;
	@apply overflow-hidden;
}
</style>
