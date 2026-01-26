<script setup lang="ts">
import type { IEvent } from '@/types/event';
import { formatTimeRemaining } from '@/utils';
import IconArrowDown1 from '@/assets/icons/arrow-down-1.svg';
import { useEventsStore } from '@/stores';

const props = defineProps<{ eventData: IEvent; milestoneSlug: string }>();

const eventsStore = useEventsStore();

const toggleIsTimeRemainingStatus = () => {
  eventsStore.isTimeRemainingOpen = !eventsStore.isTimeRemainingOpen;
};

const getCurrentProgress: () => number = () => {
  return 35;
};

window.addEventListener('resize', () => {
  if (window.innerWidth > 767) {
    eventsStore.isTimeRemainingOpen = false;
  }
});
</script>

<template>
  <div class="card">
    <div class="card__content">
      <button class="card__summary" @click="toggleIsTimeRemainingStatus">
        <div class="card__summary-outer">
          <div class="card__summary-inner">
            <div class="card__summary-title">Time Remaining:</div>
            <div class="card__summary-content">
              <div class="card__summary-time-remaining">
                {{ formatTimeRemaining(props.eventData.timeRemaining) }}
              </div>
            </div>
            <div
              class="card__arrow-box"
              :class="eventsStore.isTimeRemainingOpen ? 'card__arrow-box--open' : ''"
            >
              <div class="card__arrow-svg">
                <IconArrowDown1 />
              </div>
            </div>
          </div>
          <div class="card__progress-box-wrapper">
            <div class="card__progress-box">
              <div class="card__progress-line" :style="`width: ${getCurrentProgress()}%`"></div>
            </div>
          </div>
        </div>
      </button>
      <div
        class="card__details"
        :class="eventsStore.isTimeRemainingOpen ? 'card__details--open' : ''"
      >
        <div class="card__details-outer">
          <div class="card__details-inner">
            <div class="card__details-title">
              <p class="paragraph">Reward:</p>
            </div>
            <div class="card__details-content">
              <!-- <p class="paragraph">Some text</p> -->
              <p class="paragraph">
                We’ll notify you by email as soon as it’s available for download. Access to the
                Resources section with helpful information for event preparation. Your certificate
                of completion is currently being prepared. Please note that it will be ready in the
                next few days (or possibly a week or so). We’ll notify you by email as soon as it’s
                available for download.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: fixed;
  bottom: 0;
  left: 0;
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);
  overflow: hidden;
  width: 100%;
  box-shadow: 0px 4px 3.75rem 0px rgba(0, 0, 0, 0.11);
  margin-inline-start: auto;
  background: var(--palette--5);
  color: var(--color-text--2);
  z-index: 15;
  // translate: 0 calc(100% - 104px);
  transition: var(--transition-default);

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__summary {
    display: flex;
    gap: 0.75rem;
    width: 100%;
    align-items: center;
    overflow: hidden;
    padding-top: 2rem;
    padding-inline: 2rem;
    padding-bottom: 1.25rem;
    background: var(--palette--5);
    color: var(--color-text--2);
    border: none;
    text-align: left;

    &-outer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    &-inner {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      padding-right: 3rem;
      justify-content: center;
    }
    &-title {
      font-weight: 600;
      font-size: 1rem;
      line-height: 1em;
      letter-spacing: -0.03em;
    }

    &-content {
      width: 100%;
      max-height: 50vh;
      overflow: auto;
    }

    &-time-remaining {
      font-weight: 500;
      font-size: 1.75rem;
      line-height: 1.1em;
      letter-spacing: -0.06em;
    }
  }
  &__details {
    width: 100%;
    align-items: center;
    overflow: hidden;
    background: var(--palette--5);
    color: var(--color-text--2);
    border: none;
    text-align: left;
    padding-inline: 2rem;

    display: grid;
    grid-template-rows: 0fr;
    transition: var(--transition-default);
    gap: 0.75rem;

    &-outer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
      overflow: hidden;
    }
    &-inner {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
    &-title {
      font-weight: 600;
      font-size: 1rem;
      line-height: 1em;
      letter-spacing: -0.03em;
    }

    &-content {
      width: 100%;
      max-height: 50vh;
      overflow: auto;
      padding-bottom: 0.875rem;
    }

    &--open {
      grid-template-rows: 1fr;
    }
  }
  &__progress-box {
    width: 100%;
    height: 6px;
    background: var(--color-background--1);
    border-radius: var(--border-radius--2);
    margin-top: 2px;
  }
  &__progress-box-wrapper {
    width: 100%;
  }
  &__progress-line {
    height: 100%;
    background: var(--palette--10);
    border-radius: var(--border-radius--2);
  }
  &__arrow-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--palette--2);
    border-radius: var(--border-radius--3);
    transition: var(--transition-default);
    position: absolute;
    right: 2rem;

    &--open {
      transform: rotate(180deg);
    }
  }
  &__arrow-svg {
    display: flex;
    top: 2px;
    position: relative;
  }
}
</style>
