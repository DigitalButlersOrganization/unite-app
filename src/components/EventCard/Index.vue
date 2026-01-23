<script setup lang="ts">
import IconArrowDown1 from '@/assets/icons/arrow-down-1.svg';
import IconArrowRight1 from '@/assets/icons/arrow-right-1.svg';
import IconQuestionMark1 from '@/assets/icons/question-mark-1.svg';
import type { IEvent } from '@/types/event';
import { formatDate, formatTimeRemaining } from '@/utils';
import { useEventsStore } from '@/stores';
import { useBreakpoints } from '@/composables';

const props = defineProps<{ options: IEvent }>();

const eventsStore = useEventsStore();
const { isDesktop } = useBreakpoints();
</script>

<template>
  <div
    class="card"
    :style="
      eventsStore.currentEventId && !isDesktop && eventsStore.currentEventId === props.options.id
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
        <div class="card__progress-value-box">
          <div class="card__progress-value-point"></div>
          <div class="card__progress-value-text">
            <p class="paragraph paragraph">{{ props.options.progress }}%</p>
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
      <div class="card__list-of-triggers">
        <div class="card__trigger-wrapper">
          <a href="#" class="card__trigger js--active">
            <div class="card__trigger-content">
              <div class="card__trigger-content-text">
                <p class="paragraph paragraph--l">Milestones</p>
              </div>
              <div style="display: none" class="card__trigger-content-icon">
                <IconQuestionMark1 />
              </div>
              <div style="display: none" class="card__trigger-content-label">New!</div>
            </div>
            <div class="card__trigger-arrow">
              <IconArrowRight1 />
            </div>
          </a>
        </div>
        <div class="card__trigger-wrapper">
          <a href="#" class="card__trigger">
            <div class="card__trigger-content">
              <div class="card__trigger-content-text">
                <p class="paragraph paragraph--l">Visa assistance</p>
              </div>
              <div style="display: none" class="card__trigger-content-icon">
                <IconQuestionMark1 />
              </div>
              <div class="card__trigger-content-label">New!</div>
            </div>
            <div class="card__trigger-arrow">
              <IconArrowRight1 />
            </div>
          </a>
        </div>
        <div class="card__trigger-wrapper">
          <a href="/" class="card__trigger card__trigger--disabled" @click.prevent>
            <div class="card__trigger-content">
              <div class="card__trigger-content-text">
                <p class="paragraph paragraph--l">Circle</p>
              </div>
              <div class="card__trigger-content-icon">
                <IconQuestionMark1 />
              </div>
              <div style="display: none" class="card__trigger-content-label">New!</div>
            </div>
            <div class="card__trigger-arrow">
              <IconArrowRight1 />
            </div>
          </a>
        </div>
      </div>
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
    padding-inline: 1.75rem;
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
    @media screen and (max-width: 767px) {
      padding-top: 2rem;
      padding-inline: 1.75rem;
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
    @media screen and (max-width: 767px) {
      padding-inline: 1.75rem;
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
  &__progress-value-box {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 0.25rem;
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
        padding-inline: 1.75rem;
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

  &__list-of-triggers {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  &__trigger-wrapper {
    width: 100%;
    border-top: 1px solid var(--palette--21);

    &:last-of-type {
      &,
      .card__trigger {
        border-bottom-left-radius: var(--border-radius--2);
        border-bottom-right-radius: var(--border-radius--2);
      }
    }
  }

  &__trigger {
    width: 100%;
    padding: 1.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: var(--color-text--1);
    background: var(--color-background--1);
    transition: var(--transition-default);

    &.js--active,
    &:hover {
      &:not(.card__trigger--disabled) {
        background: var(--palette--4);
        color: var(--palette--5);
      }
    }
    &--disabled {
      cursor: not-allowed;
      color: var(--palette--8);
    }

    &-content {
      display: flex;
      align-items: center;
    }
    &-content-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.125rem;
      height: 1.125rem;
      margin-left: 0.75rem;
    }
    &-content-label {
      margin-left: 0.5rem;
      padding: 3px 0.375rem 2px;
      background: var(--palette--5);
      color: var(--color-text--2);
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: var(--border-radius--3);
      text-transform: uppercase;
      line-height: 100%;
      letter-spacing: -0.03em;
    }
  }
}
</style>
