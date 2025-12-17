import { instance } from '@/services/api';
import { toast } from 'vue3-toastify';
import type { IUserStore } from '@/stores/user.store';
import type { ILoadingStore } from '@/stores/loading.store';
import type { Router } from 'vue-router';
import { ROUTES } from '@/router/routes';
// import type { IStore } from '@/stores';

export const auth = {
  getUser: async () => {
    instance
      .get('/user/all')
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .finally(() => {
        console.log(1);
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
        router.push({ path: ROUTES.HOME.PATH });
        userStore.setUserData({ ...response.data.userData, isAuthenticated: true });
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred (login)', { type: 'error' });
        }
      })
      .finally(() => {
        loadingStore.set(false);
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
        console.log(response, 'OTP code sent');
        userStore.setUserData({ ...response.data.userData, isOTPCodeSended: true });
        // router.push({ path: ROUTES.HOME.PATH });
      })
      .catch(({ response }) => {
        console.log(response);

        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' });
        } else {
          toast('An unexpected error occurred (getOTPCode)', { type: 'error' });
        }
      })
      .finally(() => {
        loadingStore.set(false);
      });
  },
};
