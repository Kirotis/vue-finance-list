<script setup lang="ts">
import HeaderComponentVue from '@/features/header/HeaderComponent.vue'
import { useThemeStore } from '@/features/header/model/theme.store'
import { darkTheme, GlobalThemeOverrides, NDialogProvider } from 'naive-ui'
import { computed, onMounted } from 'vue'
import colors from 'tailwindcss/colors'
const store = useThemeStore()

onMounted(() => store.initTheme())

const lightThemeOverrides: GlobalThemeOverrides = {
	Button: {
		textColorTextHover: colors.pink[600],
	},
}

const darkThemeOverrides: GlobalThemeOverrides = {
	DataTable: {
		thColor: colors.slate[800],
		tdColor: colors.slate[700],
		tdColorHover: colors.slate[600],
	},
}

const theme = computed(() => (store.currentTheme == 'dark' ? darkTheme : null))
const themeOverrides = computed(() =>
	store.currentTheme == 'dark' ? darkThemeOverrides : lightThemeOverrides
)
</script>

<template>
	<n-config-provider :theme="theme" :theme-overrides="themeOverrides">
		<n-message-provider>
			<n-dialog-provider>
				<div class="h-full overflow-hidden">
					<HeaderComponentVue class="h-16" />
					<main class="h-[calc(100vh-4.5rem)] p-3">
						<router-view />
					</main>
				</div>
			</n-dialog-provider>
		</n-message-provider>
	</n-config-provider>
</template>

<style lang="scss">
#app {
	@apply w-screen;
	@apply h-screen;
	@apply overflow-hidden;
}
</style>
