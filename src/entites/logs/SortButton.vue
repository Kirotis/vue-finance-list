<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui'
import { ChevronUp } from '@vicons/ionicons5'
import { computed } from 'vue'
import { SortModeValues } from '@/features/logs/model/logs.store';

interface SortButtonProps {
	sortMode: SortModeValues
}

const props = defineProps<SortButtonProps>()
const emit = defineEmits<{
	(id: 'update:sortMode', value: SortModeValues): void
}>()

const isAsc = computed(() => props.sortMode == 'asc')

const text = computed(() => (isAsc.value ? 'Asc' : 'Desc'))

function onClick() {
	const value: SortModeValues = isAsc.value ? 'desc' : 'asc'
	emit('update:sortMode', value)
	return value
}
</script>

<template>
	<n-button @click="onClick" secondary>
		<template #icon>
			<n-icon
				:component="ChevronUp"
				class="transition-all duration-300"
				:class="{ 'rotate-180': isAsc }"
			/>
		</template>
		{{ text }}
	</n-button>
</template>