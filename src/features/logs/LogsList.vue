<script setup lang="ts">
import LogCard from '@/entites/logs/LogCard.vue'
import SortButton from '@/entites/logs/SortButton.vue'
import { useLogsStore } from './model/logs.store'
import LogPopupForm from '@/entites/logs/LogPopupForm.vue'
import { Add } from '@vicons/ionicons5'
import { ILogItem } from '@/shared/types/ILogItem'
import { useVirtualList } from '@vueuse/core'
import { storeToRefs } from 'pinia'

const store = useLogsStore()
// const refStore = storeToRefs(store)
function popupResult(event: Omit<ILogItem, 'id' | 'date'>) {
	if (store.updateId) {
		return store.updateLog(store.updateId, event)
	}
	return store.addLog(event)
}
// const { list, containerProps, wrapperProps } = useVirtualList(
// 	refStore.logsView,
// 	{
// 		itemHeight: 170,
// 		overscan: 1,
// 	}
// )
</script>

<template>
	<div class="container mx-auto">
		<div class="flex gap-2">
			<SortButton v-model:sortMode="store.sort"></SortButton>
			<n-button @click="store.startCreate" secondary>
				<template #icon>
					<n-icon :component="Add" />
				</template>
				Add log
			</n-button>
		</div>
		<div class="logs-list" v-auto-animate >
			<LogCard v-for="data in store.logsView" :key="data.id" :item="data"></LogCard>
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
	@apply md:flex-row;
	@apply items-center;
	@apply gap-4;
	@apply flex-wrap;
	@apply justify-center;
}
</style>
