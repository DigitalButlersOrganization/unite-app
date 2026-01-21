<script setup lang="ts"></script>

<template>
  <div class="card">
    <div class="card__content">
      <div class="card__chapter">
        <div class="card__chapter-title">
          <p class="paragraph paragraph--m">Time Remaining:</p>
        </div>
        <div class="card__chapter-content"></div>
      </div>
      <div class="card__chapter">
        <div class="card__chapter-title">
          <p class="paragraph paragraph--m">Reward:</p>
        </div>
        <div class="card__chapter-content"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 2rem;
  border-radius: var(--border-radius--2);
  overflow: hidden;
  position: relative;
  width: 100%;
}
</style>
