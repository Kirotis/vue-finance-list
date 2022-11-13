<script setup lang="ts">
import { usePlanStore } from '@/features/plans/model/plan.store'
import PlanControl from '@/features/plans/PlanControl.vue'
import PlanList from '@/features/plans/PlanList.vue'
import { onMounted } from 'vue'
const store = usePlanStore()

onMounted(() => store.initStore())
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<PlanControl />
		<PlanList />
	</div>
</template>
