<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES } from '@/enums';
import { ROUTES } from '@/router/routes';
</script>

<template>
  <main>
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
    </div>
  </main>
</template>

<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #ccc;
  padding: 2.5rem;
}
</style>
