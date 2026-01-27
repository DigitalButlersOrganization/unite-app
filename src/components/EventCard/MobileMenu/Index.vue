<script setup lang="ts">
import IconArrowDown1 from '@/assets/icons/arrow-down-1.svg';

import type { IEvent } from '@/types/event';

const props = defineProps<{ options: IEvent }>();
console.log(props.options.eventName);
</script>

<template>
  <div class="menu" v-bind="$attrs">
    <div class="menu__inner">
      <div class="menu__list">
        <div class="menu__item">
          <a href="#" class="menu__trigger">
            <div class="menu__trigger-content">
              <div class="menu__trigger-content-text">Visa assistance</div>
              <div class="menu__trigger-content-arrow">
                <IconArrowDown1 />
              </div>
            </div>
          </a>
        </div>
        <div class="menu__item">
          <a href="/" class="menu__trigger menu__trigger--disabled" @click.prevent>
            <div class="menu__trigger-content">
              <div class="menu__trigger-content-text">Circle</div>
              <div class="menu__trigger-content-arrow">
                <IconArrowDown1 />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 0;
  bottom: 200px;
  z-index: 5;

  &__inner {
    width: 100%;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  &__item {
    width: 100%;
    writing-mode: vertical-rl;
    border-top-right-radius: var(--border-radius--2);
    border-bottom-right-radius: var(--border-radius--2);
    overflow: hidden;
    box-shadow: 2px 0px 60px 0px hsl(0deg 0% 0% / 40%);
  }

  &__trigger {
    display: block;
    background: var(--palette--6);
    transition: var(--transition-default);
    color: var(--color-text--2);

    &-content {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 1.5rem 0.5rem;

      &-text {
        font-size: 1rem;
        line-height: 1em;
      }

      &-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        position: relative;
        left: -1px;
      }
    }
    &:hover {
      background: var(--palette--1);
    }
  }
}
</style>
