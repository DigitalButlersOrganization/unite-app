import type { IUserStore } from './user.store';
import type { ILoadingStore } from './loading.store';
import type { IEventsStore } from './events.store';

export { useUserStore } from './user.store';
export { useLoadingStore } from './loading.store';
export { useEventsStore } from './events.store';

export interface IStore {
  useUserStore: () => IUserStore;
  useLoadingStore: () => ILoadingStore;
  useEventsStore: () => IEventsStore;
}
