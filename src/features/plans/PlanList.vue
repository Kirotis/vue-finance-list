<script setup lang="ts">
import { useVirtualList } from '@vueuse/core'
import { computed, watch } from 'vue'
import { usePlanStore } from '@/features/plans/model/plan.store'
import PlanCard from '@/entites/plans/PlanCard.vue'

const store = usePlanStore()

const computedList = computed(() => [...store.plansView])

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
	computedList,
	{
		itemHeight: 144,
	}
)

watch(computedList, () => {
	scrollTo(0)
})
</script>

<template>
	<div class="h-full md:flex">
		<!-- <n-spin size="large" v-if="store.isLoading" /> -->
		<div v-bind="containerProps" class="h-full w-full md:block">
			<div class="plan-list" v-bind="wrapperProps">
				<PlanCard
					v-for="{ data } in list"
					:key="data.id"
					:item="data"
					@update-plan="store.startUpdate(data.id)"
					@delete-plan="store.removePlan(data.id)"
					@go-to-logs="store.goToLogs(data)"
				></PlanCard>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.plan-list {
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
