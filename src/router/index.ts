import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'WelcomePage',

    component: () => import('@/views/WelcomePage.vue')
  },
  {
    path: '/users',
    name: 'UsersList',

    component: () => import('@/views/UsersList.vue')
  },
  {
    path: '/users/:id',
    name: 'UserDetails',

    component: () => import('@/views/UserDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
