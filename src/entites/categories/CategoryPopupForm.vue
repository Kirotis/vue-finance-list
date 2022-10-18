<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { FormInst, NModal, FormRules } from 'naive-ui'
import { CheckboxOutline } from '@vicons/ionicons5'
import { ICategory } from '@/shared/types'

interface CategoryModalForm {
	show: boolean
	form: Partial<Pick<ICategory, 'name' | 'image'>>
	loading: boolean
}

const props = defineProps<CategoryModalForm>()
const formValue = ref({
	name: '',
	image: '',
})
const emit = defineEmits<{
	(id: 'update:show', value: boolean): void
	(id: 'sendResult', value: Pick<ICategory, 'name' | 'image'>): void
}>()
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {}
const showModal = computed({
	get: () => props.show,
	set: (value: boolean) => emit('update:show', value),
})

function confirmForm() {
	formRef.value?.validate(errors => {
		if (!errors) {
			return emit('sendResult', formValue.value)
		}
	})
}

onUpdated(() => {
	formValue.value = {
		image: props.form?.image || '',
		name: props.form?.name || '',
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
			<n-form-item class="m-1 !w-full" label="Image" path="image">
				<n-input v-model:value="formValue.image" />
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
