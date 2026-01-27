<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventsStore } from '@/stores';
import { ROUTES } from '@/router/routes';
import type { IEvent, IEventMenu } from '@/types/event';

const route = useRoute();
const router = useRouter();
const eventsStore = useEventsStore();

const event = ref<IEvent | null>(null);
const currentPage = ref<IEventMenu | null>(null);
const isLoading = ref(true);

const eventSlug = computed(() => route.params.id as string);
const innerPageSlug = computed(() => route.params.innerId as string);

const loadEventAndPage = (eventId: string, innerId: string) => {
  isLoading.value = true;

  // Находим событие по slug
  event.value = eventsStore.data.find((e) => e.slug === eventId) || null;

  if (!event.value) {
    console.log('The event was not found or unavailable');
    isLoading.value = false;
    router.push({
      name: ROUTES.NOT_FOUND.NAME,
    });
    return;
  }

  // Находим страницу в меню события
  currentPage.value =
    event.value.menu.find((page) => {
      const pageSlug = page.slug.split('/').pop();
      return pageSlug === innerId && page.enable;
    }) || null;

  if (!currentPage.value) {
    console.log('Page not found or disabled:', innerId);
    router.push({
      name: ROUTES.NOT_FOUND.NAME,
    });
  }

  isLoading.value = false;
};

const initPage = () => {
  if (!eventsStore.IsEventsLoading) {
    loadEventAndPage(eventSlug.value, innerPageSlug.value);
  } else {
    const unwatch = watch(
      () => eventsStore.IsEventsLoading,
      (loading) => {
        if (!loading) {
          loadEventAndPage(eventSlug.value, innerPageSlug.value);
          unwatch();
        }
      },
    );
  }
};

initPage();

// Следим за изменением параметров маршрута
watch(
  () => [route.params.id, route.params.innerId],
  ([newEventId, newInnerId]) => {
    if (newEventId && newInnerId) {
      loadEventAndPage(newEventId as string, newInnerId as string);
    }
  },
);
</script>

<template>
  <div class="event-inner-page">
    <div v-if="isLoading" class="event-inner-page__loading">
      <UIContainer type="main-box">Loading...</UIContainer>
    </div>

    <div v-else-if="currentPage && event" class="event-inner-page__content">
      <MainStone v-if="innerPageSlug === 'milestones'" :eventData="event" />
      <div v-else>
        <MilestoneInnerPage :eventData="event" :currentSlug="currentPage.slug" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-inner-page {
  width: 100%;
  height: max-content;
  flex-grow: 1;

  &__loading {
    padding: 2rem;
  }
}
</style>
