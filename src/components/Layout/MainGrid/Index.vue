<script setup lang="ts"></script>

<template>
  <div class="main-grid-wrapper">
    <UIContainer class="main-grid-container">
      <div class="main-grid">
        <slot />
      </div>
    </UIContainer>
  </div>
</template>

<style lang="scss" scoped>
.main-grid-wrapper {
  width: 100%;
  height: 100%;
  padding-top: 6px;
}
.main-grid-container {
  width: 100%;
  height: 100%;
}
.main-grid {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 6px;
  grid-template-columns: 346px auto;
  grid-template-rows: max-content auto;
}
</style>
