<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useBreakpoints } from '@/composables';
import type { IEvent } from '@/types/event';
import { api } from '@/services/api';
import * as store from '@/stores';
import {
  BUTTON_BORDERS,
  BUTTON_SIZES,
  BUTTON_STATUSES,
  MILESTONE_PHASES,
  MILESTONE_STATUSES,
} from '@/enums';
import { isDisplayedMainDataBox } from '@/utils';

const userStore = store.useUserStore();
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
    api.events.updateMilestoneStatus({
      slug: props.eventData.slug,
      milestoneSlug: props.milestoneSlug,
      store,
    });
  }
};

onMounted(() => {
  window.addEventListener('message', handleFilloutMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', handleFilloutMessage);
});

const modifyCentToDollar = (amountInCent: number) => {
  return parseFloat((amountInCent / 100).toFixed(2));
};
const modifiedSrc = (link: string) => {
  const url = new URL(link);
  url.searchParams.set('program_id', props.eventData.programId);
  url.searchParams.set('email', userStore.email);
  url.searchParams.set('contact_id', userStore.contactId || '');
  return url.toString();
};
</script>

<template>
  <MainStoneMainDataBoxMobile
    v-if="
      currentMilestone && !isDesktop && currentMilestone?.status !== MILESTONE_STATUSES.REJECTED
    "
    :event-data="props.eventData"
    :milestone-slug="props.milestoneSlug"
  />
  <UIContainer
    type="main-box"
    :style="!isDesktop && isDisplayedMainDataBox(currentMilestone) ? 'padding-bottom: 152px' : ''"
  >
    <div class="grid">
      <div v-if="currentMilestone?.status === MILESTONE_STATUSES.REJECTED" class="grid__cell">
        <div class="title">
          <p class="heading heading--xl">Your application status</p>
        </div>
        <div class="description">
          <div class="paragraph">
            <div>
              Thank you for your interest in the event "{{ props.eventData.eventName }}". We have
              carefully reviewed your application, but unfortunately, we cannot approve it in its
              current form. The information provided was insufficient or did not meet our selection
              criteria. We recommend paying closer attention to detail when completing your profile
              in the future.
            </div>
          </div>
        </div>
      </div>
      <div v-else class="grid__cell">
        <div
          v-if="
            numberOfCurrentStep !== -1 &&
            currentMilestone?.milestone.phase === MILESTONE_PHASES.MAIN &&
            !(currentMilestone?.milestone.type === 'event' && numberOfCurrentStep === 0)
          "
          class="step-number"
        >
          <p class="heading heading--l">Step {{ numberOfCurrentStep + 1 }}:</p>
        </div>
        <div v-if="currentMilestone?.milestone.title" class="title">
          <p class="heading heading--xl">{{ currentMilestone?.milestone.title }}</p>
        </div>
        <div v-if="currentMilestone?.milestone.description" class="description">
          <div v-html="currentMilestone?.milestone.description" class="paragraph"></div>
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
                <div class="paragraph" v-html="currentMilestone?.milestone.notes"></div>
              </div>
              <MainStoneAccentBoxListOfFiles
                v-if="currentMilestone?.milestone.files.length"
                :files="currentMilestone?.milestone.files || []"
              />
            </div>
          </MainStoneAccentBox>
        </div>
        <div
          v-if="
            currentMilestone &&
            currentMilestone.payment &&
            (currentMilestone.payment.fullPaymentLink ||
              currentMilestone.payment.depositPaymentLink)
          "
          class="payment-links"
        >
          <UIButton
            :border="BUTTON_BORDERS.LARGE"
            :size="BUTTON_SIZES.LARGE"
            :status="BUTTON_STATUSES.CTA_2"
            :to="currentMilestone.payment.fullPaymentLink"
            :is-blank="true"
            v-if="currentMilestone.payment.totalAmount && currentMilestone.payment.fullPaymentLink"
          >
            <div class="paragraph paragraph--l">
              Full payment (${{ modifyCentToDollar(currentMilestone.payment.totalAmount) }})
            </div>
          </UIButton>
          <UIButton
            :border="BUTTON_BORDERS.LARGE"
            :size="BUTTON_SIZES.LARGE"
            :status="BUTTON_STATUSES.CTA_3"
            :to="currentMilestone.payment.depositPaymentLink"
            :is-blank="true"
            v-if="
              currentMilestone.payment.depositAmount && currentMilestone.payment.depositPaymentLink
            "
          >
            <div class="paragraph paragraph--l">
              Deposit payment (${{ modifyCentToDollar(currentMilestone.payment.depositAmount) }})
            </div>
          </UIButton>
        </div>
      </div>
      <div
        class="grid__cell"
        v-if="isDesktop && currentMilestone?.status !== MILESTONE_STATUSES.REJECTED"
      >
        <MainStoneMainDataBox
          v-if="currentMilestone"
          :event-data="props.eventData"
          :milestone-slug="props.milestoneSlug"
        />
      </div>
      <div
        v-if="
          currentMilestone?.milestone.link &&
          currentMilestone?.status !== MILESTONE_STATUSES.REJECTED &&
          currentMilestone?.status !== MILESTONE_STATUSES.COMPLETED
        "
        class="grid__cell"
      >
        <div class="form-wrapper">
          <iframe
            :src="modifiedSrc(currentMilestone.milestone.link)"
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
.notes {
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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

.payment-links {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
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
