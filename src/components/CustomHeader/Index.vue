<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import IconLogOut from '@/assets/icons/log-out.svg';
import { ROUTES } from '@/router/routes';
import { api } from '@/services/api';
import * as store from '@/stores';

const router = useRouter();

const logout = async () => {
  await api.auth.logout({
    store,
    router,
  });
};
</script>

<template>
  <header class="header">
    <div class="header__layout">
      <RouterLink class="header__logo-link" :to="ROUTES.HOME.PATH">
        <img alt="Vue logo" class="header__logo-image" src="@/assets/images/logo.png" />
      </RouterLink>

      <div class="header__navigation-wrapper">
        <nav class="header__navigation">
          <a href="mailto:test@example.com" class="button button--transparent">
            <p class="paragraph paragraph--l">Contact us</p>
          </a>
          <button @click="logout" class="button button--transparent">
            <div class="button__icon-wrapper">
              <IconLogOut />
            </div>
            <p class="paragraph paragraph--l">Log out</p>
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
    min-width: 2rem;
    height: 2rem;
    position: relative;
    border-radius: 100vmax;
    transition: var(--transition-default);

    &:hover {
      opacity: 0.7;
    }
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
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: var(--transition-default);

      &__icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.125rem;
        min-width: 1.125rem;
        height: 1.125rem;
      }

      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
