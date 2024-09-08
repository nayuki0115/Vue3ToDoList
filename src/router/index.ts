import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Vue3 To Do List' }
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue3 To Do List'
  next()
})

export default router
