import { instance } from '@/services/api';
import { toast } from 'vue3-toastify';
import type { IStore } from '@/stores';

export const events = {
  getAllEvents: async (payload: { store: IStore }) => {
    const { store } = payload;
    const eventsStore = store.useEventsStore();
    eventsStore.IsEventsLoading = true;
    instance
      .get('/event/all', {})
      .then((response) => {
        if (response.data.items) {
          // console.log(response.data.items);

          eventsStore.setEvents(response.data.items);
        }
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          console.error('❌ Server error (500):', error.response.data);
          toast('Server error. Please contact backend team.', { type: 'error' });
        } else {
          console.error('❌ Error loading events:', error);
          toast('Failed to load events', { type: 'error' });
        }
      })
      .finally(() => {
        eventsStore.IsEventsLoading = false;
      });
  },
  getCurrentEvent: async (payload: { store: IStore; id: string }) => {
    const { store, id } = payload;
    const eventsStore = store.useEventsStore();
    const currentEvent = eventsStore.data.find((event) => event.slug === id);
    if (!currentEvent) {
      return;
    }
    currentEvent.isCurrentMilestoneLoading = true;
    instance
      .get(`/event/${id}/milestones`, {})
      .then((response) => {
        if (response.data.items) {
          eventsStore.setMilestones({ eventId: id, data: response.data.items });
        }
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          console.error('❌ Server error (500):', error.response.data);
          toast('Server error. Please reload the page and try to perform this action again.', {
            type: 'error',
          });
        } else {
          console.error('❌ Error loading milestones:', error);
          toast('Failed to load milestones', { type: 'error' });
        }
        if (eventsStore.isSetMilestones(id)) {
          toast('Data update failed. Showing initial data.', { type: 'error' });
        }
        currentEvent.steps = [];
        // router.push({ name: ROUTES.HOME.NAME });
      })
      .finally(() => {
        currentEvent.isCurrentMilestoneLoading = false;
      });
  },
};
