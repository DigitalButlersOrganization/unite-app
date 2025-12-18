import { instance } from '@/services/api';
import { toast } from 'vue3-toastify';
import type { IUserStore } from '@/stores/user.store';
import type { ILoadingStore } from '@/stores/loading.store';
import type { Router } from 'vue-router';
import { ROUTES } from '@/router/routes';
import type { IStore } from '@/stores';
// import type { IStore } from '@/stores';

export const auth = {
  getUser: async ({ store }: { store: IStore }) => {
    const userStore = store.useUserStore();

    instance
      .get('/user/current', {})
      .then((response) => {
        console.log(response);

        if (response.status === 200 && response.data) {
          userStore.setUserData({
            email: response.data.email,
            isAuthenticated: true,
          });
        }
      })
      .catch((error) => {
        console.log('User not authenticated:', error);
        userStore.setUserData({ isAuthenticated: false });
      })
      .finally(() => {
        userStore.setFetchingUser(false);
      });
  },
  getAllEvents: async () => {
    instance
      .get('/event/all')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('User not authenticated:', error);
      })
      .finally(() => {
        console.log('getting of all events');
      });
  },
  getOTPCode: async (payload: {
    email: string;
    userStore: IUserStore;
    loadingStore: ILoadingStore;
  }) => {
    const { email, userStore, loadingStore } = payload;
    instance
      .post('/auth/sign-in', { email, requestOtp: true })
      .then((response) => {
        if (response.data.message) {
          toast(response.data.message, { type: 'success' });
        }

        userStore.setUserData({ isOTPCodeSended: true });
      })
      .catch(({ response }) => {
        console.log(response);

        if (response && response.data && response.data.message) {
          toast(response.data.message, { type: 'error' });
        } else {
          toast('An unexpected error occurred (getOTPCode)', { type: 'error' });
        }
      })
      .finally(() => {
        loadingStore.set(false);
      });
  },
  login: async (payload: {
    email: string;
    OTPCode: string;
    userStore: IUserStore;
    loadingStore: ILoadingStore;
    router: Router;
  }) => {
    const { email, OTPCode, userStore, loadingStore, router } = payload;
    instance
      .post('/auth/sign-in', { email, requestOtp: false, password: OTPCode })
      .then((response) => {
        console.log(response);
        router.push({ path: ROUTES.HOME.PATH });
        userStore.setUserData({ isAuthenticated: true, email });
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred (login)', { type: 'error' });
        }
        userStore.setUserData({ isOTPCodeSended: false });
      })
      .finally(() => {
        loadingStore.set(false);
      });
  },
  logout: async (payload: { userStore: IUserStore; router: Router }) => {
    const { userStore, router } = payload;
    instance
      .post('/auth/sign-out', {})
      .then((response) => {
        console.log(response);
        // userStore.logout();
        userStore.setUserData({ isAuthenticated: false, email: '' });
        router.push({ path: ROUTES.LOGIN.PATH });
      })
      .catch(({ response }) => {
        console.log(response);
        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred (logout)', { type: 'error' });
        }
      })
      .finally(() => {
        console.log('logout finally');
      });
  },
};
