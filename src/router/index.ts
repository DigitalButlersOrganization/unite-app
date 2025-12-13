import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME.PATH,
      name: ROUTES.HOME.NAME,
      component: () => import(`@/views/${ROUTES.HOME.NAME}.vue`),
      meta: { keepAlive: true },
    },
    {
      path: ROUTES.ABOUT.PATH,
      name: ROUTES.ABOUT.NAME,
      component: () => import(`@/views/${ROUTES.ABOUT.NAME}.vue`),
      meta: { keepAlive: false },
    },
    {
      path: ROUTES.LOGIN.PATH,
      name: ROUTES.LOGIN.NAME,
      component: () => import(`@/views/auth/${ROUTES.LOGIN.NAME}.vue`),
      meta: { keepAlive: true, isAuthPage: true },
    },
  ],
})

export default router
