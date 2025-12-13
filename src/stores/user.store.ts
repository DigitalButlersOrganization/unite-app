import { defineStore } from 'pinia'
import type { IUserState } from '@/types/user'

export const useUserStore = defineStore('UserStore', {
  state: (): IUserState => {
    return {
      email: 'test@gmail.com',
    }
  },
  getters: {
    getUserData(state): IUserState {
      return state
    },
  },
  actions: {
    setUserData(data: { email: string }) {
      this.email = data.email
    },
  },
})

export type IUserStore = ReturnType<typeof useUserStore>
