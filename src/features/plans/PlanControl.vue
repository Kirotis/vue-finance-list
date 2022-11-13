<script lang="ts" setup>
import { Add } from '@vicons/ionicons5'
import { useCategoryStore } from '@/features/categories/model/categories.store'
import { EditablePlan } from '@/shared/types'
import PlanPopupForm from '@/entites/plans/PlanPopupForm.vue'
import { NSpin, NButton, NIcon } from 'naive-ui';
import { usePlanStore } from './model/plan.store';

const store = usePlanStore()
const categoryStore = useCategoryStore()

function popupResult(event: EditablePlan) {
	if (store.updateId) {
		return store.updatePlan(store.updateId, event)
	}
	return store.addPlan(event)
}
</script>

<template>
	<div class="flex justify-end gap-2">
		<n-spin size="small" v-if="store.isLoading" />
		<n-button @click="store.startCreate" secondary>
			<template #icon>
				<n-icon :component="Add" />
			</template>
			Add plan
		</n-button>
	</div>
	<PlanPopupForm
		v-model:show="store.showPopup"
		:form="store.editableItem"
		:categories="categoryStore.categories"
		:loading="store.formLoading"
		@sendResult="popupResult"
	></PlanPopupForm>
</template>
