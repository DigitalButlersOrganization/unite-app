<script setup lang="ts">
import type { IMilestoneMainFile } from '@/types/event';
import Download1 from '@/assets/icons/download-1.svg';

const props = defineProps<{ files: IMilestoneMainFile[] }>();
</script>

<template>
  <div class="notes__links-list">
    <a
      v-for="(value, index) in props.files"
      :key="index"
      :href="value.url"
      target="_blank"
      class="notes__link"
    >
      <Download1 class="notes__link-icon" />
      <p class="paragraph paragraph--l">
        {{ value.title }}
      </p>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.notes {
  &__links-list {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  }

  &__link {
    padding: 1rem 0;
    display: flex;
    gap: 12px;
    border-top: 1px solid hsla(0, 0%, 100%, 0.1);
    transition: var(--transition-default);

    &-icon {
      position: relative;
      top: 2px;
      min-width: 1rem;
    }

    &:hover {
      opacity: 0.7;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>
