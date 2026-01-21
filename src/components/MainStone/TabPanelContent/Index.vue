<script setup lang="ts">
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
      <div class="grid__cell"></div>
      <div v-if="currentMilestone?.milestone.type" class="grid__cell"></div>
      {{ currentMilestone?.milestone.title }}

      <br /><br />

      {{ currentMilestone?.milestone.description }}
    </div>
  </UIContainer>
</template>

<style lang="scss" scoped>
.grid {
  position: relative;
  width: 100%;
  background-color: red;
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
</style>
