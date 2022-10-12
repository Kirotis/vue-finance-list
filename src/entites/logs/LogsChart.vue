<script lang="ts" setup>
// import { useLogsStore } from '@/features/logs/model/logs.store'
import { Chart, Responsive, Pie, Tooltip } from 'vue3-charts'
interface LogChartProps {
	data: { name: string; value: number }[]
}
defineProps<LogChartProps>()
// const logStore = useLogsStore()
</script>

<template>
	<Responsive class="container mx-auto flex items-center p-4">
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
