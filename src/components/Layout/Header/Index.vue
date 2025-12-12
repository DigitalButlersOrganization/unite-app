<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconLogOut from '@/assets/icons/log-out.svg'
</script>

<template>
  <header class="header">
    <UIContainer>
      <div class="header__layout">
        <RouterLink class="header__logo-link" to="/">
          <img alt="Vue logo" class="header__logo-image" src="@/assets/icons/logo.png" />
        </RouterLink>

        <div class="header__navigation-wrapper">
          <nav class="header__navigation">
            <RouterLink to="/">
              <div>Home</div>
            </RouterLink>
            <RouterLink to="/about">
              <div>About</div>
            </RouterLink>
            <button class="button button--transparent button--logout">
              <IconLogOut />
              <div>Log out</div>
            </button>
          </nav>
        </div>
      </div>
    </UIContainer>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding-block: 6px;

  &__layout {
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
