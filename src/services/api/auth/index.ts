import { api, instance } from '@/services/api';
import { toast } from 'vue3-toastify';
import type { IUserStore } from '@/stores/user.store';
import type { ILoadingStore } from '@/stores/loading.store';
import type { Router } from 'vue-router';
import { ROUTES } from '@/router/routes';
import type { IStore } from '@/stores';

export const auth = {
  getCurrentUser: async (payload: { store: IStore }) => {
    const { store } = payload;
    const userStore = store.useUserStore();

    return instance
      .get('/user/current', {})
      .then((response) => {
        if (response.status === 200 && response.data) {
          userStore.setUserData({
            email: response.data.email,
            isAuthenticated: true,
          });
          api.events.getAllEvents({ store });
        }
        return true;
      })
      .catch(() => {
        userStore.setUserData({ isAuthenticated: false });
        return false;
      })
      .finally(() => {
        userStore.setFetchingUser(false);
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
        if (response?.data?.message) {
          toast(response.data.message, { type: 'error' });
        } else if (response?.data?.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred while attempting to request the OTP code', {
            type: 'error',
          });
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
        if (response.status === 200) {
          userStore.requestUserData();
          router.push({ path: ROUTES.HOME.PATH });
        }
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred during the authorization attempt', { type: 'error' });
        }
      })
      .finally(() => {
        userStore.setUserData({ isOTPCodeSended: false });
        loadingStore.set(false);
      });
  },
  refreshToken: async (payload: { store: IStore }) => {
    const { store } = payload;
    const userStore = store.useUserStore();

    instance
      .post('/auth/refresh', {})
      .then((response) => {
        if (response.status === 200) {
          api.auth.getCurrentUser({ store });
        }
      })
      .catch(() => {
        userStore.setFetchingUser(false);
      });
  },
  logout: async (payload: { store: IStore; router: Router }) => {
    const { store, router } = payload;
    const userStore = store.useUserStore();
    instance
      .post('/auth/sign-out', {})
      .then((response) => {
        console.log(response);
        userStore.logout();
        router.push({ path: ROUTES.LOGIN.PATH });
      })
      .catch(({ response }) => {
        console.log(response);
        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred (logout)', { type: 'error' });
        }
      });
  },
};
