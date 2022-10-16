<script lang="ts" setup>
import { ILogItem } from '@/shared/types/ILogItem'
import { computed, onUpdated, ref } from 'vue'
import { FormInst, NModal, FormRules } from 'naive-ui'
import { CheckboxOutline } from '@vicons/ionicons5'
import { ICategories } from '../categories'

interface LogModalForm {
	show: boolean
	categories?: ICategories[]
	form: Partial<Omit<ILogItem, 'id' | 'date'>>
	loading: boolean
}

const props = defineProps<LogModalForm>()
const formValue = ref({
	title: '',
	categoryId: '',
	money: 100,
})
const emit = defineEmits<{
	(id: 'update:show', value: boolean): void
	(id: 'sendResult', value: Omit<ILogItem, 'id' | 'date'>): void
}>()
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {}
const showModal = computed({
	get: () => props.show,
	set: (value: boolean) => emit('update:show', value),
})

const options = computed(
	() =>
		props.categories?.map(({ id, name }) => ({ value: id, label: name })) ?? []
)
function confirmForm() {
	formRef.value?.validate(errors => {
		if (!errors) {
			return emit('sendResult', formValue.value)
		}
	})
}

onUpdated(() => {
	formValue.value = {
		title: props.form.title || '',
		categoryId: props.form.categoryId || '1',
		money: props.form.money || 100,
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
			<n-form-item class="m-1 !w-full" label="Title" path="title">
				<n-input v-model:value="formValue.title" />
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Category" path="category">
				<n-select v-model:value="formValue.categoryId" :options="options" />
			</n-form-item>
			<n-form-item class="m-1 !w-full" label="Money" path="money">
				<n-input-number class="w-full" v-model:value="formValue.money" :min="0">
					<template #prefix> ♦ </template>
				</n-input-number>
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
