<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES, BUTTON_TAGS } from '@/enums';
import { api } from '@/services/api';
import type { IEvent } from '@/types/event';
import * as store from '@/stores';
import { ref } from 'vue';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const props = defineProps<{ eventData: IEvent }>();

const activeTab = ref('0');

api.auth.getCurrentEvent({ store, id: props.eventData.id });
</script>

<template>
  <div v-if="props.eventData.isCurrentMilestoneLoading" class="tabs__loading">
    <UIContainer type="main-box">
      <p class="heading heading--l">Loading...</p>
    </UIContainer>
  </div>
  <Tabs v-model:value="activeTab" v-else class="tabs">
    <div class="tabs__buttons-wrapper with-scrollbar">
      <TabList class="tabs__buttons">
        <Tab
          v-for="(value, index) in props.eventData.steps"
          :key="index"
          :value="index.toString()"
          class="tabs__button"
        >
          <UIButton
            :border="BUTTON_BORDERS.MEDIUM"
            :size="BUTTON_SIZES.MEDIUM"
            :status="activeTab === index.toString() ? BUTTON_STATUSES.ACTIVE : BUTTON_STATUSES.BASE"
            :is-disabled="false"
            :tag="BUTTON_TAGS.DIV"
            class=""
          >
            <p class="paragraph paragraph--l">Step {{ index + 1 }}: {{ value.milestone.step }}</p>
          </UIButton></Tab
        >
      </TabList>
    </div>
    <TabPanels class="tabs__tabpanels">
      <TabPanel
        v-for="(value, index) in props.eventData.steps"
        :key="index"
        :value="index.toString()"
        class="tabs__tabpanel"
        :class="
          value.status === BUTTON_STATUSES.REJECTED
            ? `tabs__tabpanel--${BUTTON_STATUSES.REJECTED.toLowerCase()}`
            : ''
        "
      >
        <div v-if="activeTab === index.toString()">
          <MainStoneTabPanelContent
            :event-data="props.eventData"
            :milestone-slug="value.milestone.slug"
          />
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
<style lang="scss">
.tabs__tabpanel {
  width: 100%;
  height: 100%;
  &--rejected {
    background-color: var(--palette--9);
  }
}
</style>
<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__buttons-wrapper {
    width: 100%;
    overflow: auto;
    border-top-left-radius: var(--border-radius--2);
    border-top-right-radius: var(--border-radius--2);
    background: var(--color-background--3);
    min-height: max-content;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  &__buttons {
    min-width: 100%;
    width: max-content;
    color: var(--color-text--3);
    border-bottom: 1px solid var(--palette--3);
    overflow: auto;
    display: flex;
    padding: 6px;
  }

  &__button {
    padding: 0;
    border: none;
    border-radius: var(--border-radius--1);
    position: relative;

    &:focus,
    &:focus-visible {
      z-index: 2;
    }
  }

  &__tabpanels {
    width: 100%;
    flex-grow: 1;
  }

  &__tabpanel {
    width: 100%;
    height: 100%;
  }
}
</style>
