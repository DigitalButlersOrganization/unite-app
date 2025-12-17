import { defineStore } from 'pinia';
import type { IUserState } from '@/types/user';

export const useUserStore = defineStore('UserStore', {
  state: (): IUserState => {
    return {
      email: '',

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
  },
});

export type IUserStore = ReturnType<typeof useUserStore>;
