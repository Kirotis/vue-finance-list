<script setup lang="ts">
import { useLogsStore } from './model/logs.store'
import { Add, Filter, Search } from '@vicons/ionicons5'
import SortButton from '@/entites/logs/SortButton.vue'
import LogsPopupFilter from '@/entites/logs/LogsPopupFilter.vue'
import LogPopupForm from '@/entites/logs/LogPopupForm.vue'
import { ILogItem } from '@/shared/types/ILogItem'
import { useCategoryStore } from '../categories/model/categories.store'

const store = useLogsStore()
const categoryStore = useCategoryStore()

function popupResult(event: Omit<ILogItem, 'id' | 'date'>) {
	if (store.updateId) {
		return store.updateLog(store.updateId, event)
	}
	return store.addLog(event)
}
</script>

<template>
	<div class="flex justify-between gap-2">
		<div class="min-w-80 flex w-80 gap-2">
			<n-button @click="store.showFilterPopup = true" secondary>
				<template #icon>
					<n-icon :component="Filter" />
				</template>
			</n-button>
			<n-input
				class="hidden md:block"
				v-model:value="store.filter.search"
				title="Search"
				placeholder="Search"
				@keyup.enter="store.loadLogs"
			>
				<template #prefix>
					<n-icon :component="Search"></n-icon>
				</template>
			</n-input>
		</div>
		<div class="flex gap-2">
			<n-spin size="small" v-if="store.isLoading" />
			<SortButton
				v-model:sortMode="store.filter.sort"
				@update:sort-mode="store.loadLogs"
			></SortButton>
			<n-button @click="store.startCreate" secondary>
				<template #icon>
					<n-icon :component="Add" />
				</template>
				Add log
			</n-button>
		</div>
	</div>
	<LogPopupForm
		v-model:show="store.showPopup"
		:form="store.editableItem"
		:categories="categoryStore.categories"
		:loading="store.formLoading"
		@sendResult="popupResult"
	></LogPopupForm>
	<LogsPopupFilter
		v-model:show="store.showFilterPopup"
		:categories="categoryStore.categories"
		:filter="store.filter"
		@sendResult="store.updateFilter"
	></LogsPopupFilter>
</template>
