<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums';

const props = defineProps<{ eventId: string }>();
</script>

<template>
  <div class="tabs">
    <div class="tabs__buttons-wrapper with-scrollbar">
      <div class="tabs__buttons">
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.BASE"
          class=""
        >
          <p class="paragraph paragraph--l">Step 1: Complete application</p>
        </UIButton>
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.ACTIVE"
          class=""
        >
          <p class="paragraph paragraph--l">Step 2: Application review</p>
        </UIButton>
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.SUCCESS"
          class=""
        >
          <p class="paragraph paragraph--l">Step 3: Deposit payment</p>
        </UIButton>
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.PAUSED"
          class=""
        >
          <p class="paragraph paragraph--l">Step 4: Info form</p>
        </UIButton>
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.NOT_APPROVED"
          class=""
        >
          <p class="paragraph paragraph--l">Step 5: Full payment</p>
        </UIButton>
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.AVAILABLE"
          class=""
        >
          <p class="paragraph paragraph--l">Step 6: Pre-assessment survey</p>
        </UIButton>
        <UIButton
          :border="BUTTON_BORDERS.MEDIUM"
          :size="BUTTON_SIZES.MEDIUM"
          :status="BUTTON_STATUSES.BASE"
          :is-disabled="true"
          class=""
        >
          <p class="paragraph paragraph--l">Step 7: Event</p>
        </UIButton>
      </div>
    </div>
    <div class="tabs__tabpanels">
      <UIContainer type="main-box"> Some tab content </UIContainer>
    </div>
  </div>
  <UIContainer type="main-box">
    <h1 class="heading heading--l">{{ props.eventId }}</h1>
  </UIContainer>
</template>

<style lang="scss" scoped>
.tabs {
  width: 100%;

  &__buttons-wrapper {
    width: 100%;
    overflow: auto;
    border-top-left-radius: var(--border-radius--2);
    border-top-right-radius: var(--border-radius--2);
    background: var(--color-background--3);
  }
  &__buttons {
    min-width: 100%;
    width: max-content;
    color: var(--color-text--3);
    border-bottom: 1px solid var(--palette--3);
    overflow: auto;
    display: flex;
    padding: 6px;
  }
}
</style>
