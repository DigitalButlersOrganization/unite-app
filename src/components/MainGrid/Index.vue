<script setup lang="ts">
import { useBreakpoints } from '@/composables';
import { MENU_ITEM_SLUGS } from '@/enums';
import { useEventsStore } from '@/stores';
import { computed } from 'vue';

const { isDesktop } = useBreakpoints();

const eventsStore = useEventsStore();

const turnOffTimeRemainingStatus = () => {
  eventsStore.isTimeRemainingOpen = false;
};

const currentEventHasApproval = computed(() => {
  const currentEvent = eventsStore.data.find((event) => eventsStore.currentEventId === event.slug);
  if (!currentEvent) return false;

  const menuVisaPage = currentEvent.menu.find((menuItem) =>
    menuItem.slug.includes(MENU_ITEM_SLUGS.VISA_ASSISTANCE),
  );
  if (!menuVisaPage) return false;

  return eventsStore.shouldShowAccent(menuVisaPage, currentEvent.slug);
});
</script>

<template>
  <div class="main-grid-wrapper">
    <div
      class="overlay"
      :class="eventsStore.isTimeRemainingOpen ? 'overlay--active' : ''"
      @click="turnOffTimeRemainingStatus"
    ></div>
    <div
      v-if="isDesktop"
      class="overlay overlay--new"
      :class="currentEventHasApproval ? 'overlay--active' : ''"
    ></div>
    <UIContainer :type="null" class="main-grid-container">
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

  @media screen and (max-width: 767px) {
    padding-top: 1rem;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    transition: var(--transition-default);
    pointer-events: none;
    opacity: 0;

    &--active {
      pointer-events: auto;
      opacity: 1;
    }
  }
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

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: max-content auto;
    gap: 0rem;

    & > * {
      grid-column: 1 / 3;
    }
  }

  &--without-aside {
    & > *:nth-child(2) {
      grid-column: 1 / 3;
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
