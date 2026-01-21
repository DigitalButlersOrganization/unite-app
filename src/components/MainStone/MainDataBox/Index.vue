<script setup lang="ts">
import type { IEvent } from '@/types/event';

const props = defineProps<{ eventData: IEvent; milestoneSlug: string }>();
</script>

<template>
  <div class="card">
    <div class="card__content">
      <div class="card__chapter">
        <div class="card__chapter-title">
          <p class="paragraph paragraph--l">Time Remaining:</p>
        </div>
        <div class="card__chapter-content">
          <p class="heading heading--l">{{ props.eventData.timeRemaining }}</p>
        </div>
      </div>
      <div class="card__chapter">
        <div class="card__chapter-title">
          <p class="paragraph paragraph--l">Reward:</p>
        </div>
        <div class="card__chapter-content">
          <p class="paragraph paragraph--m">Some text</p>
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
}
</style>
