import { defineStore } from 'pinia';
import type { IEvent, IEvents, IEventStep } from '@/types/event';

export const useEventsStore = defineStore('eventsStore', {
  state: (): IEvents => {
    return {
      IsEventsLoading: false,
      currentEventId: null,
      data: [],
    };
  },
  actions: {
    setEvents(data: IEvent[]) {
      const changedData = data.map((item) => {
        item.isCurrentMilestoneLoading = false;
        return item;
      });

      this.data = changedData;
    },
    setMilestones({ eventId, data }: { eventId: string; data: IEventStep[] }) {
      const currentEvent = this.data.find((event) => event.id === eventId);

      if (!currentEvent) {
        console.error(`Event with id ${eventId} not found`);
        return;
      }

      currentEvent.steps = data;
    },
  },
});

export type IEventsStore = ReturnType<typeof useEventsStore>;
