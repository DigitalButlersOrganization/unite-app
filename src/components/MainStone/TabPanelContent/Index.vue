<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useBreakpoints } from '@/composables';
import { MILESTONE_TYPES } from '@/enums';
import type { IEvent } from '@/types/event';
import { api } from '@/services/api';
import * as store from '@/stores';

const props = defineProps<{ eventData: IEvent; milestoneSlug: string }>();

const currentMilestone = props.eventData.steps.find(
  (step) => step.milestone.slug === props.milestoneSlug,
);

const numberOfCurrentStep = props.eventData.steps.indexOf(currentMilestone!);

const { isDesktop } = useBreakpoints();

const handleFilloutMessage = (event: MessageEvent) => {
  if (event.origin !== 'https://applications.unite2030.com') {
    return;
  }

  if (event.data?.type === 'form_submit') {
    console.log('Нужно здесь запросить обновление данного евента');
    api.events.getCurrentEvent({ store, id: props.eventData.slug });
  }
};

onMounted(() => {
  window.addEventListener('message', handleFilloutMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', handleFilloutMessage);
});
</script>

<template>
  <MainStoneMainDataBoxMobile
    v-if="currentMilestone && !isDesktop"
    :event-data="props.eventData"
    :milestone-slug="props.milestoneSlug"
  />
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
          <div
            v-html="currentMilestone?.milestone.description"
            class="paragraph paragraph--l"
          ></div>
        </div>
        <div
          v-if="
            currentMilestone?.milestone.notes ||
            (currentMilestone?.milestone?.files?.length ?? 0) > 0
          "
          class="notes"
        >
          <MainStoneAccentBox>
            <div class="notes__inner">
              <div class="notes__inner-content" v-if="currentMilestone?.milestone.notes">
                <div
                  class="paragraph paragraph--l"
                  v-html="currentMilestone?.milestone.notes"
                ></div>
              </div>
              <template v-if="currentMilestone?.milestone.files">
                <a
                  v-for="(value, index) in currentMilestone.milestone.files"
                  :key="index"
                  :href="value.url"
                  class="notes__link"
                >
                  <p class="paragraph paragraph--l">
                    {{ value.title }}
                  </p>
                </a>
              </template>
            </div>
          </MainStoneAccentBox>
        </div>
      </div>
      <div class="grid__cell" v-if="isDesktop">
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
            scrolling="no"
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
<style lang="scss">
.notes__inner-content {
  a {
    text-decoration: underline;
    font-weight: 700;
    transition: var(--transition-default);

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
<style lang="scss" scoped>
.grid {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3.75rem;
  align-items: start;

  .paragraph {
    line-height: 150%;
  }

  @media screen and (max-width: 1280px) {
    gap: 2.75rem;
  }
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.25rem;
  }

  &__cell {
    display: flex;
    flex-direction: column;
    z-index: 0;

    & > *:last-child {
      margin-bottom: 0 !important;
    }

    &:nth-child(1) {
      grid-column: 1 / 7;
    }
    &:nth-child(2) {
      grid-column: 7 / 13;
    }
    &:nth-child(3) {
      grid-column: 4 / 10;

      @media screen and (max-width: 1280px) {
        grid-column: 1 / 13;
      }
    }

    @media screen and (max-width: 991px) {
      grid-column: 1 / 2 !important;
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
.notes {
  &__link {
    padding: 1rem 0;
    display: inline-block;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
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
