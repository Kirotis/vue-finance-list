/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, h, PropType } from 'vue'
import { Pie } from 'vue-chartjs'
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	CategoryScale,
	Plugin,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
export interface ChartData {
	labels: string[]
	datasets: {
		backgroundColor: string[]
		data: number[]
	}[]
}
export const defaultChartData = {
	labels: [],
	datasets: [
		{
			backgroundColor: [],
			data: [],
		},
	],
}

export default defineComponent({
	name: 'PieChart',
	components: {
		Pie,
	},
	props: {
		chartId: {
			type: String,
			default: 'pie-chart',
		},
		width: {
			type: Number,
			default: 400,
		},
		height: {
			type: Number,
			default: 400,
		},
		cssClasses: {
			default: '',
			type: String,
		},
		styles: {
			type: Object as PropType<Partial<CSSStyleDeclaration>>,
			default: () => ({}),
		},
		plugins: {
			type: Array as PropType<Plugin<'pie'>[]>,
			default: () => [],
		},
		chartData: {
			type: Object,
			default: (): ChartData => defaultChartData,
		},
	},
	updated() {
		(this.$refs.chart as any)?.update()
		if ((this.$refs.chart as any)?.data) {
			(this.$refs.chart as any).data = this.chartData
		}
	},
	setup(props) {
		return () =>
			h(Pie, {
				ref: 'chart',
				chartData: props.chartData,
				chartId: props.chartId,
				styles: props.styles,
				width: props.width,
				height: props.height,
				cssClasses: props.cssClasses,
				plugins: props.plugins,
			} as any)
	},
})
