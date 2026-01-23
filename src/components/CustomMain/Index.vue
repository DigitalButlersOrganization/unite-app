<script setup lang="ts"></script>

<template>
  <main class="main">
    <div class="main__content">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 6px;

  &__content {
    background: var(--color-background--1);
    flex-grow: 1;
    overflow: auto;
    border-radius: var(--border-radius--2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    height: max-content;
    min-height: 100%;

    @media screen and (max-width: 767px) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
}
</style>
