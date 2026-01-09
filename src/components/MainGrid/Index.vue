<script setup lang="ts">
import { useEventsStore } from '@/stores';

const eventsStore = useEventsStore();
</script>

<template>
  <div class="main-grid-wrapper">
    <UIContainer class="main-grid-container">
      <div class="main-grid" :class="eventsStore.data.length ? '' : 'main-grid--without-aside'">
        <slot />
      </div>
    </UIContainer>
  </div>
</template>

<style lang="scss" scoped>
.main-grid-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 6px;
}
.main-grid-container {
  width: 100%;
  height: 100%;
}
.main-grid {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 6px;
  grid-template-columns: 346px auto;
  grid-template-rows: max-content auto;

  &--without-aside {
    & > *:nth-child(2) {
      grid-column: 1 / 3;
    }
  }
}
</style>
