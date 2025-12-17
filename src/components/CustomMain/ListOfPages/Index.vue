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
        <p class="paragraph paragraph--l">
          {{ ROUTES.HOME.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.ACTIVE"
        :to="ROUTES.ABOUT.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.ABOUT.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.SUCCESS"
        :to="ROUTES.ABOUT.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.ABOUT.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.PAUSED"
        :to="ROUTES.ABOUT.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.ABOUT.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.NOT_APPROVED"
        :to="ROUTES.ABOUT.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.ABOUT.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.AVAILABLE"
        :to="ROUTES.ABOUT.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.ABOUT.NAME }}
        </p>
      </UIButton>
      <UIButton
        :border="BUTTON_BORDERS.MEDIUM"
        :size="BUTTON_SIZES.MEDIUM"
        :status="BUTTON_STATUSES.BASE"
        :is-disabled="true"
        :to="ROUTES.ABOUT.PATH"
        class=""
      >
        <p class="paragraph paragraph--l">
          {{ ROUTES.ABOUT.NAME }}
        </p>
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
