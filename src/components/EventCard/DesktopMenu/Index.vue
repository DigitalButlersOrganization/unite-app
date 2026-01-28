<script setup lang="ts">
import IconArrowRight1 from '@/assets/icons/arrow-right-1.svg';
import IconQuestionMark1 from '@/assets/icons/question-mark-1.svg';
import router from '@/router';
import type { IEvent } from '@/types/event';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{ options: IEvent }>();

const isCurrentPage = (slug: string) => {
  const currentSlug = router.currentRoute.value;
  return currentSlug.path === slug;
};

const handleInternalClick = (e: MouseEvent, option: IEvent['menu'][number]) => {
  if (!option.enable || isCurrentPage(option.slug)) {
    e.preventDefault();
  }
};
</script>

<template>
  <div class="card__list-of-triggers">
    <div class="card__trigger-wrapper" v-for="option in props.options.menu" :key="option.id">
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
        @click="!option.enable && $event.preventDefault()"
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
        :to="option.slug"
        class="card__trigger"
        :title="!option.enable ? 'Link unlocks after next steps' : ''"
        :class="{
          'js--active': isCurrentPage(option.slug),
          'card__trigger--disabled': !option.enable,
        }"
        @click.capture="(e) => handleInternalClick(e, option)"
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
