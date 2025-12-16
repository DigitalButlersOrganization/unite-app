import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/routes';
// import { useUserStore } from '@/stores'
// import { watch } from 'vue'

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
      component: () => import(`@/views/${ROUTES.LOGIN.NAME}.vue`),
      meta: { keepAlive: true, isAuthPage: true },
    },
    {
      path: ROUTES.UI_GUIDE.PATH,
      name: ROUTES.UI_GUIDE.NAME,
      component: () => import(`@/views/${ROUTES.UI_GUIDE.NAME}.vue`),
      meta: { keepAlive: true, isAuthPage: true },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()

//   const isAuthenticated = userStore.isAuthenticated

//   const isAuthPage = to.meta.isAuthPage

//   if (!isAuthenticated && !isAuthPage) {
//     next({ path: ROUTES.LOGIN.PATH })
//   } else if (isAuthenticated && isAuthPage) {
//     next({ path: ROUTES.HOME.PATH })
//   } else {
//     next()
//   }

//   watch(
//     () => userStore.isAuthenticated,
//     (isAuthenticated) => {
//       if (isAuthenticated && isAuthPage) {
//         router.push(ROUTES.HOME.PATH)
//       }
//     },
//   )
// })

export default router;
