<script setup lang="ts">
import { RouterLink } from 'vue-router';
import IconLogOut from '@/assets/icons/log-out.svg';
import { ROUTES } from '@/router/routes';
</script>

<template>
  <header class="header">
    <div class="header__layout">
      <RouterLink class="header__logo-link" :to="ROUTES.HOME.PATH">
        <img alt="Vue logo" class="header__logo-image" src="@/assets/icons/logo.png" />
      </RouterLink>

      <div class="header__navigation-wrapper">
        <nav class="header__navigation">
          <RouterLink :to="ROUTES.UI_GUIDE.PATH">
            <div>{{ ROUTES.UI_GUIDE.NAME }}</div>
          </RouterLink>
          <button class="button button--transparent button--logout">
            <IconLogOut />
            <div>Log out</div>
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 3;

  &__layout {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.75rem;
    background: var(--color-background--1);
    border-radius: var(--border-radius--2);
    overflow: hidden;
  }

  &__logo-link {
    display: flex;
    width: 2rem;
    height: 2rem;
    position: relative;
  }
  &__logo-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__navigation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5rem;

    .button {
      &--logout {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    }
  }
}
</style>
