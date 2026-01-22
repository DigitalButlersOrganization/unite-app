<script setup lang="ts"></script>

<template>
  <div class="card">
    <div class="card__background"></div>
    <div class="card__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 2rem;
  background-image: url('/src/assets/images/accent-box-background-1.png');
  border-radius: var(--border-radius--2);
  overflow: hidden;
  position: relative;
  width: 100%;
  max-width: 640px;
  color: var(--color-text--2);

  &__background {
    position: absolute;
    bottom: 0%;
    right: 0;
    width: 75%;
    height: auto;
    background-image: url('/src/assets/images/accent-box-background-2.png');
    background-size: contain;
    background-position: center;
    filter: blur(50px);
    z-index: 1;
    aspect-ratio: 480 /182;
    translate: 30% 45%;
  }

  &__content {
    position: relative;
    z-index: 2;
  }
}
</style>
