<script setup lang="ts">
import { useCategoryStore } from '@/features/categories/model/categories.store'
import { NButton, NIcon } from 'naive-ui'
import { Component, h, onMounted } from 'vue'
import { Pencil, Settings } from '@vicons/ionicons5'

const store = useCategoryStore()

function renderCellButton(iconComponent: Component, onClick?: () => void) {
	return h(
		NButton,
		{
			secondary: true,
			onClick,
		},
		{
			default: () => [
				h(NIcon, null, {
					default: () => h(iconComponent),
				}),
			],
		}
	)
}

const columns = [
	{
		title: 'Id',
		key: 'id',
	},
	{
		title: 'Name',
		key: 'name',
	},
	{
		title: 'Actions',
		key: 'actions',
		render: () => [
			renderCellButton(Pencil, console.log),
			renderCellButton(Settings, console.log),
		],
	},
]

onMounted(() => store.loadCategories())
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<n-data-table :columns="columns" :data="store.categories" />
	</div>
</template>
