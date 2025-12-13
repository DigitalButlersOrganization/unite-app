import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loadingStore', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});

export type ILoadingStore = ReturnType<typeof useLoadingStore>;
