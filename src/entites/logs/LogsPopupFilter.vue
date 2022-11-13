<script lang="ts" setup>
import { LogsFilterState } from '@/features/logs/model/logs.store'
import { CheckboxOutline, Search } from '@vicons/ionicons5'
import { FormInst, NModal, NDatePicker, FormRules } from 'naive-ui'
import { computed, onUpdated, ref } from 'vue'
import LogFilter from '@/entites/logs/LogFilter.vue'
import { ICategory } from '../../shared/types'

type LogFilterForm = Pick<
	LogsFilterState,
	'startDate' | 'endDate' | 'categoryFilter' | 'search'
>

interface LogPopupFormProps {
	filter: LogFilterForm
	show: boolean
	categories: ICategory[]
}

const props = defineProps<LogPopupFormProps>()
const formRef = ref<FormInst | null>(null)
const formValue = ref<{
	categoryFilter: string[]
	search: string
	startDate?: number
	endDate?: number
}>({
	startDate: undefined,
	endDate: undefined,
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

const validator = () =>
	formValue.value.startDate &&
	formValue.value.endDate &&
	formValue.value.startDate > formValue.value.endDate
		? new Error('End date must be greater than start date')
		: true
const rules: FormRules = {
	startDate: {
		validator,
		trigger: ['input', 'blur']
	},
	endDate: {
		validator,
		trigger: ['input', 'blur']
	},
}

onUpdated(() => {
	formValue.value = {
		startDate: props.filter.startDate?.valueOf(),
		endDate: props.filter.endDate?.valueOf(),
		categoryFilter: props.filter.categoryFilter || [],
		search: props.filter.search || '',
	}
})
function confirmForm() {
	formRef.value?.validate(errors => {
		if (!errors) {
			const firstDate = formValue.value.startDate
			const lastDate = formValue.value.endDate
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
			:rules="rules"
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
				<LogFilter
					v-model:filter="formValue.categoryFilter"
					:categories="categories"
				></LogFilter>
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Start date" path="startDate">
				<n-date-picker
					class="!w-full"
					v-model:value="formValue.startDate"
					type="datetime"
					clearable
				/>
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="End date" path="endDate">
				<n-date-picker
					class="!w-full"
					v-model:value="formValue.endDate"
					type="datetime"
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
