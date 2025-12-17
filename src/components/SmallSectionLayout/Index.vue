<script setup lang="ts"></script>

<template>
  <main>
    <div class="small-section">
      <div class="small-section__scrolled-box">
        <div class="small-section__max-height-box">
          <UIContainer class="small-section__container">
            <div class="small-section__content">
              <slot />
            </div>
          </UIContainer>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.small-section {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    max-width: 26.625rem;
    height: 100%;
    display: flex;
  }
  &__scrolled-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;
  }
  &__max-height-box {
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    padding-block: 3rem;
  }
  &__content {
    width: 100%;
  }
}
</style>
