import { api, instance } from '@/services/api';
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
          if (eventsStore.isSetEvents) {
            eventsStore.updateMenu(response.data.items);
          } else {
            eventsStore.setEvents(response.data.items);
          }
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
  getCurrentEventMilestones: async (payload: { store: IStore; id: string }) => {
    const { store, id } = payload;
    const eventsStore = store.useEventsStore();
    const currentEvent = eventsStore.data.find((event) => event.slug === id);
    if (!currentEvent || currentEvent.isCurrentMilestoneLoading) {
      return;
    }

    eventsStore.toggleMilestoneLoadingStatus(id, true);

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
          toast(`Failed to load milestones for the "${currentEvent.eventName}" event`, {
            type: 'error',
          });
        }
        if (eventsStore.isSetMilestones(id)) {
          toast(
            `Data for the "${currentEvent.eventName}" event update failed. Showing initial data.`,
            { type: 'error' },
          );
        }
        currentEvent.steps = [];
      })
      .finally(() => {
        eventsStore.toggleMilestoneLoadingStatus(id, false);
      });
  },
  getCurrentEventVisaAssistance: async (payload: { store: IStore; id: string }) => {
    const { store, id } = payload;
    const eventsStore = store.useEventsStore();
    const currentEvent = eventsStore.data.find((event) => event.slug === id);
    if (!currentEvent || currentEvent.isCurrentVisaAssistanceLoading) {
      return;
    }
    eventsStore.toggleVisaAssistanceLoadingStatus(id, true);

    instance
      .get(`/event/${id}/visa`, {})
      .then((response) => {
        if (response.data) {
          eventsStore.setVisaAssistance({ eventId: id, data: response.data });
        }
      })
      .catch((error) => {
        if (error.response?.status === 500) {
          console.error('❌ Server error (500):', error.response.data);
          toast('Server error. Please reload the page and try to perform this action again.', {
            type: 'error',
          });
        } else {
          console.error('❌ Error loading visa assistance:', error);
          toast(`Failed to load visa assistance for the "${currentEvent.eventName}" event`, {
            type: 'error',
          });
        }
        if (eventsStore.isSetVisaAssistance(id)) {
          toast(
            `Data for the "${currentEvent.eventName}" event update failed. Showing initial data.`,
            { type: 'error' },
          );
        }
        currentEvent.visaAssistance = null;
      })
      .finally(() => {
        eventsStore.toggleVisaAssistanceLoadingStatus(id, false);
      });
  },

  updateMilestoneStatus: async (payload: {
    slug: string;
    milestoneSlug: string;
    store: IStore;
  }) => {
    const { slug, milestoneSlug, store } = payload;

    const eventsStore = store.useEventsStore();

    instance
      .patch(`/event/${slug}/milestone/${milestoneSlug}/submit`, {
        isFormSubmitted: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          eventsStore.setMilestones({ eventId: slug, data: response.data.items });
          api.events.getAllEvents({ store });
        }
      })
      .catch(({ response }) => {
        console.log(response);

        if (response?.data?.error) {
          toast(response.data.error, { type: 'error' });
        } else if (response?.data?.message) {
          toast(response.data.message, { type: 'error' });
        } else {
          toast('An unexpected error occurred', { type: 'error' });
        }
      })
      .finally(() => {});
  },
  // updatePaymentStatus: async (payload: {
  //   sessionId: string;
  //   paymentId: string;
  //   userEventId: string;
  //   store: IStore;
  // }) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { sessionId, paymentId, userEventId, store } = payload;

  //   instance
  //     .post(`/stripe/success`, {
  //       sessionId,
  //       paymentId,
  //       userEventId,
  //     })
  //     .then((response) => {
  //       if (response.status === 200 && response.data) {
  //         // api.events.getAllEvents({ store });
  //       }
  //     })
  //     .catch(({ response }) => {
  //       console.log(response);

  //       if (response?.data?.error) {
  //         toast(response.data.error, { type: 'error' });
  //       } else if (response?.data?.message) {
  //         toast(response.data.message, { type: 'error' });
  //       } else {
  //         toast('An unexpected error occurred', { type: 'error' });
  //       }
  //     })
  //     .finally(() => {});
  // },
};
