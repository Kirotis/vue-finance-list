import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: ReadonlyArray<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import(/* webpackChunkName: "home" */ './LogsPage.vue'),
	},
	// {
	//   path: '/about',
	//   name: 'about',
	//   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
	// }
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
