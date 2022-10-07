<script setup lang="ts">
import LogCard from '@/entites/logs/LogCard.vue'
import SortButton from '@/entites/logs/SortButton.vue'
import { useLogsStore } from './model/logs.store'
import LogPopupForm from '@/entites/logs/LogPopupForm.vue'
import { Add } from '@vicons/ionicons5'
import { ILogItem } from '@/shared/types/ILogItem'
import { useVirtualList } from '@vueuse/core'
import { computed } from 'vue'
import LogFilter from '@/entites/logs/LogFilter.vue'

const store = useLogsStore()
function popupResult(event: Omit<ILogItem, 'id' | 'date'>) {
	if (store.updateId) {
		return store.updateLog(store.updateId, event)
	}
	return store.addLog(event)
}

const computedList = computed(() => [...store.logsView])

const { list, containerProps, wrapperProps } = useVirtualList(computedList, {
	itemHeight: 132,
})
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<div class="flex justify-between">
			<div class="min-w-80 w-80">
				<LogFilter v-model:filter="store.categoryFilter"></LogFilter>
			</div>
			<div class="flex gap-2">
				<SortButton v-model:sortMode="store.sort"></SortButton>
				<n-button @click="store.startCreate" secondary>
					<template #icon>
						<n-icon :component="Add" />
					</template>
					Add log
				</n-button>
			</div>
		</div>
		<div class="h-max" v-bind="containerProps">
			<div class="logs-list" v-bind="wrapperProps">
				<LogCard
					v-for="{ data } in list"
					:key="data.id"
					:item="data"
					@click.stop="store.startUpdate(data.id)"
				></LogCard>
			</div>
		</div>
	</div>
	<LogPopupForm
		v-model:show="store.showPopup"
		:form="store.editableItem"
		@sendResult="popupResult"
	></LogPopupForm>
</template>

<style scoped lang="scss">
.logs-list {
	@apply flex;
	@apply flex-col;
	@apply items-center;
	@apply gap-4;
	@apply items-center;
	@apply justify-start;
	// @apply py-1;
}
</style>
