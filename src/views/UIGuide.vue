<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums';
import { ROUTES } from '@/router/routes';
</script>

<template>
  <main>
    <MainGrid>
      <CustomHeader />
      <CustomAside />
      <CustomMain>
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
      </CustomMain>
    </MainGrid>
  </main>
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
