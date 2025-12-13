import type { IUserStore } from './user.store'
import type { ILoadingStore } from './loading.store'

export { useUserStore } from './user.store'
export { useLoadingStore } from './loading.store'

export interface IStore {
  useUserStore: () => IUserStore
  useLoadingStore: () => ILoadingStore
}
