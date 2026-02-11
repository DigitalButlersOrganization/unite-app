<script setup lang="ts">
import {
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_TAGS,
  BUTTON_TYPES,
  BUTTON_BORDERS,
  BUTTON_STATUSES,
} from '@/enums';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const MAIN_CLASS = 'button';

interface Props {
  tag?: BUTTON_TAGS;
  size?: BUTTON_SIZES;
  style?: BUTTON_STYLES;
  type?: BUTTON_TYPES;
  border?: BUTTON_BORDERS;
  status?: BUTTON_STATUSES;
  to?: string;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tag: BUTTON_TAGS.BUTTON,
  style: BUTTON_STYLES.SOLID,
  size: BUTTON_SIZES.MEDIUM,
  isFullWidth: false,
  isLoading: false,
});

const tag = computed(() => {
  if (props.to) {
    if (props.to.startsWith('/')) return RouterLink;
    return 'a';
  }
  if (props.tag === 'a') return 'a';
  return props.tag;
});

const isDisabled = computed(() => props.isDisabled || props.isLoading);
</script>

<template>
  <component
    :is="tag"
    :class="[
      MAIN_CLASS,
      props.isDisabled ? `${MAIN_CLASS}--disabled` : null,
      props.isFullWidth ? `${MAIN_CLASS}--full-width` : null,
      props.style ? `button--${props.style}` : null,
      props.size ? `button--${props.size}` : null,
      props.border ? `button--border-${props.border}` : null,
      props.status ? `button--status-${props.status.split(' ').join('-')}` : null,
      props.isLoading ? `${MAIN_CLASS}--loading` : null,
    ]"
    :to="props.to || undefined"
    :href="props.to || undefined"
    :disabled="props.tag === BUTTON_TAGS.BUTTON && isDisabled ? '' : null"
    :type="props.tag !== BUTTON_TAGS.BUTTON ? null : props.type || props.tag"
    :tabindex="isDisabled ? -1 : undefined"
  >
    <div v-if="$slots['prepend']" :class="`${MAIN_CLASS}__prepend`">
      <slot name="prepend" />
    </div>
    <div v-if="$slots.default" :class="`${MAIN_CLASS}__content`">
      <slot />
    </div>
    <div v-if="$slots['append']" :class="`${MAIN_CLASS}__append`">
      <slot name="append" />
    </div>
    <div
      :class="[`${MAIN_CLASS}__loader`, props.isLoading ? `${MAIN_CLASS}__loader--visible` : null]"
    >
      <UIProgressCircular :is-loader="props.isLoading" :class="`${MAIN_CLASS}__loader-progress`" />
    </div>
  </component>
</template>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;
  transition: var(--transition-default);
  border: 1px solid var(--color-border--button);
  background-color: var(--color-background--button);
  color: var(--color-text--button);

  &:focus-visible,
  &:hover {
    background-color: var(--color-background-hover--button);
    color: var(--color-text-hover--button);
    border-color: var(--color-border-hover--button);
  }

  &__prepend,
  &__append,
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__loader {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    pointer-events: none;
    transition: var(--transition-default);
    background: inherit;
    opacity: 0;

    &--visible {
      opacity: 1;
    }
  }

  &__loader-progress {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  &--full-width {
    width: 100%;
  }
  &[disabled],
  &--loading,
  &--disabled {
    opacity: 0.7;
    pointer-events: none;
  }

  &--string {
    background-color: transparent;
    color: inherit;
    padding: 0;
  }
  &--medium {
    padding: 1.25rem 1.5rem;
    gap: 1rem;

    @media screen and (max-width: 767px) {
      padding: 1rem;
    }
  }
  &--small {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
  &--large {
    padding: 1.375rem 2.5rem;
    gap: 1.5rem;
  }
  &--border-medium {
    border-radius: var(--border-radius--1);
  }
  &--border-large {
    border-radius: var(--border-radius--3);
  }

  @mixin button-status(
    $text,
    $bg,
    $bg-hover,
    $text-hover: $text,
    $border: $bg,
    $border-hover: $bg-hover
  ) {
    --color-text--button: var(--palette--#{$text});
    --color-text-hover--button: var(--palette--#{$text-hover});
    --color-background--button: var(--palette--#{$bg});
    --color-background-hover--button: var(--palette--#{$bg-hover});
    --color-border--button: var(--palette--#{$border});
    --color-border-hover--button: var(--palette--#{$border-hover});
  }

  &--status-default {
    @include button-status(8, 13, 14);
  }
  &--status-completed {
    @include button-status(6, 13, 15);
  }
  &--status-active {
    @include button-status(2, 5, 16);
  }
  &--status-pending {
    @include button-status(2, 7, 17);
  }
  &--status-rejected {
    @include button-status(10, 18, 19);
  }
  &--status-disabled {
    opacity: 0.7;
    pointer-events: none;
  }
  &--status-in-progress {
    @include button-status(5, 20, 4);
  }
  &--status-cta-1 {
    @include button-status(5, 2, 5, $text-hover: 2, $border-hover: 2);
  }
  &--status-cta-2 {
    @include button-status(2, 5, 22);
  }
  &--status-cta-3 {
    @include button-status(5, 2, 22, $text-hover: 2, $border: 5, $border-hover: 22);
  }
  &--status-cta-1,
  &--status-cta-2,
  &--status-cta-3 {
    &[disabled] {
      color: var(--color-text--3);
      background-color: var(--palette--23);
      opacity: 1;
      border-color: var(--palette--23);
    }
  }
}
</style>
