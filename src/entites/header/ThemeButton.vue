<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui'
import { Moon, SunnySharp } from '@vicons/ionicons5'
import { computed } from 'vue'
import { ThemeMode } from '@/features/header/model/theme.store'

interface SortButtonProps {
	theme: ThemeMode
}

const props = defineProps<SortButtonProps>()
const emit = defineEmits<{
	(id: 'toggleTheme', value: ThemeMode): void
}>()

const isDark = computed(() => props.theme == 'dark')
const iconComponent = computed(() => (isDark.value ? Moon : SunnySharp))

const text = computed(() => (isDark.value ? 'Dark' : 'Light'))

function onClick() {
	const value: ThemeMode = isDark.value ? 'light' : 'dark'
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
