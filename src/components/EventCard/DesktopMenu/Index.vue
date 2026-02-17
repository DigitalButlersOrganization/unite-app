<script setup lang="ts">
import IconArrowRight1 from '@/assets/icons/arrow-right-1.svg';
import IconQuestionMark1 from '@/assets/icons/question-mark-1.svg';
import { useBreakpoints } from '@/composables';
import router from '@/router';
import { useEventsStore } from '@/stores';
import type { IEvent } from '@/types/event';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{ options: IEvent }>();

const eventsStore = useEventsStore();
const { isDesktop } = useBreakpoints();

const isCurrentPage = (slug: string) => {
  const currentSlug = router.currentRoute.value;
  return currentSlug.path === slug;
};

const handleLinkClick = (e: MouseEvent, option: IEvent['menu'][number]) => {
  if (!option.enable || isCurrentPage(option.slug)) {
    e.preventDefault();
  } else {
    if (eventsStore.shouldShowAccent(option, props.options.slug)) {
      const currentMenuItem = eventsStore.data
        .find((item) => eventsStore.currentEventId === item.slug)
        ?.menu.find((menuItem) => menuItem.slug === option.slug);
      if (!currentMenuItem) return;
      currentMenuItem.showTagNewOverlay = false;
    }
  }
};
</script>

<template>
  <div class="card__list-of-triggers">
    <div
      class="card__trigger-wrapper"
      :class="
        isDesktop && eventsStore.shouldShowAccent(option, props.options.slug)
          ? 'card__trigger-wrapper--accent'
          : ''
      "
      v-for="option in props.options.menu"
      :key="option.id"
    >
      <div
        v-if="isDesktop && eventsStore.shouldShowAccent(option, props.options.slug)"
        class="greeting-tooltip"
      >
        <p class="paragraph">
          You’ll receive an invitation letter to show at the embassy to confirm your registration.
          This could help with your visa process. For more details, check the FAQ.
        </p>
        <div
          tabindex="0"
          @click="handleLinkClick($event, option)"
          class="greeting-tooltip__close-button"
        >
          <div class="greeting-tooltip__close-button-line"></div>
          <div class="greeting-tooltip__close-button-line"></div>
        </div>
      </div>
      <!-- External link -->
      <a
        v-if="!option.slug.startsWith('/')"
        :href="option.enable ? option.slug : undefined"
        target="_blank"
        rel="noopener noreferrer"
        class="card__trigger"
        :title="!option.enable ? 'Link unlocks after next steps' : ''"
        :class="{
          'js--active': isCurrentPage(option.slug),
          'card__trigger--disabled': !option.enable,
        }"
        @click="(e) => handleLinkClick(e, option)"
      >
        <div class="card__trigger-content">
          <div class="card__trigger-content-text">
            <p class="paragraph paragraph--l">{{ option.title }}</p>
          </div>
          <div v-if="!option.enable" class="card__trigger-content-icon">
            <IconQuestionMark1 />
          </div>
          <div v-if="option.enableTagNew" class="card__trigger-content-label">New!</div>
        </div>
        <div class="card__trigger-arrow">
          <IconArrowRight1 />
        </div>
      </a>

      <!-- Internal link -->
      <router-link
        v-else
        :to="option.enable ? option.slug : '?'"
        class="card__trigger"
        :title="!option.enable ? 'Link unlocks after next steps' : ''"
        :class="{
          'js--active': isCurrentPage(option.slug),
          'card__trigger--disabled': !option.enable,
        }"
        @click.capture="(e) => handleLinkClick(e, option)"
      >
        <div class="card__trigger-content">
          <div class="card__trigger-content-text">
            <p class="paragraph paragraph--l">{{ option.title }}</p>
          </div>
          <div v-if="!option.enable" class="card__trigger-content-icon">
            <IconQuestionMark1 />
          </div>
          <div v-if="option.enableTagNew" class="card__trigger-content-label">New!</div>
        </div>
        <div class="card__trigger-arrow">
          <IconArrowRight1 />
        </div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.greeting-tooltip {
  display: flex;
  background-color: var(--palette--5);
  color: var(--color-text--2);
  position: absolute;
  padding: 2rem 1.75rem;
  width: 100%;
  max-width: 390px;
  border-radius: var(--border-radius--2);
  left: 232px;
  bottom: auto;
  translate: 0 -80%;
  z-index: 100;

  &__close-button {
    position: absolute;
    top: 0.875rem;
    right: 0.875rem;
    width: 0.75rem;
    height: 0.75rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    rotate: 45deg;
    transition: var(--transition-default);

    &-line {
      position: absolute;
      pointer-events: none;
      width: 100%;
      height: 2px;
      background-color: var(--color-text--2);
      border-radius: var(--border-radius--1);

      &:first-of-type {
        rotate: 90deg;
      }
    }

    &:hover,
    &:focus {
      rotate: -45deg;
    }
  }
}
.card {
  &__list-of-triggers {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  &__trigger-wrapper {
    width: 100%;
    border-top: 1px solid var(--palette--21);

    &:last-of-type {
      &,
      .card__trigger {
        border-bottom-left-radius: var(--border-radius--2);
        border-bottom-right-radius: var(--border-radius--2);
      }
    }

    &--accent {
      @media screen and (min-width: 768px) {
        z-index: 99;
        border-radius: var(--border-radius--2);
        overflow: hidden;
      }
    }
  }

  &__trigger {
    width: 100%;
    padding: 1.75rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: var(--color-text--1);
    background: var(--color-background--1);
    transition: var(--transition-default);

    &.js--active,
    &:hover {
      &:not(.card__trigger--disabled) {
        background: var(--palette--4);
        color: var(--palette--5);
      }
    }
    &--disabled {
      cursor: not-allowed;
      color: var(--palette--8);
    }

    &-content {
      display: flex;
      align-items: center;
    }
    &-content-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.125rem;
      height: 1.125rem;
      margin-left: 0.75rem;
    }
    &-content-label {
      margin-left: 0.5rem;
      padding: 3px 0.375rem 2px;
      background: var(--palette--5);
      color: var(--color-text--2);
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: var(--border-radius--3);
      text-transform: uppercase;
      line-height: 100%;
      letter-spacing: -0.03em;
    }
  }
}
</style>
