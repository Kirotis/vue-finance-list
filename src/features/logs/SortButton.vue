<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui'
import { ArrowUp } from '@vicons/ionicons5'
import { computed } from 'vue'

interface SortButtonProps {
	sortMode: 'asc' | 'desc'
}

const props = defineProps<SortButtonProps>()
const emit = defineEmits<{
	(id: 'update:sortMode', value: 'asc' | 'desc'): void
}>()

const isAsc = computed(() => props.sortMode == 'asc')

const text = computed(() => (isAsc.value ? 'Asc' : 'Desc'))

function onClick() {
	const value = props.sortMode == 'desc' ? 'asc' : 'desc'
	emit('update:sortMode', value)
	return value
}
</script>

<template>
	<n-button class="button-style" @click="onClick" secondary>
		<template #icon>
			<n-icon :component="ArrowUp" class="transition-all duration-300" :class="{ 'rotate-180': !isAsc }" />
		</template>
		{{ text }}
	</n-button>
</template>
<style scoped lang="scss">
.button-style {
	@apply m-1;
	@apply w-20;
	@apply transition-all;

	@apply ring;
	@apply ring-primary-1;
	@apply dark:ring-primary-dark-1;

	@apply hover:-translate-y-1;
	@apply hover:shadow-lg;
	@apply hover:shadow-primary-2;
	@apply hover:dark:shadow-primary-dark-2;
}
</style>
