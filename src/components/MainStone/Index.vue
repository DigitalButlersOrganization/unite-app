<script setup lang="ts">
import {
  BUTTON_BORDERS,
  BUTTON_SIZES,
  BUTTON_STATUSES,
  BUTTON_TAGS,
  MILESTONE_PHASES,
} from '@/enums';
import { api } from '@/services/api';
import type { IEvent } from '@/types/event';
import * as store from '@/stores';
import { ref, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const props = defineProps<{ eventData: IEvent }>();

const router = useRouter();
const route = useRoute();

const activeTab = ref<string | null>(null);
const tabsButtonsWrapper = ref<HTMLElement | null>(null);

api.events.getCurrentEventMilestones({ store, id: props.eventData.slug });

const eventsStore = store.useEventsStore();

const updateNumberOfMilestoneOpenings = () => {
  if (eventsStore.numberOfMilestoneOpenings > 0) {
    api.events.getAllEvents({ store });
  }
  eventsStore.numberOfMilestoneOpenings += 1;
};

updateNumberOfMilestoneOpenings();

watch(
  () => props.eventData.steps,
  async (steps) => {
    if (!steps || steps.length === 0) return;

    const firstDefaultStepIndex = steps.findIndex(
      (step) =>
        step.status !== BUTTON_STATUSES.DISABLED && step.status !== BUTTON_STATUSES.COMPLETED,
    );
    const modifiedFirstDefaultStepIndex = firstDefaultStepIndex >= 0 ? firstDefaultStepIndex : 0;

    // Первичная инициализация
    if (activeTab.value === null) {
      const milestoneSlug = route.query.milestone as string;
      let targetIndex = modifiedFirstDefaultStepIndex;

      if (milestoneSlug) {
        const index = steps.findIndex((step) => step.milestone.slug === milestoneSlug);
        if (index !== -1) {
          targetIndex = index;
        }
      }

      // Если найденный таб заблокирован, используем первый активный таб
      if (steps[targetIndex]?.status === BUTTON_STATUSES.DISABLED) {
        targetIndex = modifiedFirstDefaultStepIndex;
      }

      activeTab.value = targetIndex.toString();

      const slug = steps[targetIndex]?.milestone.slug;
      if (slug && route.query.milestone !== slug) {
        await router.replace({
          query: { ...route.query, milestone: slug },
        });
      }
    } else {
      // Обновление данных на уже открытой странице:
      // если текущий таб стал COMPLETED или DISABLED — переключаемся на первый активный шаг
      const currentIndex = parseInt(activeTab.value);
      const currentStep = steps[currentIndex];

      if (
        currentStep &&
        (currentStep.status === BUTTON_STATUSES.COMPLETED ||
          currentStep.status === BUTTON_STATUSES.DISABLED)
      ) {
        activeTab.value = modifiedFirstDefaultStepIndex.toString();
      }
    }
  },
  { immediate: true, deep: true },
);

function scrollToActiveTab() {
  if (!tabsButtonsWrapper.value) return;

  const activeButton = tabsButtonsWrapper.value.querySelector(
    '.tabs__button[data-p-active="true"]',
  ) as HTMLElement;
  if (!activeButton) return;

  const wrapperRect = tabsButtonsWrapper.value.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();
  const scrollLeft = tabsButtonsWrapper.value.scrollLeft;

  // Вычисляем позицию кнопки относительно контейнера
  const buttonLeft = buttonRect.left - wrapperRect.left + scrollLeft;
  const buttonWidth = buttonRect.width;
  const wrapperWidth = wrapperRect.width;

  // Скроллим так, чтобы кнопка была в центре (если возможно)
  const targetScroll = buttonLeft - wrapperWidth / 2 + buttonWidth / 2;

  tabsButtonsWrapper.value.scrollTo({
    left: targetScroll,
    behavior: 'smooth',
  });
}

// Скролл при первом появлении контейнера табов (первичный рендер)
watch(tabsButtonsWrapper, async (wrapper) => {
  if (wrapper && activeTab.value !== null) {
    await nextTick();
    scrollToActiveTab();
  }
});

watch(activeTab, async (newValue) => {
  if (newValue === null) return;

  // Обновляем GET параметр milestone в URL
  const index = parseInt(newValue);
  const slug = props.eventData.steps[index]?.milestone.slug;
  if (slug) {
    await router.replace({
      query: { ...route.query, milestone: slug },
    });
  }

  await nextTick();
  scrollToActiveTab();
});
</script>

<template>
  <div
    v-if="
      (!props.eventData.steps || props.eventData.steps.length === 0) &&
      !props.eventData.isCurrentMilestoneLoading
    "
    class="event-inner-page__coming-soon"
  >
    <UIContainer type="main-box">
      <div class="heading heading--l">Coming soon...</div>
    </UIContainer>
  </div>
  <div v-if="props.eventData.isCurrentMilestoneLoading" class="tabs__loading">
    <UIContainer type="main-box">
      <p class="heading heading--l">Loading...</p>
    </UIContainer>
  </div>
  <Tabs v-else-if="activeTab !== null" v-model:value="activeTab" class="tabs">
    <div ref="tabsButtonsWrapper" class="tabs__buttons-wrapper with-scrollbar">
      <TabList class="tabs__buttons">
        <Tab
          v-for="(value, index) in props.eventData.steps"
          :key="index"
          :value="index.toString()"
          class="tabs__button"
          :class="
            value.status === BUTTON_STATUSES.DISABLED
              ? `tabs__button--${BUTTON_STATUSES.DISABLED.toLowerCase()}`
              : ''
          "
          :disabled="value.status === BUTTON_STATUSES.DISABLED"
        >
          <!-- !!!!!!!!!!!!!! -->
          <UIButton
            :border="BUTTON_BORDERS.MEDIUM"
            :size="BUTTON_SIZES.MEDIUM"
            :status="
              activeTab === index.toString()
                ? BUTTON_STATUSES.ACTIVE
                : (value.status.toLowerCase() as BUTTON_STATUSES)
            "
            :is-disabled="false"
            :tag="BUTTON_TAGS.DIV"
            class=""
          >
            <p class="paragraph paragraph--l">
              <template
                v-if="
                  value.milestone.phase === MILESTONE_PHASES.MAIN &&
                  !(value.milestone.type === 'event' && index === 0)
                "
              >
                Step {{ index + 1 }}:
              </template>

              {{ value.milestone.step }}
            </p>
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

    @media screen and (max-width: 767px) {
      border-radius: 0;
      background-color: var(--palette--13);
    }
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

    &--disabled {
      cursor: not-allowed;
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
