<script setup lang="ts">
import LogCard from '@/entites/logs/LogCard.vue'
import SortButton from '@/entites/logs/SortButton.vue'
import { useLogsStore } from './model/logs.store'
import LogPopupForm from '@/entites/logs/LogPopupForm.vue'
import { Add } from '@vicons/ionicons5'

const store = useLogsStore()
</script>

<template>
	<div class="container mx-auto">
		<div class="flex gap-2">
			<SortButton v-model:sortMode="store.sort"></SortButton>
			<n-button
				@click="store.startCreate"
				secondary
			>
				<template #icon>
					<n-icon :component="Add" />
				</template>
				Add log
			</n-button>
		</div>
		<div class="logs-list">
			<LogCard
				v-for="log in store.logsView"
				:key="log.id"
				:item="log"
			></LogCard>
		</div>
	</div>
	<LogPopupForm
		v-model:show="store.showPopup"
		:form="store.editableItem"
	></LogPopupForm>
</template>

<style scoped lang="scss">
.logs-list {
	@apply flex;
	@apply flex-col;
	@apply md:flex-row;
	@apply items-center;
	@apply gap-4;
}
</style>
