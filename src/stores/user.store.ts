import { defineStore } from 'pinia';
import type { IUserState } from '@/types/user';
import * as store from '@/stores';
import { api } from '@/services/api';

export const useUserStore = defineStore('UserStore', {
  state: (): IUserState => {
    return {
      email: '',
      userFirstName: null,
      userLastName: null,
      isFetchingUser: false,
      isAuthenticated: false,

      isOTPCodeSended: false,
    };
  },
  getters: {
    getUserData(state): IUserState {
      return state;
    },
  },
  actions: {
    setFetchingUser(data: boolean) {
      this.$patch({ isFetchingUser: data });
    },
    setUserData(data: Partial<IUserState>) {
      this.$patch(data);
    },
    async requestUserData() {
      this.setFetchingUser(true);

      const statusOfUserFetching = await api.auth.getCurrentUser({ store });

      if (!statusOfUserFetching) {
        this.setFetchingUser(true);
        api.auth.refreshToken({ store });
      }
    },
    logout() {
      this.$patch({
        email: '',
        isAuthenticated: false,
        isOTPCodeSended: false,
        isFetchingUser: false,
      });
    },
  },
});

export type IUserStore = ReturnType<typeof useUserStore>;
