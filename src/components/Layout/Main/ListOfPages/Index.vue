<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums'
import { ROUTES } from '@/router/routes'
</script>

<template>
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
</template>

<style lang="scss" scoped>
.list-of-pages {
  width: 100%;
  color: var(--color-text--3);
  background: var(--color-background--3);
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);
  border-bottom: 1px solid var(--palette--3);
  overflow: auto;
  display: flex;
  padding: 6px;
}
</style>
