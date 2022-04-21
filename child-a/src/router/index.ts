import { createRouter, Router, RouterHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    component: () => import('../views/Page1.vue')
  },
  {
    path: '/page1',
    component: () => import('../views/Page1.vue')
  },
  {
    path: '/page2',
    component: () => import('../views/Page2.vue')
  },
  {
    path: '/page3',
    component: () => import('../views/Page3.vue')
  }
]

export function createRouterByHistory(history: RouterHistory): Router {
  return createRouter({
    history,
    routes
  })
}
