<script lang="ts" setup>
import LogsList from '@/features/logs/LogsList.vue'
import LogControlPanel from '@/features/logs/LogControlPanel.vue'
import { useLogsStore } from '@/features/logs/model/logs.store'
import { onMounted } from 'vue'

const store = useLogsStore()

onMounted(() => store.initStore())
</script>

<template>
	<div class="container mx-auto flex h-full flex-col">
		<LogControlPanel />
		<LogsList />
	</div>
</template>
