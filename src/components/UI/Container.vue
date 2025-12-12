<script setup lang="ts"></script>

<template>
  <div class="container">
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
}
</style>
