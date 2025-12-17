<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES, BUTTON_TYPES } from '@/enums';
import { api } from '@/services/api';
import { useLoadingStore, useUserStore } from '@/stores';
import { emailRegex, otpCodeRegex } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const router = useRouter();

const email = ref<string>('');
const OTPCode = ref<string>('');
const emailTextError = ref<string>('');
const OTPCodeTextError = ref<string>('');

const handleSubmit = async () => {
  let hasError = false;

  const handleEmailInput = () => {
    if (!emailRegex.test(email.value.trim())) {
      emailTextError.value = 'The data in the email field is not valid.';
      hasError = true;
    }
  };
  const handleOTPCodeInput = () => {
    if (!otpCodeRegex.test(OTPCode.value.trim())) {
      OTPCodeTextError.value = 'The data in the OTP code field is not valid.';
      hasError = true;
    }
  };

  if (!userStore.isOTPCodeSended) {
    console.log('!userStore.isOTPCodeSended', !userStore.isOTPCodeSended);

    handleEmailInput();
    if (hasError) return;

    await api.auth.getOTPCode({
      email: email.value,
      userStore,
      loadingStore,
    });
  } else {
    console.log('userStore.isOTPCodeSended', userStore.isOTPCodeSended);

    handleEmailInput();
    handleOTPCodeInput();
    if (hasError) return;

    await api.auth.login({
      email: email.value,
      OTPCode: OTPCode.value,
      userStore,
      loadingStore,
      router,
    });
  }

  loadingStore.set(true);
};
</script>

<template>
  <!-- <button @click="async () => await api.auth.getUser()">getData</button> -->
  <form novalidate class="form" @submit.prevent="handleSubmit">
    <div class="form__row">
      <UITextInputField
        ref="emailHTMLElement"
        id="login-email"
        v-model="email"
        :label="'Email'"
        :placeholder="'Enter your email'"
        type="email"
        :textError="emailTextError"
        @input="emailTextError = ''"
      />
    </div>

    <div v-if="userStore.isOTPCodeSended" class="form__row">
      <UITextInputField
        ref="passwordHTMLElement"
        id="login-password"
        v-model="OTPCode"
        :label="'Code'"
        :placeholder="'Enter your password'"
        type="password"
        :textError="OTPCodeTextError"
        @input="OTPCodeTextError = ''"
      />
    </div>

    <UIButton
      :border="BUTTON_BORDERS.LARGE"
      :size="BUTTON_SIZES.LARGE"
      :status="BUTTON_STATUSES.CTA_2"
      :type="BUTTON_TYPES.SUBMIT"
      :isLoading="loadingStore.isLoading"
      :isDisabled="email.trim().length === 0"
    >
      <p class="paragraph paragraph--l">Get OTP code</p>
    </UIButton>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
