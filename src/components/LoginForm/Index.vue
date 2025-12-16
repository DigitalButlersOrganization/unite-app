<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES, BUTTON_TYPES } from '@/enums';
import { api } from '@/services/api';
import { useLoadingStore, useUserStore } from '@/stores';
import { emailRegex, passwordRegex } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loadingStore = useLoadingStore();

const router = useRouter();

// refs

const email = ref<string>(userStore.email || '');
const password = ref<string>('');
const emailTextError = ref<string>('');
const passwordTextError = ref<string>('');

const handleSubmit = async () => {
  console.log(111);
  let hasError = false;
  if (!emailRegex.test(email.value.trim())) {
    emailTextError.value = 'invalidEmail';
    hasError = true;
  }
  if (!passwordRegex.test(password.value.trim())) {
    passwordTextError.value = 'invalidPassword';
    hasError = true;
  }
  if (hasError) return;

  loadingStore.set(true);

  await api.auth.login({
    email: email.value,
    password: password.value,
    userStore,
    loadingStore,
    router,
  });
};
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <UITextInputField
      ref="emailHTMLElement"
      id="login-email"
      v-model="email"
      :label="'emailLabel'"
      :placeholder="'Enter your email'"
      type="email"
      :textError="emailTextError"
      @input="emailTextError = ''"
    />
    <UIButton
      :border="BUTTON_BORDERS.LARGE"
      :size="BUTTON_SIZES.LARGE"
      :status="BUTTON_STATUSES.CTA_2"
      :type="BUTTON_TYPES.SUBMIT"
    >
      <p class="paragraph paragraph--l">Get OTP code</p>
    </UIButton>
  </form>
</template>

<style lang="scss" scoped>
.event-card {
  width: 100%;
  border-radius: var(--border-radius--2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--color-background--1);
}
</style>
