<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useEventsStore } from '@/stores';
import type { IEvent } from '@/types/event';

const route = useRoute();
const eventsStore = useEventsStore();

const event = ref<IEvent | null>(null);
const isLoading = ref(true);
const error = ref('');

const loadEvent = (slug: string) => {
  isLoading.value = true;
  error.value = '';

  event.value = eventsStore.data.find((e) => e.slug === slug) || null;

  if (!event.value) {
    error.value = 'The event was not found or unavailable';
  }
  isLoading.value = false;
};

const initEvent = () => {
  if (!eventsStore.IsEventsLoading) {
    loadEvent(route.params.id as string);
  } else {
    const unwatch = watch(
      () => eventsStore.IsEventsLoading,
      (isLoading) => {
        if (!isLoading) {
          loadEvent(route.params.id as string);
          unwatch();
        }
      },
    );
  }
};

initEvent();

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      loadEvent(newId as string);
    }
  },
);
</script>

<template>
  <div class="event-detail">
    <div v-if="isLoading" class="event-detail__loading">
      <UIContainer type="main-box"> Loading ... </UIContainer>
    </div>
    <div v-else-if="error" class="event-detail__error">
      <UIContainer type="main-box"> {{ error }} </UIContainer>
    </div>

    <div v-else-if="event" class="event-detail__content">
      <MainStone :eventData="event" />
    </div>

    <div v-else class="event-detail__not-found">The event not found</div>
  </div>
</template>

<style scoped lang="scss">
.event-detail {
  width: 100%;
  height: max-content;
  flex-grow: 1;

  &__error {
    color: red;
  }

  &__content {
    width: 100%;
    height: 100%;
    margin: 0 auto;

    h1 {
      margin-bottom: 1rem;
    }
  }
}
</style>
