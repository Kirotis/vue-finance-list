<script setup lang="ts">
import { useAuthStore } from '@/features/auth/model/auth.store'
import { FormInst, FormRules, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { CheckboxOutline } from '@vicons/ionicons5'

const store = useAuthStore()
const message = useMessage()

const isLoading = ref(false)
const formValue = ref<{ login: string; password: string }>({
	login: '',
	password: '',
})
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
	login: {
		required: true,
		trigger: ['input', 'blur'],
		message: 'Login is required',
	},
	password: {
		required: true,
		trigger: ['input', 'blur'],
		message: 'Password is required',
	},
}

function tryLogin() {
	formRef.value?.validate(errors => {
		if (errors) {
			return
		}
		isLoading.value = true
		store
			.login(formValue.value.login, formValue.value.password)
			.catch(error => {
				console.log('error :>> ', error);
				message.warning(error || '?????')
			})
			.finally(() => (isLoading.value = false))
	})
}
</script>

<template>
	<div class="flex h-full items-center justify-center">
		<div
			class="flex w-80 flex-col gap-2 rounded-sm border border-color-text p-5"
		>
			<section class="text-2xl">
				<h2>LogIn form</h2>
			</section>
			<n-form
				class="flex flex-col items-stretch"
				ref="formRef"
				:disabled="isLoading"
				:rules="rules"
				:model="formValue"
			>
				<n-form-item class="m-1 !w-full" label="Login" path="login">
					<n-input v-model:value="formValue.login" />
				</n-form-item>
				<n-form-item class="m-1 !w-full" label="Password" path="password">
					<n-input v-model:value="formValue.password" type="password" />
				</n-form-item>
			</n-form>
			<n-button :loading="isLoading" secondary @click="tryLogin">
				<template #icon>
					<n-icon color="green" :component="CheckboxOutline" />
				</template>
				Confirm
			</n-button>
		</div>
	</div>
</template>
