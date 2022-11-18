<script lang="ts" setup>
import NavigationDropDown from './NavigationDropDown.vue'
import { useAuthStore } from '../auth/model/auth.store'

const authStore = useAuthStore()
</script>

<template>
	<header class="flex flex-row justify-between justify-items-stretch p-3">
		<router-link to="/">
			<section>
				<h2 class="text-3xl font-bold">Finance app</h2>
			</section>
		</router-link>
		<div class="flex gap-2">
			<template v-if="authStore.isAuthorized">
				<NavigationDropDown />
			</template>
			<!-- <template v-else> </template> -->
			<!-- <ThemeButton
				:theme="store.currentTheme"
				@toggleTheme="store.toggleTheme"
			></ThemeButton> -->
		</div>
	</header>
</template>
