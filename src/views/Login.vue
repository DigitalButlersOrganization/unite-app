<script setup lang="ts">
import { ROUTES } from '@/router/routes';
</script>

<template>
  <main>
    <SmallSectionLayout>
      !!!
      <div class="card">
        <div class="card__layout">
          <div class="card__header">
            <div class="card__logo">
              <RouterLink class="card__logo-link" :to="ROUTES.HOME.PATH">
                <img alt="Vue logo" class="card__logo-image" src="@/assets/images/logo-2.png" />
              </RouterLink>
            </div>
            <div class="card__heading">
              <h1 class="heading">Log in to your account</h1>
            </div>
            <p class="paragraph paragraph--l">Please enter your details.</p>
          </div>
          <div class="card__main">
            <LoginForm />
          </div>
        </div>
      </div>
    </SmallSectionLayout>
  </main>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--color-background--1);
  border-radius: var(--border-radius--4);
  overflow: hidden;
  padding: 1.75rem;

  &__layout {
    display: flex;
    flex-direction: column;
    gap: 2.375rem;
  }

  &__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__logo {
    width: 3.5rem;
    height: 3.5rem;
  }

  &__logo-link {
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 100vmax;
    overflow: hidden;
    position: relative;
    transition: var(--transition-default);

    &:hover {
      opacity: 0.7;
    }
  }

  &__logo-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__heading {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.625rem;
    margin-bottom: 0.5rem;
  }

  &__main {
    width: 100%;
  }
}
</style>
