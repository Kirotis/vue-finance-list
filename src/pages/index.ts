import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: ReadonlyArray<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: () => import('./LogsPage.vue'),
	},
	{
	  path: '/categories',
	  name: 'categories',
	  component: () => import(/* webpackChunkName: "categories" */ './CategoriesPage.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
