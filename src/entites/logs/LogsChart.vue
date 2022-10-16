<script lang="ts" setup>
// import { useLogsStore } from '@/features/logs/model/logs.store'
import { Chart, Responsive, Pie, Tooltip } from 'vue3-charts'
interface LogChartProps {
	data: { name: string; value: number }[]
}
const props = defineProps<LogChartProps>()
// const logStore = useLogsStore()
const axis = {
	primary: {
		domain: props.data.map(({ name }) => name),
		type: 'band',
	},
	secondary: {
		domain: props.data.map(({ name }) => name),
		type: 'linear',
	},
}
</script>

<template>
	<Responsive class="p-4">
		<template #main="{ width }">
			<Chart
				direction="circular"
				:size="{ width, height: 400 }"
				:data="data"
				:margin="{
					left: Math.round((width - 360) / 2),
					top: 20,
					right: 0,
					bottom: 20,
				}"
				:axis="axis"
				:config="{ controlHover: false }"
			>
				<template #layers>
					<Pie
						:dataKeys="['name', 'value']"
						:pie-style="{ innerRadius: 100, padAngle: 0.05 }"
					/>
				</template>
				<template #widgets>
					<Tooltip
						:config="{
							name: {},
							avg: { hide: true },
							pl: { label: 'value' },
							inc: { hide: true },
						}"
						hideLine
					/>
				</template>
			</Chart>
		</template>
	</Responsive>
</template>
