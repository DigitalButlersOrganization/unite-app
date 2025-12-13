<script setup lang="ts"></script>

<template>
  <aside class="aside">
    <div class="aside__scroll-box">
      <LayoutEventCard />
      <LayoutEventCard />
      <LayoutEventCard />
      <LayoutEventCard />
      <LayoutEventCard />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  width: 100%;
  overflow: auto;
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);

  &__scroll-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    height: max-content;
    padding-bottom: 6px;
  }
}
</style>
