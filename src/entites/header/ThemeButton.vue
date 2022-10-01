<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui'
import { Moon, SunnySharp } from '@vicons/ionicons5'
import { computed } from 'vue'

interface SortButtonProps {
	theme: 'dark' | 'light'
}

const props = defineProps<SortButtonProps>()
const emit = defineEmits<{
	(id: 'toggleTheme', value: 'dark' | 'light'): void
}>()

const isDark = computed(() => props.theme == 'dark')
const iconComponent = computed(() => isDark.value ? Moon : SunnySharp)

const text = computed(() => (isDark.value ? 'Dark' : 'Light'))

function onClick() {
	const value: 'dark' | 'light' = isDark.value ? 'light' : 'dark'
	emit('toggleTheme', value)
	return value
}
</script>

<template>
	<n-button @click="onClick" secondary>
		<template #icon>
			<n-icon :component="iconComponent" />
		</template>
		{{ text }}
	</n-button>
</template>
