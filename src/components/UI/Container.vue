<script setup lang="ts">
const props = withDefaults(defineProps<{ type: 'main-box' | null }>(), {
  type: null,
});
</script>

<template>
  <div class="container" :class="props.type ? `container--${props.type}` : ''">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/functions' as *;

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-inline: 6px;
  max-width: 120rem;

  &--main-box {
    padding: linearClamp(3, 1.5);
  }
}
</style>
