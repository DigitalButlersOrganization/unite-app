<script setup lang="ts"></script>

<template>
  <main class="main">
    <div class="main__list">
      <CustomMainListOfTabs />
      <MainStone />
    </div>
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

  &__list {
    flex-shrink: 0;
  }
  &__content {
    background: var(--color-background--1);
    flex-grow: 1;
    overflow: auto;
    padding: 3rem;
    border-bottom-left-radius: var(--border-radius--2);
    border-bottom-right-radius: var(--border-radius--2);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }
}
</style>
