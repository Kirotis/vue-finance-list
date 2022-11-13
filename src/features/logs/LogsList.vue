<script setup lang="ts">
import LogCard from '@/entites/logs/LogCard.vue'
import { useLogsStore } from './model/logs.store'
import { useInfiniteScroll, useVirtualList } from '@vueuse/core'
import { ref } from 'vue'

const store = useLogsStore()

const logsElement = ref<HTMLElement>()
useVirtualList
useInfiniteScroll(
	logsElement,
	() => {
		store.loadLogsPagination(store.logs.length)
	},
	{ distance: 20 }
)
</script>

<template>
	<div class="logs-list" ref="logsElement">
		<LogCard
			v-for="data in store.logsView"
			:key="data.id"
			:item="data"
			:search-text="store.filter.search"
			@click.stop="store.startUpdate(data.id)"
		></LogCard>
	</div>
</template>

<style scoped lang="scss">
.logs-list {
	@apply flex;
	@apply flex-col;
	@apply xl:items-center;
	@apply md:items-center;
	@apply overflow-y-auto;
	@apply h-full;
	@apply w-full;
	// @apply xl:items-center;
	@apply sm:items-stretch;
	@apply gap-4;
	@apply items-center;
	@apply justify-start;
	@apply py-1;
	@apply my-5;
}
</style>
