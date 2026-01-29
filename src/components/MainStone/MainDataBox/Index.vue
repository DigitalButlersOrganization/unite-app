<script setup lang="ts">
import type { IEvent } from '@/types/event';
import { formatTimeRemaining, getCurrentProgressForTimeRemaining } from '@/utils';

const props = defineProps<{ eventData: IEvent; milestoneSlug: string }>();

const currentStep = props.eventData.steps.find(
  (step) => step.milestone.slug === props.milestoneSlug,
);
</script>

<template>
  <div class="card">
    <div class="card__content">
      <div class="card__chapter">
        <div class="card__chapter-title">
          <p class="paragraph paragraph--l">Time Remaining:</p>
        </div>
        <div class="card__chapter-content">
          <p class="heading heading--l">{{ formatTimeRemaining(props.eventData.timeRemaining) }}</p>
        </div>
        <div class="card__progress-box-wrapper">
          <div class="card__progress-box">
            <div
              class="card__progress-line"
              :style="`width: ${getCurrentProgressForTimeRemaining(props.eventData)}%`"
            ></div>
          </div>
        </div>
      </div>
      <div class="card__chapter">
        <div class="card__chapter-title">
          <p class="paragraph paragraph--l">Reward:</p>
        </div>
        <div class="card__chapter-content">
          <p class="paragraph paragraph--m">
            {{ currentStep?.milestone.rewards }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 2rem;
  border-radius: var(--border-radius--2);
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 406px;
  box-shadow: 0px 4px 3.75rem 0px rgba(0, 0, 0, 0.11);
  margin-inline-start: auto;
  background: var(--color-background--1);

  @media screen and (max-width: 991px) {
    max-width: none;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__chapter {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &-title {
      color: var(--palette--5);
    }
  }
  &__progress-box-wrapper {
    width: 100%;
    margin-top: -4px;
  }
  &__progress-box {
    width: 100%;
    height: 6px;
    background: var(--palette--23);
    border-radius: var(--border-radius--2);
  }
  &__progress-line {
    height: 100%;
    background: var(--palette--24);
    border-radius: var(--border-radius--2);
  }
}
</style>
