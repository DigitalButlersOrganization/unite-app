/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';

export const useEventsStore = defineStore('eventsStore', {
  state: () => ({
    data: [] as any[],
  }),
  actions: {
    set(data: any[]) {
      this.data = data;
    },
  },
});

export type IEventsStore = ReturnType<typeof useEventsStore>;
