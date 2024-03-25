import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: import("../views/home/HomeView")
		},
		{
			path: "/about",
			name: "about",
			component: () => import("../views/about/AboutView")
		},
		{
			path: "/pokemon",
			name: "pokemon",
			component: () => import("../views/pokemon/PokemonView.vue")
		}
	]
})

export default router
