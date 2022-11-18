<script lang="ts" setup>
import { useThemeStore } from './model/theme.store'
import ThemeButton from '../../entites/header/ThemeButton.vue'
import NavigationDropDown from './NavigationDropDown.vue'
import { useAuthStore } from '../auth/model/auth.store'
import { LogOut } from '@vicons/ionicons5'

const store = useThemeStore()
const authStore = useAuthStore()
</script>

<template>
	<header class="flex flex-row justify-between justify-items-stretch p-3">
		<router-link to="/">
			<section>
				<h2 class="text-3xl font-bold">Finance app </h2>
			</section>
		</router-link>
		<div class="flex gap-2">
			<template v-if="authStore.isAuthorized">
				<span class="text-xl">
					{{ authStore.user?.login }}
				</span>
				<n-button @click="authStore.logout" secondary>
					<template #icon>
						<n-icon :component="LogOut" />
					</template>
				</n-button>
				<NavigationDropDown />
			</template>
			<!-- <template v-else> </template> -->
			<ThemeButton
				:theme="store.currentTheme"
				@toggleTheme="store.toggleTheme"
			></ThemeButton>
		</div>
	</header>
</template>
