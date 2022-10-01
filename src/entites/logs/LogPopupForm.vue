<script lang="ts" setup>
import { ILogItem } from '@/shared/types/ILogItem'
import { computed, ref } from 'vue'
import { FormInst, NModal, FormRules } from 'naive-ui'
import { Close } from '@vicons/ionicons5'

interface LogModalForm {
	show: boolean
	form: Partial<Omit<ILogItem, 'id' | 'date'>>
}

const props = defineProps<LogModalForm>()
const formValue = ref({
	...props.form,
})
const emit = defineEmits<{
	(id: 'update:show', value: boolean): void
}>()
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {}
const showModal = computed({
	get() {
		return props.show
	},
	set(value) {
		emit('update:show', value)
	},
})
function closeModal() {
    emit('update:show', false)

}
</script>

<template>
	<n-modal
		v-model:show="showModal"
		preset="dialog"
		title="Dialog"
		class="border-primary-2 bg-primary-3 dark:border-primary-dark-2 dark:bg-primary-dark-3"
		:closable="false"
	>
		<n-form
			ref="formRef"
			inline
			:label-width="80"
			:model="formValue"
			:rules="rules"
		>
			<n-form-item label="Title" path="title">
				<n-input v-model:value="formValue.title" />
			</n-form-item>
			<n-form-item label="Category" path="category">
				<n-input v-model:value="formValue.category" />
			</n-form-item>
			<n-form-item label="Money" path="money">
				<n-input-number v-model:value="formValue.money" />
			</n-form-item>
			<!-- <n-form-item>
				<n-button @click="handleValidateClick"> Validate </n-button>
			</n-form-item> -->
		</n-form>

		<template #action>
			<n-button
				secondary
                color="red"
				@click="closeModal"
			>
				<template #icon>
					<n-icon :component="Close" />
				</template>
                Close
			</n-button>
		</template>
	</n-modal>
</template>
