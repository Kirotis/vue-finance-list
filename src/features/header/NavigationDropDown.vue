<script setup lang="ts">
import router from '@/pages'
import { Component, computed, h } from 'vue'
import {
	List,
	Menu,
	Settings,
	Analytics,
	LogOut,
	Moon,
	SunnySharp,
} from '@vicons/ionicons5'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { useThemeStore } from './model/theme.store'
import { useAuthStore } from '../auth/model/auth.store'

const store = useThemeStore()
const authStore = useAuthStore()

function renderIcon(icon: Component) {
	return () =>
		h(NIcon, null, {
			default: () => h(icon),
		})
}

const links = [
	{
		label: 'Logs',
		key: '/',
		icon: renderIcon(List),
		onClick: () => router.push('/'),
	},
	{
		label: 'Categories',
		key: '/categories',
		icon: renderIcon(Settings),
		onClick: () => router.push('/categories'),
	},
	{
		label: 'Plans',
		key: '/plans',
		icon: renderIcon(Analytics),
		onClick: () => router.push('/plans'),
	},
	{
		type: 'divider',
		key: 'd1',
	},
	{
		label: 'Logout',
		key: 'logout',
		icon: renderIcon(LogOut),
		onClick: () => authStore.logout(),
	},
	{
		label: 'Theme',
		key: 'theme',
		icon: renderIcon(store.currentTheme == 'dark' ? Moon : SunnySharp),
		onClick: () => store.toggleTheme(),
	},
]

const options = computed(() =>
	links.map(link => ({
		...link,
		disabled: link.key == router.currentRoute.value.path,
	}))
)

function onChangeNavigaton(selectedKey: string) {
	const onClick = links.find(({ key }) => selectedKey == key)?.onClick
	if (onClick) {
		onClick()
	}
}
</script>

<template>
	<n-dropdown :options="options" @select="onChangeNavigaton">
		<n-button secondary>
			<template #icon>
				<n-icon :component="Menu" />
			</template>
		</n-button>
	</n-dropdown>
</template>
