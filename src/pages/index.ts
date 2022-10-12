import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: ReadonlyArray<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('./LogsPage.vue'),
	},
	// {
	//   path: '/chart',
	//   name: 'chart',
	//   component: () => import(/* webpackChunkName: "chart" */ './ChartPage.vue')
	// }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
