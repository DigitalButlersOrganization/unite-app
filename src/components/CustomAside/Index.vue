<script setup lang="ts"></script>

<template>
  <aside class="aside">
    <div class="aside__scroll-box">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  width: 100%;
  overflow: auto;
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);
  --scrollbar-background-color: #fff;
  --scrollbar-thumb-color: var(--palette--23);

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
