<script lang="ts" setup>
import LogsList from '@/features/logs/LogsList.vue'
import LogControlPanel from '@/features/logs/LogControlPanel.vue'
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<LogControlPanel />
		<LogsList />
	</div>
</template>
