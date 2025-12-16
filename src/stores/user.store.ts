import { defineStore } from 'pinia';
import type { IUserState } from '@/types/user';

export const useUserStore = defineStore('UserStore', {
  state: (): IUserState => {
    return {
      email: 'test@gmail.com',

      isFetchingUser: false,
      isAuthenticated: false,
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
    setUserData(data: { email: string; isAuthenticated: boolean }) {
      this.$patch({ email: data.email, isAuthenticated: data.isAuthenticated });
    },
  },
});

export type IUserStore = ReturnType<typeof useUserStore>;
