import { defineStore } from 'pinia';
import type { IEvent, IEvents, IEventStep } from '@/types/event';
import { BUTTON_STATUSES } from '@/enums';

export const useEventsStore = defineStore('eventsStore', {
  state: (): IEvents => {
    return {
      IsEventsLoading: false,
      currentEventId: null,
      isTimeRemainingOpen: false,
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
      let isBlocked = false;

      const modifiedData = data.map((step, index) => {
        if (index === 0) {
          isBlocked = step.milestone?.isBlocked || false;
          return step;
        }

        if (isBlocked) {
          if (data[index - 1]?.status === BUTTON_STATUSES.COMPLETED) {
            return step;
          } else {
            step.status = BUTTON_STATUSES.DISABLED;
            return step;
          }
        } else {
          return step;
        }
      });

      currentEvent.steps = modifiedData;
    },
  },
});

export type IEventsStore = ReturnType<typeof useEventsStore>;
