<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores';
import { api } from './services/api';
import * as store from '@/stores';

const userStore = useUserStore();

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
  <RouterView />
</template>

<style lang="scss" scoped></style>
