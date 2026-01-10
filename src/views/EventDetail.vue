<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useEventsStore } from '@/stores';
import type { IEvent } from '@/types/event';
import MainGrid from '@/components/MainGrid/Index.vue';
import CustomHeader from '@/components/CustomHeader/Index.vue';
import CustomAside from '@/components/CustomAside/Index.vue';
import CustomMain from '@/components/CustomMain/Index.vue';

const route = useRoute();
const eventsStore = useEventsStore();

const event = ref<IEvent | null>(null);
const isLoading = ref(true);
const error = ref('');

const loadEvent = (id: string) => {
  isLoading.value = true;
  error.value = '';

  event.value = eventsStore.data.find((e) => e.id === id) || null;

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
  <MainGrid>
    <CustomHeader />
    <CustomAside v-if="eventsStore.data?.length" />
    <CustomMain>
      <div class="event-detail">
        <div v-if="isLoading" class="event-detail__loading">
          <UIContainer type="main-box"> Loading ... </UIContainer>
        </div>
        <div v-else-if="error" class="event-detail__error">
          <UIContainer type="main-box"> {{ error }} </UIContainer>
        </div>

        <div v-else-if="event" class="event-detail__content">
          <MainStone :eventId="event.id" />
        </div>

        <div v-else class="event-detail__not-found">The event not found</div>
      </div>
    </CustomMain>
  </MainGrid>
</template>

<style scoped lang="scss">
.event-detail {
  width: 100%;

  &__error {
    color: red;
  }

  &__content {
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      margin-bottom: 1rem;
    }
  }
}
</style>
