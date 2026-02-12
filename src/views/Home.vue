<script setup lang="ts">
import { COMPANY_INFO } from '@/constants';
import { useEventsStore, useUserStore } from '@/stores';

const eventsStore = useEventsStore();
const userStore = useUserStore();
</script>

<template>
  <UIContainer type="main-box">
    <div class="paragraph paragraph--l">
      Hello, {{ userStore.userFirstName }} {{ userStore.userLastName }}
    </div>
    <br />
    <h1 v-if="eventsStore.data?.length" class="heading heading--l">
      Please select an event, and we will show you all the information about it.
    </h1>
    <h1 v-if="!eventsStore.data?.length && !eventsStore.IsEventsLoading" class="heading heading--l">
      You don't have access to any events. First, register for an event, and then check your access
      to it again on this page. If events are still not displayed, please contact us by

      <a :href="`mailto:${COMPANY_INFO.email}`" class="link"> email </a>.
    </h1>
  </UIContainer>
</template>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
  transition: var(--transition-default);

  &:hover {
    opacity: 0.8;
  }
}
</style>
