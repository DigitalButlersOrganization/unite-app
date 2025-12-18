import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/routes';
// import { useUserStore } from '@/stores';
// import { watch } from 'vue';

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
      meta: { keepAlive: true },
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
      meta: { keepAlive: true },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();

//   const isAuthPage = to.meta.isAuthPage;

//   // Ждем пока проверка авторизации завершится
//   if (userStore.isFetchingUser) {
//     // Можно добавить watcher для ожидания
//     const unwatch = watch(
//       () => userStore.isFetchingUser,
//       (isFetching) => {
//         if (!isFetching) {
//           unwatch();
//           // Повторно вызываем навигацию после загрузки
//           next({ ...to, replace: true });
//         }
//       },
//     );
//     return;
//   }

//   const isAuthenticated = userStore.isAuthenticated;

//   if (!isAuthenticated && !isAuthPage) {
//     next({ path: ROUTES.LOGIN.PATH });
//   } else if (isAuthenticated && isAuthPage) {
//     next({ path: ROUTES.HOME.PATH });
//   } else {
//     next();
//   }
// });

export default router;
