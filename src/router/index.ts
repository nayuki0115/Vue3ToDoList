import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

interface Meta {
  title?: string;
}

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
  const meta = to.meta as Meta;
  document.title = meta.title || 'Vue3 To Do List';
  next()
})

export default router
