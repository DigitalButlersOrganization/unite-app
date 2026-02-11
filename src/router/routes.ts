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
  THANK_YOU: {
    PATH: '/thank-you',
    NAME: 'ThankYou',
  },
  EVENT_DETAIL: {
    PATH: '/events/:id',
    NAME: 'EventDetail',
  },
  EVENT_INNER_PAGE: {
    PATH: '/events/:id/:innerId',
    NAME: 'EventInnerPage',
  },
  NOT_FOUND: {
    PATH: '/:pathMatch(.*)*',
    NAME: 'NotFound',
  },
};
