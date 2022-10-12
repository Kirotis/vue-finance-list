<script lang="ts" setup>
import { LogsFilterState } from '@/features/logs/model/logs.store'
import { CheckboxOutline, Search } from '@vicons/ionicons5'
import { FormInst, NModal, NDatePicker } from 'naive-ui'
import { computed, onUpdated, ref } from 'vue'
import LogFilter from '@/entites/logs/LogFilter.vue'

type LogFilterForm = Pick<
	LogsFilterState,
	'startDate' | 'endDate' | 'categoryFilter' | 'search'
>

interface LogPopupFormProps {
	filter: LogFilterForm
	show: boolean
}

const props = defineProps<LogPopupFormProps>()
const formRef = ref<FormInst | null>(null)
const formValue = ref<{
	range?: [number, number] | null
	categoryFilter: string[]
	search: string
}>({
	// startDate: undefined,
	// endDate: undefined,
	range: null,
	categoryFilter: [],
	search: '',
})
const emit = defineEmits<{
	(event: 'update:show', value: boolean): void
	(event: 'sendResult', value: LogFilterForm): void
}>()

const showModal = computed({
	get: () => props.show,
	set: (value: boolean) => emit('update:show', value),
})

onUpdated(() => {
	formValue.value = {
		range:
			props.filter.startDate && props.filter.endDate
				? [
						props.filter.startDate?.valueOf() ?? 0,
						props.filter.endDate?.valueOf() ?? Date.now(),
				  ]
				: null,
		categoryFilter: props.filter.categoryFilter || [],
		search: props.filter.search || '',
	}
})
function confirmForm() {
	formRef.value?.validate(errors => {
		if (!errors) {
			const [firstDate, lastDate] = formValue.value.range || []
			return emit('sendResult', {
				startDate: firstDate ? new Date(firstDate) : undefined,
				endDate: lastDate ? new Date(lastDate) : undefined,
				categoryFilter: formValue.value.categoryFilter || [],
				search: formValue.value.search,
			})
		}
	})
}
</script>

<template>
	<n-modal
		v-model:show="showModal"
		preset="dialog"
		title="Log filter"
		class="border-primary-2 bg-primary-3 dark:border-primary-dark-2 dark:bg-primary-dark-3"
	>
		<n-form
			class="flex flex-col items-stretch"
			ref="formRef"
			inline
			:label-width="80"
			:model="formValue"
		>
			<n-form-item
				class="m-1 block !w-full md:hidden"
				label="Search"
				path="search"
			>
				<n-input
					v-model:value="formValue.search"
					title="Search"
					placeholder="Search"
				>
					<template #prefix>
						<n-icon :component="Search"></n-icon>
					</template>
				</n-input>
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Category" path="categoryFilter">
				<LogFilter v-model:filter="formValue.categoryFilter"></LogFilter>
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Range" path="range">
				<n-date-picker
					v-model:value="formValue.range"
					type="datetimerange"
					clearable
				/>
			</n-form-item>
		</n-form>
		<template #action>
			<n-button secondary @click="confirmForm">
				<template #icon>
					<n-icon color="green" :component="CheckboxOutline" />
				</template>
				Confirm
			</n-button>
		</template>
	</n-modal>
</template>
