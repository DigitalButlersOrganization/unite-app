<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import IconLogOut from '@/assets/icons/log-out.svg';
import IconLogOut2 from '@/assets/icons/log-out-2.svg';
import { ROUTES } from '@/router/routes';
import { api } from '@/services/api';
import * as store from '@/stores';
import { COMPANY_INFO } from '@/constants';
import { useBreakpoints } from '@/composables';
import { ref } from 'vue';

const router = useRouter();

const logout = async () => {
  await api.auth.logout({
    store,
    router,
  });
};
const { isDesktop } = useBreakpoints();
const isActiveBurger = ref(false);

const burgerClickHandler = () => {
  isActiveBurger.value = !isActiveBurger.value;
};
const resizeHandler = () => {
  if (isDesktop) {
    isActiveBurger.value = false;
  }
};

window.addEventListener('resize', resizeHandler);
</script>

<template>
  <header class="header">
    <div class="header__layout">
      <RouterLink class="header__logo-link" :to="ROUTES.HOME.PATH">
        <img alt="Vue logo" class="header__logo-image" src="@/assets/images/logo.png" />
      </RouterLink>
      <button
        @click="burgerClickHandler"
        class="header__burger"
        :class="isActiveBurger ? 'header__burger--active' : ''"
      >
        <div class="header__burger-line header__burger-line--top"></div>
        <div class="header__burger-line header__burger-line--bottom"></div>
      </button>
      <div
        class="header__navigation-wrapper"
        :class="isActiveBurger ? 'header__navigation-wrapper--active' : ''"
      >
        <div class="header__navigation-wrapper-inner">
          <nav class="header__navigation">
            <a :href="`mailto:${COMPANY_INFO.email}`" class="button button--transparent">
              <p :class="isDesktop ? 'paragraph paragraph--l' : 'heading heading--m'">Contact us</p>
            </a>
            <button @click="logout" class="button button--transparent">
              <div class="button__icon-wrapper">
                <IconLogOut v-if="isDesktop" />
                <IconLogOut2 v-else />
              </div>
              <p :class="isDesktop ? 'paragraph paragraph--l' : 'heading heading--m'">Log out</p>
            </button>
          </nav>
        </div>
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
    position: relative;

    @media screen and (max-width: 767px) {
      padding-inline: 1.5rem;
      flex-wrap: wrap;
    }
  }

  &__burger {
    display: none;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    min-width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--border-radius--1);
    position: relative;
    background-color: transparent;
    border: none;
    transition: var(--transition-default);
    z-index: 4;

    &-line {
      position: absolute;
      width: 100%;
      height: 2px;
      background: var(--palette--1);
      border-radius: var(--border-radius--1);
      transition: var(--transition-default);

      &--top {
        translate: 0 3px;
      }
      &--bottom {
        translate: 0 -3px;
      }
    }
    @media screen and (max-width: 767px) {
      display: flex;
    }
    &:hover {
      opacity: 0.7;
    }

    &--active {
      & .header__burger-line--top {
        rotate: 45deg;
        translate: 0 0;
      }
      & .header__burger-line--bottom {
        rotate: -45deg;
        translate: 0 0;
      }
    }
  }

  &__navigation-wrapper {
    &--active {
      grid-template-rows: 1fr !important;
      top: 0;
    }
    @media screen and (max-width: 767px) {
      position: absolute;
      z-index: 3;
      background: #fff;
      border-radius: var(--border-radius--2);
      box-shadow: 0px 30px 30px 0 rgba(0, 0, 0, 0.3);
      top: 50%;
      left: 0;
      overflow: hidden;
      display: grid;
      grid-template-rows: 0fr;
      width: 100%;
      transition: var(--transition-default);
    }
  }

  &__navigation-wrapper-inner {
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
    z-index: 4;

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
    @media screen and (max-width: 767px) {
      padding-bottom: 1rem;
      flex-direction: column;
      gap: 1.125rem;
      align-items: center;
      justify-content: center;
      padding-top: 112px;
      padding-bottom: 104px;
    }
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 0.75rem;
  }
}
</style>
