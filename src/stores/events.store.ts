import { defineStore } from 'pinia';
import type { IEvent, IEventMenu, IEvents, IEventStep, IVisaAssistance } from '@/types/event';
// import { BUTTON_STATUSES, MENU_ITEM_SLUGS } from '@/enums';
import { MENU_ITEM_SLUGS } from '@/enums';
import { getCookie, setCookie } from '@/utils';

export const useEventsStore = defineStore('eventsStore', {
  state: (): IEvents => {
    return {
      IsEventsLoading: false,
      currentEventId: null,
      isTimeRemainingOpen: false,
      numberOfMilestoneOpenings: 0,
      data: [],
    };
  },
  getters: {
    isSetEvents(): boolean {
      return this.data.length > 0;
    },
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
    shouldShowAccent(): (menuItem: IEventMenu, eventId: string) => boolean {
      return (menuItem: IEventMenu, eventId: string) => {
        if (!menuItem.slug.includes(MENU_ITEM_SLUGS.VISA_ASSISTANCE)) return false;
        if (this.currentEventId !== eventId) return false;
        return (menuItem.showTagNewOverlay && menuItem.enableTagNew) || false;
      };
    },
  },
  actions: {
    setEvents(data: IEvent[]) {
      const changedData = data.map((item) => {
        this.toggleMilestoneLoadingStatus(item.slug, false);
        this.toggleVisaAssistanceLoadingStatus(item.slug, false);
        return item;
      });

      this.data = changedData;
      this.checkTagNewStatus();
    },
    updateMenu(data: IEvent[]) {
      const changedData = this.data.map((event) => {
        const updatedEvent = data.find((e) => e.slug === event.slug);
        if (updatedEvent) {
          event.menu = updatedEvent.menu;
          event.currentStatus = updatedEvent.currentStatus;
          event.eventStatus = updatedEvent.eventStatus;
          event.progress = updatedEvent.progress;
          event.timeRemaining = updatedEvent.timeRemaining;
        }
        return event;
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
      // let isUnblocked = true;

      // const modifiedData = data.map((step) => {
      //   if (isUnblocked) {
      //     isUnblocked = !step.milestone?.isBlocked || step.status === BUTTON_STATUSES.COMPLETED;
      //     return step;
      //   } else {
      //     step.status = BUTTON_STATUSES.DISABLED;
      //     return step;
      //   }
      // });

      currentEvent.steps = data;
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
      this.data.forEach((event) => {
        event.menu.forEach((menuItem, index) => {
          if (index === 2) {
            menuItem.enable = true;
          }
        });
      });

      this.data.forEach((event) => {
        event.menu.forEach((menuItem: IEventMenu) => {
          const { id } = menuItem;
          const cookieValue = getCookie(`menu_item_${id}_enable`);
          const currentValue = menuItem.enable.toString();
          menuItem.showTagNewOverlay = true;

          if (cookieValue && cookieValue === 'false' && currentValue === 'true') {
            menuItem.enableTagNew = true;
          } else {
            menuItem.enableTagNew = false;
          }

          setCookie(`menu_item_${id}_enable`, currentValue, { path: '/', maxAge: 8640000 });
        });
      });
    },
    toggleMilestoneLoadingStatus(id: string, status: boolean) {
      const currentEvent = this.data.find((event) => event.slug === id);
      if (!currentEvent) return;

      currentEvent.isCurrentMilestoneLoading = status;
    },
    toggleVisaAssistanceLoadingStatus(id: string, status: boolean) {
      const currentEvent = this.data.find((event) => event.slug === id);
      if (!currentEvent) return;

      currentEvent.isCurrentVisaAssistanceLoading = status;
    },
  },
});

export type IEventsStore = ReturnType<typeof useEventsStore>;
