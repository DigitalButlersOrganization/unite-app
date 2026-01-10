/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import type { IEvents } from '@/types/event';

export const useEventsStore = defineStore('eventsStore', {
  state: (): IEvents => {
    return {
      isEventSelected: false,
      IsEventsLoading: false,
      data: [],
    };
  },
  actions: {
    set(data: any[]) {
      this.data = data;
    },
  },
});

export type IEventsStore = ReturnType<typeof useEventsStore>;
