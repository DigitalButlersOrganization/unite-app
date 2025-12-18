<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores';
import { api } from './services/api';
import * as store from '@/stores';

const userStore = useUserStore();

onMounted(() => {
  userStore.setFetchingUser(true);
  api.auth.getUser({ store });
  // api.auth.getAllEvents();
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
