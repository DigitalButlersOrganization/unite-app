<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums';
import { ROUTES } from '@/router/routes';
</script>

<template>
  <div class="list-of-pages-wrapper with-scrollbar">
    <div class="list-of-pages">
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.BASE"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 1: Complete application</p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.ACTIVE"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 2: Application review</p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.SUCCESS"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 3: Deposit payment</p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.PAUSED"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 4: Info form</p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.NOT_APPROVED"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 5: Full payment</p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.AVAILABLE"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 6: Pre-assessment survey</p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.BASE"
        :is-disabled="true"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">Step 7: Event</p>
      </UIButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-of-pages-wrapper {
  width: 100%;
  overflow: auto;
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);
  background: var(--color-background--3);
}
.list-of-pages {
  min-width: 100%;
  width: max-content;
  color: var(--color-text--3);
  border-bottom: 1px solid var(--palette--3);
  overflow: auto;
  display: flex;
  padding: 6px;
}
</style>
