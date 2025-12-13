import { instance } from '@/services/api'
import { toast } from 'vue3-toastify'
import type { IUserStore } from '@/stores/user.store'
import type { ILoadingStore } from '@/stores/loading.store'
import type { Router } from 'vue-router'
import { ROUTES } from '@/router/routes'
import type { IStore } from '@/stores'

export const auth = {
  getUser: async ({ store }: { store: IStore }) => {
    instance
      .get('/api/user/current')
      .then((response) => {
        if (response.status === 200) {
          const userStore = store.useUserStore()

          userStore.setUserData({ email: response.data.user.email, isAuthenticated: true })
        }
      })
      .finally(() => {
        const userStore = store.useUserStore()
        userStore.setFetchingUser(false)
      })
  },
  login: async (payload: {
    email: string
    password: string
    rememberMe: boolean
    userStore: IUserStore
    loadingStore: ILoadingStore
    router: Router
  }) => {
    const { email, password, rememberMe, userStore, loadingStore, router } = payload
    instance
      .post('/auth/login', { email, password, rememberMe })
      .then((response) => {
        router.push({ path: ROUTES.HOME.PATH })
        userStore.setUserData({ ...response.data.userData, isAuthenticated: true })
      })
      .catch(({ response }) => {
        if (response && response.data && response.data.error) {
          toast(response.data.error, { type: 'error' })
        } else {
          toast('An unexpected error occurred', { type: 'error' })
        }
      })
      .finally(() => {
        loadingStore.set(false)
      })
  },
}
