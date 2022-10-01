<script lang="ts" setup>
import { useThemeStore } from './model/theme.store'
import ThemeButton from '../../entites/header/ThemeButton.vue'

const store = useThemeStore()
</script>

<template>
	<header class="flex flex-row justify-items-stretch p-3 justify-between">
		<router-link to="/">
			<section>
				<h2 class="text-3xl font-bold">My App</h2>
			</section>
		</router-link>
		<div>
			<ThemeButton :theme="store.currentTheme" @toggleTheme="store.toggleTheme"></ThemeButton>
		</div>
	</header>
</template>
