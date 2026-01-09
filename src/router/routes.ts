export const ROUTES = {
  HOME: {
    PATH: '/',
    NAME: 'Home',
  },
  LOGIN: {
    PATH: '/login',
    NAME: 'Login',
  },
  UI_GUIDE: {
    PATH: '/ui-guide',
    NAME: 'UIGuide',
  },
  EVENT_DETAIL: {
    PATH: '/events/:id',
    NAME: 'EventDetail',
  },
  NOT_FOUND: {
    PATH: '/:pathMatch(.*)*',
    NAME: 'NotFound',
  },
};
