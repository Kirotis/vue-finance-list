import { useAuthStore } from '@/features/auth/model/auth.store'
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
		component: () =>
			import(/* webpackChunkName: "categories" */ './CategoriesPage.vue'),
	},
	{
		path: '/plans',
		name: 'plans',
		component: () => import(/* webpackChunkName: "plans" */ './PlansPage.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import(/* webpackChunkName: "login" */ './LoginPage.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach(to => {
	const publicPages = ['/login']
	const authRequired = !publicPages.includes(to.path)
	const auth = useAuthStore()

	if (authRequired && !auth.isAuthorized) {
		auth.routerNavigate = to.fullPath
		return '/login'
	}
})

export default router
