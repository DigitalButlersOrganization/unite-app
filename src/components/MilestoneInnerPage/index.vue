<script setup lang="ts">
import type { IEvent } from '@/types/event';

const props = defineProps<{ eventData: IEvent; currentSlug: string }>();

const currentMenuItem = props.eventData.menu.find((item) => item.slug === props.currentSlug);
</script>
<template>
  {{ props.eventData.slug }}
  <br />
  {{ currentMenuItem?.title }}
</template>
