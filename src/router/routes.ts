export const ROUTES = {
  HOME: {
    PATH: '/',
    NAME: 'Home',
  },
  ABOUT: {
    PATH: '/about',
    NAME: 'About',
  },
  LOGIN: {
    PATH: '/login',
    NAME: 'Login',
  },
  UI_GUIDE: {
    PATH: '/ui-guide',
    NAME: 'UIGuide',
  },
  NOT_FOUND: {
    PATH: '/:pathMatch(.*)*',
    NAME: 'NotFound',
  },
};
