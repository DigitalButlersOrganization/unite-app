<script setup lang="ts">
import IconArrowDown1 from '@/assets/icons/arrow-down-1.svg';
import type { IEvent } from '@/types/event';
import { formatDate, formatTimeRemaining } from '@/utils';
import { useEventsStore } from '@/stores';
import { useBreakpoints } from '@/composables';
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{ options: IEvent }>();

const eventsStore = useEventsStore();
const { isDesktop } = useBreakpoints();

const isShowCard = computed(() => {
  if (isDesktop.value || !eventsStore.currentEventId) {
    return true;
  } else if (eventsStore.currentEventId) {
    if (eventsStore.currentEventId === props.options.slug) {
      return true;
    } else {
      return false;
    }
  }
  return eventsStore.currentEventId === props.options.slug;
});
</script>

<template>
  <EventCardMobileMenu
    v-if="!isDesktop && eventsStore.currentEventId === props.options.slug"
    :options="props.options"
  />
  <div
    class="card"
    v-bind="$attrs"
    v-if="isShowCard"
    :style="
      eventsStore.currentEventId && !isDesktop && eventsStore.currentEventId === props.options.slug
        ? 'border-bottom-left-radius: 0; border-bottom-right-radius: 0;'
        : ''
    "
  >
    <button class="card__summary" role="button" tabindex="0">
      <div v-if="!isDesktop" class="card__first-information-wrapper">
        <div class="card__first-information-wrapper-inner">
          <div class="card__first-information">
            <div class="card__first-information-row">
              <div class="card__first-information-key">
                <p class="paragraph paragraph--l">Start Date:</p>
              </div>
              <div class="card__first-information-value">
                <p class="paragraph paragraph--l">{{ formatDate(props.options.startDate) }}</p>
              </div>
            </div>
            <div class="card__first-information-row">
              <div class="card__first-information-key">
                <p class="paragraph paragraph--l">Status:</p>
              </div>
              <div class="card__first-information-value">
                <p class="paragraph paragraph--l">{{ props.options.eventStatus }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card__header">
        <div class="card__heading">
          <h2 class="heading heading--l">{{ props.options.eventName }}</h2>
        </div>
        <div class="card__arrow-box">
          <div class="card__arrow-svg">
            <IconArrowDown1 />
          </div>
        </div>
      </div>
      <div class="card__progress-data">
        <div class="card__progress-bar-wrapper">
          <div class="card__progress-bar" :style="{ width: props.options.progress + '%' }"></div>
        </div>
        <div class="card__progress-value-box-wrapper">
          <div class="card__progress-value-box">
            <div class="card__progress-value-point"></div>
            <div class="card__progress-value-text">
              <p class="paragraph paragraph">{{ props.options.progress }}%</p>
            </div>
          </div>
          <div class="card__progress-information-row">
            <div class="card__progress-information-key">
              <p class="paragraph paragraph--l">Time Remaining:</p>
            </div>
            <div class="card__progress-information-value">
              <p class="paragraph paragraph--l">
                {{ formatTimeRemaining(props.options.timeRemaining) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card__information-wrapper">
        <div class="card__information-wrapper-inner">
          <div class="card__information">
            <div class="card__information-row">
              <div class="card__information-key">
                <p class="paragraph paragraph--l">Start Date:</p>
              </div>
              <div class="card__information-value">
                <p class="paragraph paragraph--l">{{ formatDate(props.options.startDate) }}</p>
              </div>
            </div>
            <div class="card__information-row">
              <div class="card__information-key">
                <p class="paragraph paragraph--l">Status:</p>
              </div>
              <div class="card__information-value">
                <p class="paragraph paragraph--l">{{ props.options.eventStatus }}</p>
              </div>
            </div>
            <div class="card__information-row">
              <div class="card__information-key">
                <p class="paragraph paragraph--l">Time Remaining:</p>
              </div>
              <div class="card__information-value">
                <p class="paragraph paragraph--l">
                  {{ formatTimeRemaining(props.options.timeRemaining) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>

    <div class="card__details" v-if="isDesktop">
      <EventCardDesktopMenu v-if="isDesktop" :options="props.options" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  border-radius: var(--border-radius--2);
  display: grid;
  grid-template-rows: max-content 0fr;
  overflow: hidden;
  background: var(--color-background--1);
  transition: var(--transition-default);

  &.js--active {
    grid-template-rows: max-content 1fr;

    .card__arrow-box {
      rotate: 180deg;
    }

    @media screen and (max-width: 767px) {
      .card__first-information-wrapper {
        grid-template-rows: 1fr;
      }
    }
    @media screen and (max-width: 767px) {
      .card__information-wrapper {
        grid-template-rows: 0fr;
      }
    }
    @media screen and (max-width: 767px) {
      .card__progress-information-row {
        display: flex;
      }
    }
  }

  &__summary {
    padding: 2.25rem 1.75rem 1.25rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background: transparent;
    border: none;
    border-top-left-radius: var(--border-radius--2);
    border-top-right-radius: var(--border-radius--2);

    &:hover,
    &:focus-visible {
      .card__arrow-box {
        background: var(--palette--4);
      }
    }

    @media screen and (max-width: 767px) {
      padding: 0rem;
    }
  }
  &__first-information-wrapper {
    width: 100%;
    overflow: hidden;
    padding-inline: 1.5rem;
    display: grid;
    grid-template-rows: 0fr;
    transition: var(--transition-default);
  }

  &__first-information-wrapper-inner {
    width: 100%;
    overflow: hidden;
  }

  &__first-information {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    flex-wrap: wrap;
    padding-top: 1.5rem;

    &-row {
      display: flex;
      justify-content: start;
      align-items: top;
      gap: 0.25rem;
    }
    &-key {
      color: var(--palette--5);
      white-space: nowrap;
    }
  }
  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    gap: 1rem;
    @media screen and (max-width: 767px) {
      padding-top: 1.75rem;
      padding-inline: 1.5rem;
    }
  }
  &__arrow-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    min-height: 2.5rem;
    border-radius: var(--border-radius--3);
    background: transparent;
    border: solid 1px var(--palette--21);
    cursor: pointer;
    transition: var(--transition-default);
  }
  &__arrow-svg {
    width: 0.875rem;
    height: 0.875rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
  }
  &__progress-data {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;

    @media screen and (max-width: 767px) {
      padding-inline: 1.5rem;
      margin-top: 1.25rem;
    }
  }
  &__progress-bar-wrapper {
    width: 100%;
    height: 6px;
    background: var(--palette--23);
    border-radius: var(--border-radius--4);
    overflow: hidden;
    display: flex;
    justify-content: start;
  }

  &__progress-bar {
    height: 100%;
    background: var(--palette--5);
    border-radius: var(--border-radius--4);
    transition: var(--transition-default);
  }
  &__progress-value-box-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
  }

  &__progress-value-box {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.25rem;
  }

  &__progress-information-row {
    display: none;
    align-items: center;
    width: auto;
    gap: 0.25rem;
  }

  &__progress-information-key {
    color: var(--palette--5);
    white-space: nowrap;
  }
  &__progress-information-value {
    white-space: nowrap;
  }

  &__progress-value-point {
    width: 6px;
    min-width: 6px;
    height: 6px;
    border-radius: var(--border-radius--3);
    background: var(--palette--5);
  }

  &__information-wrapper {
    width: 100%;
    transition: var(--transition-default);

    &-inner {
      width: 100%;

      @media screen and (max-width: 767px) {
        overflow: hidden;
        padding-inline: 1.5rem;
        padding-bottom: 1.25rem;
      }
    }

    @media screen and (max-width: 767px) {
      display: grid;
      grid-template-rows: 1fr;
    }
  }

  &__information {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 0.75rem;
    margin-top: 1.25rem;
    background-color: var(--color-background--1);
    box-shadow: 0px 4px 60px 0 rgba(0, 0, 0, 0.11);
    border-radius: var(--border-radius--2);
    padding: 1.5rem 1.25rem;
    text-align: left;
    @media screen and (max-width: 767px) {
      box-shadow: 0px 4px 30px 0 rgba(0, 0, 0, 0.11);
    }
  }
  &__information-row {
    display: inline-flex;
    width: 100%;
    justify-content: start;
    align-items: top;
    gap: 0.25rem;
  }

  &__information-key {
    color: var(--palette--5);
    white-space: nowrap;
  }

  &__details {
    width: 100%;
    border-bottom-left-radius: var(--border-radius--2);
    border-bottom-right-radius: var(--border-radius--2);
    overflow: hidden;
  }
}
</style>
