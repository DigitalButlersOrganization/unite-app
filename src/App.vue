<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from './stores';
import { api } from './services/api';
import * as store from '@/stores';

const userStore = useUserStore();

onMounted(() => {
  userStore.setFetchingUser(true);
  api.auth.getUser({ store });
});
</script>

<template>
  <button @click="api.auth.getUser({ store })">getUser</button>
  <button @click="api.auth.getAllEvents()">getAllEvents</button>

  <RouterView />
</template>

<style lang="scss" scoped></style>
