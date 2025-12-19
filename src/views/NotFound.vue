<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ROUTES } from '@/router/routes';
import { BUTTON_BORDERS, BUTTON_STATUSES } from '@/enums';

const router = useRouter();
</script>

<template>
  <SmallSectionLayout>
    <div class="not-found">
      <div class="not-found__content">
        <h1 class="not-found__title heading">404</h1>
        <p class="not-found__description heading heading--xl">Page not found</p>
        <p class="not-found__text paragraph">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <UIButton
          :status="BUTTON_STATUSES.CTA_3"
          :border="BUTTON_BORDERS.LARGE"
          @click="router.push(ROUTES.HOME.PATH)"
          class="not-found__button"
          >Go Home</UIButton
        >
      </div>
    </div>
  </SmallSectionLayout>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  &__title {
    font-size: 6rem;
  }

  &__text {
    margin: 1.5rem 0;
    max-width: 250px;
  }
}
</style>
