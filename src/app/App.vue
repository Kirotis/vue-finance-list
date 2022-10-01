<script setup lang="ts">
import HeaderComponentVue from '@/features/header/HeaderComponent.vue'
import { useThemeStore } from '@/features/header/model/theme.store'
import LogsList from '@/features/logs/LogsList.vue'
import { darkTheme } from 'naive-ui'
import { computed, onMounted } from 'vue'

const store = useThemeStore()

onMounted(() => store.initTheme())

const theme = computed(() => (store.currentTheme == 'dark' ? darkTheme : null))
</script>

<template>
	<n-config-provider :theme="theme">
		<div class="h-full">
			<HeaderComponentVue />
			<main class="p-3">
				<LogsList></LogsList>
				<!-- <LogCardVue :item=""></LogCardVue> -->
				<!-- <router-view /> -->
			</main>
		</div>
	</n-config-provider>
</template>

<style>
#app {
	height: 100vh;
	width: 100vw;
}
</style>
