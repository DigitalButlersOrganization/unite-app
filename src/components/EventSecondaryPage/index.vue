<script setup lang="ts">
import type { IEvent } from '@/types/event';
import { computed } from 'vue';

const props = defineProps<{ eventData: IEvent; currentSlug: string }>();

const currentMenuItem = computed(() =>
  props.eventData.menu.find((item) => item.slug === props.currentSlug),
);
</script>
<template>
  <UIContainer type="main-box">
    <div class="heading heading--l">{{ currentMenuItem?.title }}</div>
  </UIContainer>
</template>
