<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore, useEventsStore } from './stores';
import { api } from './services/api';
import * as store from '@/stores';
import MainGrid from '@/components/MainGrid/Index.vue';
import CustomHeader from '@/components/CustomHeader/Index.vue';
import CustomAside from '@/components/CustomAside/Index.vue';
import CustomMain from '@/components/CustomMain/Index.vue';

const userStore = useUserStore();
const eventsStore = useEventsStore();
const route = useRoute();

// Страницы, которые используют MainLayout
const layoutPages = ['Home', 'EventDetail', 'UIGuide'];
const useLayout = computed(() => layoutPages.includes(route.name as string));

onMounted(async () => {
  userStore.setFetchingUser(true);

  const statusOfUserFetching = await api.auth.getCurrentUser({ store });

  if (!statusOfUserFetching) {
    userStore.setFetchingUser(true);
    api.auth.refreshToken({ store });
  }
});
</script>

<template>
  <MainGrid v-if="useLayout">
    <CustomHeader />
    <CustomAside v-if="eventsStore.data?.length" />
    <CustomMain>
      <RouterView />
    </CustomMain>
  </MainGrid>
  <RouterView v-else />
</template>

<style lang="scss" scoped></style>
