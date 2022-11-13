<script lang="ts" setup>
import { EditablePlan, ICategory, PlanType } from '@/shared/types'
import { CheckboxOutline } from '@vicons/ionicons5'
import { NModal, FormInst, FormRules } from 'naive-ui'
import { computed, onUpdated, ref } from 'vue'
import LogFilter from '../logs/LogFilter.vue'

interface PlanModalForm {
	show: boolean
	categories: ICategory[]
	form: EditablePlan
	loading: boolean
}

const props = defineProps<PlanModalForm>()
const emit = defineEmits<{
	(id: 'update:show', value: boolean): void
	(id: 'sendResult', value: EditablePlan): void
}>()

const formRef = ref<FormInst | null>(null)
const formValue = ref<
	{
		endDate?: number
		createDate?: number
	} & Required<Omit<EditablePlan, 'endDate' | 'createDate'>>
>({
	name: '',
	type: PlanType.CURRENT,
	endDate: undefined,
	createDate: undefined,
	categories: [],
	moneySubject: 500,
})
const showModal = computed({
	get: () => props.show,
	set: (value: boolean) => emit('update:show', value),
})
const validator = () =>
	formValue.value.createDate &&
	formValue.value.endDate &&
	formValue.value.createDate > formValue.value.endDate
		? new Error('End date must be greater than start date')
		: true
const rules: FormRules = {
	createDate: {
		validator,
		trigger: ['input', 'blur'],
	},
	endDate: {
		validator,
		trigger: ['input', 'blur'],
	},
}

function confirmForm() {
	formRef.value?.validate(errors => {
		if (!errors) {
			return emit('sendResult', {
				...formValue.value,
				endDate: formValue.value.endDate
					? new Date(formValue.value.endDate)
					: undefined,
				createDate: formValue.value.createDate
					? new Date(formValue.value.createDate)
					: undefined,
			})
		}
	})
}

onUpdated(() => {
	formValue.value = {
		name: props.form.name || '',
		type: props.form.type || PlanType.CURRENT,
		endDate: props.form.endDate
			? new Date(props.form.endDate).valueOf()
			: undefined,
		createDate: props.form.createDate
			? new Date(props.form.createDate).valueOf()
			: undefined,
		categories: props.form.categories || [],
		moneySubject: props.form.moneySubject || 500,
	}
})
</script>

<template>
	<n-modal
		v-model:show="showModal"
		preset="dialog"
		title="Log form"
		class="border-primary-2 bg-primary-3 dark:border-primary-dark-2 dark:bg-primary-dark-3"
	>
		<n-form
			class="flex flex-col items-stretch"
			ref="formRef"
			inline
			:label-width="80"
			:disabled="loading"
			:model="formValue"
			:rules="rules"
		>
			<n-form-item class="m-1 !w-full" label="Name" path="name">
				<n-input v-model:value="formValue.name" />
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Category" path="categories">
				<LogFilter
					v-model:filter="formValue.categories"
					:categories="categories"
				></LogFilter>
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Money" path="money">
				<n-input-number
					class="w-full"
					v-model:value="formValue.moneySubject"
					:min="0"
				>
					<template #prefix> ♦ </template>
				</n-input-number>
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Start date" path="createDate">
				<n-date-picker
					class="!w-full"
					v-model:value="formValue.createDate"
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
			<n-button :loading="loading" secondary @click="confirmForm">
				<template #icon>
					<n-icon color="green" :component="CheckboxOutline" />
				</template>
				Confirm
			</n-button>
		</template>
	</n-modal>
</template>
