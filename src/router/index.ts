import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '@/router/routes';
import { useUserStore, useEventsStore } from '@/stores';
import { watch } from 'vue';

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
    {
      path: ROUTES.EVENT_DETAIL.PATH,
      name: ROUTES.EVENT_DETAIL.NAME,
      component: () => import(`@/views/${ROUTES.EVENT_DETAIL.NAME}.vue`),
      meta: { keepAlive: false },
    },
    {
      path: ROUTES.EVENT_INNER_PAGE.PATH,
      name: ROUTES.EVENT_INNER_PAGE.NAME,
      component: () => import(`@/views/${ROUTES.EVENT_INNER_PAGE.NAME}.vue`),
      meta: { keepAlive: false },
    },
    {
      path: ROUTES.NOT_FOUND.PATH,
      name: ROUTES.NOT_FOUND.NAME,
      component: () => import(`@/views/${ROUTES.NOT_FOUND.NAME}.vue`),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const eventsStore = useEventsStore();

  // Управление currentEventId
  const isEventPage =
    to.name === ROUTES.EVENT_DETAIL.NAME || to.name === ROUTES.EVENT_INNER_PAGE.NAME;

  if (isEventPage && to.params.id) {
    // Устанавливаем currentEventId при переходе на страницу события или внутреннюю страницу
    eventsStore.currentEventId = to.params.id as string;
  } else if (!isEventPage) {
    // Сбрасываем currentEventId на всех страницах кроме страниц события
    eventsStore.currentEventId = null;
  }

  const isAuthPage = to.meta.isAuthPage;

  // Ждем пока проверка авторизации завершится
  if (userStore.isFetchingUser) {
    // Можно добавить watcher для ожидания
    const unwatch = watch(
      () => userStore.isFetchingUser,
      (isFetching) => {
        if (!isFetching) {
          unwatch();
          // Повторно вызываем навигацию после загрузки
          next({ ...to, replace: true });
        }
      },
    );
    return;
  }

  const isAuthenticated = userStore.isAuthenticated;

  if (!isAuthenticated && !isAuthPage) {
    next({ path: ROUTES.LOGIN.PATH });
  } else if (isAuthenticated && isAuthPage) {
    next({ path: ROUTES.HOME.PATH });
  } else {
    next();
  }
});

export default router;
