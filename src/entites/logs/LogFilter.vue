<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { computed, ref } from 'vue'
import { categories } from '../categories'
import { Search } from '@vicons/ionicons5'

export interface ILogFilter {
	filter: string[]
}

const props = defineProps<ILogFilter>()

const emit = defineEmits<{
	(event: 'update:filter', filter: string[]): void
}>()

const filterValue = computed({
	get() {
		return props.filter
	},
	set(value) {
		emit('update:filter', value)
	},
})

const options = categories.map(({ id, name }) => ({ value: id, label: name }))

const show = ref<boolean>(false)
</script>

<template>
	<n-select
		placeholder="Select filter"
		v-model:value="filterValue"
		v-model:show="show"
		:options="options"
		multiple
		filterable
	>
		<template v-if="show" #arrow>
			<Search></Search>
		</template>
	</n-select>
	<!-- :fallback-option="trim" -->
</template>
