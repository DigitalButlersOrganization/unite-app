<script setup lang="ts">
import { CLASSES } from '@/constants/classes';
import { useEventsStore } from '@/stores';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const eventsStore = useEventsStore();
const router = useRouter();
const route = useRoute();

const activeCardId = ref<string | null>(null);

watch(
  () => route.params.id,
  (newId) => {
    activeCardId.value = newId ? (newId as string) : null;
  },
  { immediate: true },
);

const clickHandler = (event: MouseEvent, eventId: string) => {
  const { target } = event;
  const mainButton = (target as HTMLElement)?.closest('button');
  if (!mainButton) return;

  if (activeCardId.value === eventId) {
    activeCardId.value = null;
    router.push({ name: 'Home' });
  } else {
    activeCardId.value = eventId;
    router.push({ name: 'EventDetail', params: { id: eventId } });
  }
};
</script>

<template>
  <aside class="aside">
    <div class="aside__scroll-box">
      <EventCard
        :class="activeCardId === event.id ? CLASSES.ACTIVE : ''"
        v-for="event in eventsStore.data"
        :key="event.eventName"
        :options="event"
        @click="clickHandler($event, event.id)"
      />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  width: 100%;
  overflow: auto;
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);
  --scrollbar-background-color: #fff;
  --scrollbar-thumb-color: var(--palette--23);

  &__scroll-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    height: max-content;
    padding-bottom: 6px;

    @media screen and (max-width: 767px) {
      padding-bottom: 0;
    }
  }

  @media screen and (max-width: 767px) {
    flex-grow: 1;
    flex-shrink: 0;
  }
}
</style>
