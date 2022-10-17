<script lang="ts" setup>
import { useThemeStore } from './model/theme.store'
import ThemeButton from '../../entites/header/ThemeButton.vue'
import NavigationDropDown from './NavigationDropDown.vue'

const store = useThemeStore()
</script>

<template>
	<header class="flex flex-row justify-between justify-items-stretch p-3">
		<router-link to="/">
			<section>
				<h2 class="text-3xl font-bold">My App</h2>
			</section>
		</router-link>
		<div class="flex gap-2">
			<NavigationDropDown />
			<ThemeButton
				:theme="store.currentTheme"
				@toggleTheme="store.toggleTheme"
			></ThemeButton>
		</div>
	</header>
</template>
