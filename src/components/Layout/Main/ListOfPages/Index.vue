<script setup lang="ts">
import { ROUTES } from '@/router/routes'
</script>

<template>
  <div class="list-of-pages">
    <RouterLink class="link" :to="ROUTES.HOME.PATH">
      {{ ROUTES.HOME.NAME }}
    </RouterLink>
    <RouterLink :to="ROUTES.ABOUT.PATH">
      <div>{{ ROUTES.ABOUT.NAME }}</div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.list-of-pages {
  width: 100%;
  color: var(--color-text--3);
  background: var(--color-background--3);
  border-top-left-radius: var(--border-radius--2);
  border-top-right-radius: var(--border-radius--2);
  border-bottom: 1px solid var(--palette--3);
  overflow: auto;
  display: flex;
  padding: 6px;
}
</style>
