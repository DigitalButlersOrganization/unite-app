<script setup lang="ts">
import { MILESTONE_TYPES } from '@/enums';
import type { IEvent } from '@/types/event';

const props = defineProps<{ eventData: IEvent; milestoneSlug: string }>();

const currentMilestone = props.eventData.steps.find(
  (step) => step.milestone.slug === props.milestoneSlug,
);
const numberOfCurrentStep = props.eventData.steps.indexOf(currentMilestone!);
</script>

<template>
  <UIContainer type="main-box">
    <div class="grid">
      <div class="grid__cell">
        <div v-if="numberOfCurrentStep !== -1" class="step-number">
          <p class="heading heading--l">Step {{ numberOfCurrentStep + 1 }}:</p>
        </div>
        <div v-if="currentMilestone?.milestone.title" class="title">
          <p class="heading heading--xl">{{ currentMilestone?.milestone.title }}</p>
        </div>
        <div v-if="currentMilestone?.milestone.description" class="description">
          <p class="paragraph paragraph--l">{{ currentMilestone?.milestone.description }}</p>
        </div>
      </div>
      <div class="grid__cell">
        <MainStoneMainDataBox
          v-if="currentMilestone"
          :event-data="props.eventData"
          :milestone-slug="props.milestoneSlug"
        />
      </div>
      <div
        v-if="
          currentMilestone?.milestone.type === MILESTONE_TYPES.FORM &&
          currentMilestone?.milestone.link
        "
        class="grid__cell"
      >
        <div class="form-wrapper">
          <iframe
            :src="currentMilestone.milestone.link"
            width="100%"
            height="600px"
            frameborder="0"
            style="border: none"
            allow="fullscreen"
            class="form-iframe"
          >
          </iframe>
        </div>
      </div>
    </div>
  </UIContainer>
</template>

<style lang="scss" scoped>
.grid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3.75rem;
  align-items: start;

  &__cell {
    display: flex;
    flex-direction: column;
    &:nth-child(1) {
      grid-column: 1 / 7;
    }
    &:nth-child(2) {
      grid-column: 7 / 13;
    }
    &:nth-child(3) {
      grid-column: 4 / 10;
    }
  }
}

.step-number {
  margin-bottom: 0.5rem;
}
.title {
  margin-bottom: 1.25rem;
}
.description {
  margin-bottom: 2rem;
}
.form-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: var(--border-radius--2);
  box-shadow: 0px 4px 3.75rem 0px rgba(0, 0, 0, 0.11);
}
.form-iframe {
  display: block;
  width: 100%;
}
</style>
