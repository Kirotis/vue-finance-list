<script setup lang="ts">
import LogCard from '@/entites/logs/LogCard.vue'
import SortButton from '@/entites/logs/SortButton.vue'
import { useLogsStore } from './model/logs.store'
import LogPopupForm from '@/entites/logs/LogPopupForm.vue'
import { Add, Filter, Search, List, PieChart } from '@vicons/ionicons5'
import { ILogItem } from '@/shared/types/ILogItem'
import { useVirtualList } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import LogsPopupFilter from '@/entites/logs/LogsPopupFilter.vue'
import LogsChart from '@/entites/logs/LogsChart.vue'

const store = useLogsStore()
function popupResult(event: Omit<ILogItem, 'id' | 'date'>) {
	if (store.updateId) {
		return store.updateLog(store.updateId, event)
	}
	return store.addLog(event)
}

const computedList = computed(() => [...store.logsView])

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
	computedList,
	{
		itemHeight: 132,
	}
)

watch(computedList, () => scrollTo(0))
const showChart = ref<boolean>(false)
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
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
				>
					<template #prefix>
						<n-icon :component="Search"></n-icon>
					</template>
				</n-input>
				<div class="block md:hidden">
					<n-switch v-model:value="showChart" size="large">
						<template #checked-icon>
							<n-icon :component="PieChart" />
						</template>
						<template #unchecked-icon>
							<n-icon :component="List" />
						</template>
					</n-switch>
					<!-- <n-checkbox v-model:checked="showChart"></n-checkbox> -->
				</div>
			</div>
			<div class="flex gap-2">
				<SortButton v-model:sortMode="store.filter.sort"></SortButton>
				<n-button @click="store.startCreate" secondary>
					<template #icon>
						<n-icon :component="Add" />
					</template>
					Add log
				</n-button>
			</div>
		</div>
		<div class="h-full md:flex">
			<LogsChart
				class="w-full md:block md:w-1/2"
				:class="{ 'hidden w-full': !showChart }"
				:data="store.chartData"
			></LogsChart>
			<div
				v-bind="containerProps"
				class="h-full w-full md:block md:w-1/2"
				:class="{ 'hidden w-full': showChart }"
			>
				<div class="logs-list" v-bind="wrapperProps">
					<LogCard
						v-for="{ data } in list"
						:key="data.id"
						:item="data"
						:search-text="store.filter.search"
						@click.stop="store.startUpdate(data.id)"
					></LogCard>
				</div>
			</div>
		</div>
	</div>
	<LogPopupForm
		v-model:show="store.showPopup"
		:form="store.editableItem"
		@sendResult="popupResult"
	></LogPopupForm>
	<LogsPopupFilter
		v-model:show="store.showFilterPopup"
		:filter="store.filter"
		@sendResult="store.updateFilter"
	></LogsPopupFilter>
</template>

<style scoped lang="scss">
.logs-list {
	@apply flex;
	@apply flex-col;
	@apply xl:items-center;
	@apply md:items-center;
	// @apply xl:items-center;
	@apply sm:items-stretch;
	@apply gap-4;
	@apply items-center;
	@apply justify-start;
	@apply py-1;
	@apply my-1;
}
</style>
