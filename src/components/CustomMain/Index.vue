<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums'
import { ROUTES } from '@/router/routes'
</script>

<template>
  <main class="main">
    <div class="main__list">
      <CustomMainListOfPages />
    </div>
    <div class="main__content">
      <UIButton
        :border="BUTTON_BORDERS.LARGE"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.CTA_1"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.HOME.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.LARGE"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.CTA_2"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.HOME.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.LARGE"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.CTA_3"
        :to="ROUTES.HOME.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.HOME.NAME }}
        </p>
      </UIButton>
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 6px;

  &__list {
    flex-shrink: 0;
  }
  &__content {
    background: #ccc;
    // background: var(--color-background--1);
    flex-grow: 1;
    overflow: auto;
    padding: 3rem;
    border-bottom-left-radius: var(--border-radius--2);
    border-bottom-right-radius: var(--border-radius--2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
}
</style>
