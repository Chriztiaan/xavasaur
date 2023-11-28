import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

type CustomRouteRecord = RouteRecordRaw & { icon: string };

// 1. Define some routes
export const routes: CustomRouteRecord[] = [{ path: '/', name: 'Tasks', component: () => import('@/modules/home/HomePage.vue'), icon: 'mdi-format-list-checks' }];

export const routerPlugin = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes, // short for `routes: routes`
});
