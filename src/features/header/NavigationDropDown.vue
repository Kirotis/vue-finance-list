<script setup lang="ts">
import router from '@/pages'
import { Component, computed, h } from 'vue'
import { List, Menu, Settings } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

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
	},
	{
		label: 'Categories',
		key: '/categories',
		icon: renderIcon(Settings),
	},
]

const options = computed(() =>
	links.map(link => ({
		...link,
		disabled: link.key == router.currentRoute.value.path,
	}))
)

function onChangeNavigaton(key: string) {
	router.push(key)
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
