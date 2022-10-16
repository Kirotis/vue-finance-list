<script setup lang="ts">
import LogCard from '@/entites/logs/LogCard.vue'
import { useLogsStore } from './model/logs.store'
import { useVirtualList } from '@vueuse/core'
import { computed, onMounted, watch } from 'vue'
import LogControlPanel from './LogControlPanel.vue'

const store = useLogsStore()

onMounted(() => store.initStore())


const computedList = computed(() => [...store.logsView])

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
	computedList,
	{
		itemHeight: 132,
	}
)

watch(computedList, () => {
	scrollTo(0)
	// store.loadLogs()
})
// const showChart = ref<boolean>(false)
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<LogControlPanel />
		<div class="h-full md:flex">
			<div v-bind="containerProps" class="h-full w-full md:block">
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
