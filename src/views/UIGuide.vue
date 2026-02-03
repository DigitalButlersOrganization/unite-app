<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums';
import { ROUTES } from '@/router/routes';
</script>

<template>
  <div class="grid">
    <UIButton
      :border="BUTTON_BORDERS.LARGE"
      :size="BUTTON_SIZES.LARGE"
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
      :size="BUTTON_SIZES.LARGE"
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
      :size="BUTTON_SIZES.LARGE"
      :status="BUTTON_STATUSES.CTA_3"
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
      :status="BUTTON_STATUSES.DEFAULT"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">DEFAULT</p>
    </UIButton>
    <UIButton
      :border="BUTTON_BORDERS.MEDIUM"
      :size="BUTTON_SIZES.MEDIUM"
      :status="BUTTON_STATUSES.ACTIVE"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">ACTIVE</p>
    </UIButton>
    <UIButton
      :border="BUTTON_BORDERS.MEDIUM"
      :size="BUTTON_SIZES.MEDIUM"
      :status="BUTTON_STATUSES.COMPLETED"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">COMPLETED</p>
    </UIButton>
    <UIButton
      :border="BUTTON_BORDERS.MEDIUM"
      :size="BUTTON_SIZES.MEDIUM"
      :status="BUTTON_STATUSES.PENDING"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">PENDING</p>
    </UIButton>
    <UIButton
      :border="BUTTON_BORDERS.MEDIUM"
      :size="BUTTON_SIZES.MEDIUM"
      :status="BUTTON_STATUSES.REJECTED"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">REJECTED</p>
    </UIButton>
    <UIButton
      :border="BUTTON_BORDERS.MEDIUM"
      :size="BUTTON_SIZES.MEDIUM"
      :status="BUTTON_STATUSES.IN_PROGRESS"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">IN_PROGRESS</p>
    </UIButton>
    <UIButton
      :border="BUTTON_BORDERS.MEDIUM"
      :size="BUTTON_SIZES.MEDIUM"
      :status="BUTTON_STATUSES.DISABLED"
      :is-disabled="true"
      :to="ROUTES.HOME.PATH"
      class=""
    >
      <p class="paragraph paragraph--l">DISABLED</p>
    </UIButton>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--color-background--3);
  padding: 2.5rem;
}
</style>
