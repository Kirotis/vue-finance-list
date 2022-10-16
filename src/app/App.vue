<script setup lang="ts">
import HeaderComponentVue from '@/features/header/HeaderComponent.vue'
import { useThemeStore } from '@/features/header/model/theme.store'
import { darkTheme } from 'naive-ui'
import { computed, onMounted } from 'vue'
// import colors from 'tailwindcss/colors'
const store = useThemeStore()

onMounted(() => store.initTheme())

// const lightThemeOverrides: GlobalThemeOverrides = {}

// const darkThemeOverrides: GlobalThemeOverrides = {}

const theme = computed(() => (store.currentTheme == 'dark' ? darkTheme : null))
// const themeOverrides = computed(() =>
// 	store.currentTheme == 'dark' ? darkThemeOverrides : lightThemeOverrides
// )
</script>

<template>
	<n-config-provider :theme="theme">
		<div class="h-full overflow-hidden">
			<HeaderComponentVue class="h-16" />
			<main class="h-[calc(100vh-4.5rem)] p-3">
				<router-view />
			</main>
		</div>
	</n-config-provider>
</template>

<style lang="scss">
#app {
	@apply w-screen;
	@apply h-screen;
	@apply overflow-hidden;
}
</style>
