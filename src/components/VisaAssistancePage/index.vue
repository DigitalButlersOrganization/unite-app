<script setup lang="ts">
import { useBreakpoints } from '@/composables';
import { api } from '@/services/api';
import type { IEvent } from '@/types/event';
import * as store from '@/stores';
import { MILESTONE_STATUSES } from '@/enums';

const props = defineProps<{ eventData: IEvent }>();
const eventsStore = store.useEventsStore();
const userStore = store.useUserStore();
const currentEvent = eventsStore.data.find((event) => event.slug === props.eventData.slug);
const { isDesktop } = useBreakpoints();

api.events.getCurrentEventVisaAssistance({ store, id: props.eventData.slug });

const modifiedSrc = (link: string) => {
  const url = new URL(link);
  url.searchParams.set('engagement_id', userStore.engagementId || '');
  return url.toString();
};
</script>

<template>
  <UIContainer v-if="props.eventData.isCurrentVisaAssistanceLoading" type="main-box">
    <p class="heading heading--l">Loading...</p>
  </UIContainer>
  <UIContainer v-else-if="currentEvent" type="main-box">
    <div class="grid">
      <div class="grid__cell">
        <div class="title">
          <p class="heading heading--xl">Visa assistance</p>
        </div>

        <div v-if="currentEvent.visaAssistance?.milestone.description" class="description">
          <div v-html="currentEvent.visaAssistance?.milestone.description" class="paragraph"></div>
        </div>

        <div
          v-if="
            currentEvent.visaAssistance?.milestone.notes ||
            (currentEvent.visaAssistance?.milestone?.files?.length ?? 0) > 0
          "
          class="notes"
        >
          <MainStoneAccentBox>
            <div class="notes__inner">
              <div class="notes__inner-content" v-if="currentEvent.visaAssistance?.milestone.notes">
                <div class="paragraph" v-html="currentEvent.visaAssistance?.milestone.notes"></div>
              </div>
              <template v-if="currentEvent.visaAssistance?.milestone.files">
                <MainStoneAccentBoxListOfFiles
                  v-if="currentEvent.visaAssistance?.milestone.files.length"
                  :files="currentEvent.visaAssistance?.milestone.files || []"
                />
              </template>
            </div>
          </MainStoneAccentBox>
        </div>
      </div>
      <div class="grid__cell" v-if="isDesktop"></div>

      <div
        v-if="
          currentEvent.visaAssistance?.milestone.link &&
          currentEvent.visaAssistance.status !== MILESTONE_STATUSES.COMPLETED
        "
        class="grid__cell"
      >
        <div class="form-wrapper">
          <iframe
            :src="modifiedSrc(currentEvent.visaAssistance.milestone.link)"
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
    display: block;
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

.title {
  margin-bottom: 1.25rem;
}
.description {
  margin-bottom: 2rem;
}
.notes {
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
