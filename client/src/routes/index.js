import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/HomeView.vue"
import Movie from "@/views/MovieView.vue"
import About from "@/views/AboutView.vue"
import NotFound from "@/views/NotfoundView.vue"

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/movie/:id', name: 'Movie', component: Movie },
    { path: '/about', name: 'About', component: About },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router