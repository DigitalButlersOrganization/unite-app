<script setup lang="ts">
import { COMPANY_INFO } from '@/constants';
import { useEventsStore } from '@/stores';

const eventsStore = useEventsStore();
</script>

<template>
  <MainGrid>
    <CustomHeader />
    <CustomAside v-if="eventsStore.data?.length" />
    <CustomMain>
      <main>
        <h1 v-if="eventsStore.data?.length" class="heading heading--m">
          Hi! Select an event from the list to view its details.
        </h1>
        <h1
          v-if="!eventsStore.data?.length && !eventsStore.IsEventsLoading"
          class="heading heading--m"
        >
          You don't have access to any events. First, register for an event, and then check your
          access to it again on this page. If events are still not displayed, please contact us by

          <a :href="`mailto:${COMPANY_INFO.email}`" class="link"> email </a>.
        </h1>
      </main>
    </CustomMain>
  </MainGrid>
</template>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
  transition: var(--transition--default);

  &:hover {
    opacity: 0.8;
  }
}
</style>
