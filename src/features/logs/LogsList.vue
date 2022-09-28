<script setup lang="ts">
import { ILogItem } from '@/shared/types/ILogItem'
import LogCard from '@/entites/logs/LogCard.vue'
import SortButton from './SortButton.vue';
import { ref } from 'vue';


export interface LogsListProps {
	logs: ILogItem[]
}

defineProps<LogsListProps>()
const sortMode = ref<"asc" | "desc">('asc')
</script>

<template>
	<div class="container mx-auto">
		<div class="flex">
			<SortButton v-model:sortMode="sortMode"></SortButton>
		</div>
		<div class="logs-list">
			<LogCard v-for="log in logs" :key="log.id" :item="log"></LogCard>
		</div>
	</div>
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
