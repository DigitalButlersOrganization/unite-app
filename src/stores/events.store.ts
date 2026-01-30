import { defineStore } from 'pinia';
import type { IEvent, IEventMenu, IEvents, IEventStep, IVisaAssistance } from '@/types/event';
import { BUTTON_STATUSES } from '@/enums';
import { getCookie, setCookie } from '@/utils';

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
        item.isCurrentVisaAssistanceLoading = false;
        return item;
      });

      this.data = changedData;
      this.checkTagNewStatus();
    },
    setMilestones({ eventId, data }: { eventId: string; data: IEventStep[] }) {
      const currentEvent = this.data.find((event) => event.slug === eventId);

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
    setVisaAssistance({ eventId, data }: { eventId: string; data: IVisaAssistance }) {
      const currentEvent = this.data.find((event) => event.slug === eventId);

      if (!currentEvent) {
        console.error(`Event with id ${eventId} not found`);
        return;
      }

      currentEvent.visaAssistance = data;
    },
    checkTagNewStatus() {
      // Reset all enableTagNew flags
      // this.data.forEach((event) => {
      //   event.menu.forEach((menuItem) => {
      //     menuItem.enableTagNew = false;
      //   });
      // });

      // Activate the second menu item for all events
      // this.data.forEach((event) => {
      //   event.menu.forEach((menuItem, index) => {
      //     if (index === 1) {
      //       menuItem.enable = true;
      //     }
      //   });
      // });

      this.data.forEach((event) => {
        event.menu.forEach((menuItem: IEventMenu) => {
          const { id } = menuItem;
          const cookieValue = getCookie(`menu_item_${id}_enable`);
          const currentValue = menuItem.enable.toString();

          if (cookieValue && cookieValue === 'false' && currentValue === 'true') {
            menuItem.enableTagNew = true;
          } else {
            menuItem.enableTagNew = false;
          }

          setCookie(`menu_item_${id}_enable`, currentValue, { path: '/', maxAge: 8640000 });
        });
      });
    },
  },
  getters: {
    isSetMilestones(): (id: string) => boolean {
      return (id: string) => {
        const event = this.data.find((event) => event.slug === id);
        return !!event?.steps && event.steps.length > 0;
      };
    },
    isSetVisaAssistance(): (id: string) => boolean {
      return (id: string) => {
        const event = this.data.find((event) => event.slug === id);
        return !!event?.visaAssistance;
      };
    },
  },
});

export type IEventsStore = ReturnType<typeof useEventsStore>;
