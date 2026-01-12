<script setup lang="ts">
import { useEventsStore } from '@/stores';
import MainGrid from '@/components/MainGrid/Index.vue';
import CustomHeader from '@/components/CustomHeader/Index.vue';
import CustomAside from '@/components/CustomAside/Index.vue';
import CustomMain from '@/components/CustomMain/Index.vue';

const eventsStore = useEventsStore();
</script>

<template>
  <MainGrid>
    <CustomHeader />
    <CustomAside v-if="eventsStore.data?.length" />
    <CustomMain>
      <slot />
    </CustomMain>
  </MainGrid>
</template>
