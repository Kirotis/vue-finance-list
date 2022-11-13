<script setup lang="ts">
import { useCategoryStore } from '@/features/categories/model/categories.store'
import { NButton, NIcon, useDialog } from 'naive-ui'
import { Component, h, onMounted } from 'vue'
import { Pencil, TrashBin, Add } from '@vicons/ionicons5'
import { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { ICategory } from '@/shared/types'
import CategoryPopupForm from '@/entites/categories/CategoryPopupForm.vue'

const store = useCategoryStore()
const dialog = useDialog()

function popupResult(event: Pick<ICategory, 'name' | 'image'>) {
	if (store.updateId) {
		return store.edit(store.updateId, event)
	}
	return store.create(event)
}

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

const columns: TableColumns<ICategory> = [
	{
		title: 'Name',
		key: 'name',
	},
	// {
	// 	title: 'Id',
	// 	key: 'id',
	// },
	{
		title: '',
		key: 'actions',
		width: 120,
		align: 'center',
		render: ({ id, name }) => [
			renderCellButton(Pencil, () => store.startEdit(id)),
			renderCellButton(TrashBin, () => {
				dialog.error({
					title: 'Are you sure?',
					content: `Delete ${name}?`,
					positiveText: 'Sure',
					negativeText: 'Not Sure',
					onPositiveClick: () => {
						store.deleteCategory(id)
					},
				})
			}),
		],
	},
]

onMounted(() => store.loadCategories())
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<div class="flex">
			<n-button @click="store.startCreate" secondary>
				<template #icon>
					<n-icon :component="Add" />
				</template>
				Add category
			</n-button>
		</div>
		<n-data-table :columns="columns" :data="store.categories" />
		<CategoryPopupForm
			v-model:show="store.showPopup"
			:form="store.editableItem"
			:loading="store.loadingPopup"
			@send-result="popupResult"
		></CategoryPopupForm>
	</div>
</template>
