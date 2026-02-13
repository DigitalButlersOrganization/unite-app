<script setup lang="ts">
import { BUTTON_BORDERS, BUTTON_SIZES, BUTTON_STATUSES, BUTTON_TYPES } from '@/enums';
import { api } from '@/services/api';
import { useLoadingStore, useUserStore } from '@/stores';
import { emailRegex, otpCodeRegex } from '@/utils';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const loadingStore = useLoadingStore();
const router = useRouter();

const email = ref<string>('');
const OTPCode = ref<string>('');
const emailTextError = ref<string>('');
const OTPCodeTextError = ref<string>('');

const emailFromURL = router.currentRoute.value.query.email as string;

email.value = emailFromURL || '';

const handleSubmit = async () => {
  let hasError = false;

  const handleEmailInput = () => {
    if (!emailRegex.test(email.value.trim())) {
      emailTextError.value = 'Enter a valid email';
      hasError = true;
    }
  };
  const handleOTPCodeInput = () => {
    if (!otpCodeRegex.test(OTPCode.value.trim())) {
      OTPCodeTextError.value = 'Enter the 6-digit numeric code that was sent to your email';
      hasError = true;
    }
  };

  if (!userStore.isOTPCodeSended) {
    handleEmailInput();
    if (hasError) return;

    OTPCode.value = '';

    await api.auth.getOTPCode({
      email: email.value,
      userStore,
      loadingStore,
    });
  } else {
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

const isDisabledSubmitButton = computed(() => {
  if (userStore.isOTPCodeSended) {
    if (email.value.trim().length === 0 || OTPCode.value.trim().length === 0) {
      return true;
    }
  } else {
    if (email.value.trim().length === 0) {
      return true;
    }
  }
  return false;
});
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
        :placeholder="'email@gmail.com'"
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
        :placeholder="'******'"
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
      :isDisabled="isDisabledSubmitButton"
    >
      <p class="paragraph paragraph--l">
        {{ userStore.isOTPCodeSended ? 'Log in' : 'Get OTP code' }}
      </p>
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
