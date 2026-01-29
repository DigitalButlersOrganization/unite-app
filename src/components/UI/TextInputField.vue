<script setup lang="ts">
import { computed, ref } from 'vue';
import IconEyeOff from '@/assets/icons/eye-off.svg';
import IconEye from '@/assets/icons/eye.svg';

interface IProps {
  modelValue: string | number | undefined;
  label: string;
  isHiddenLabel?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'password' | 'email';
  id?: string;
  disabled?: boolean;
  textarea?: boolean;
  rows?: number;
  min?: number | string;
  max?: number | string;
  textError?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  placeholder: '',
  type: 'text',
  id: '',
  disabled: false,
  textarea: false,
  rows: 5,
  min: '',
  max: '',
  textError: '',
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

// refs

const watchPassword = ref<boolean>(false);

// computeds

const classes = computed(() => {
  return [
    {
      'text-field__input--error': props.textError,
      'text-field__input--password': props.type === 'password',
    },
  ];
});

const isPassword = computed(() => {
  return props.type === 'password';
});

const type = computed(() => {
  if (props.type !== 'password') return props.type;
  else return watchPassword.value ? 'text' : 'password';
});

const inputRef = ref(null);

defineExpose({
  inputRef,
});

const validateInput = (input: HTMLInputElement) => {
  if (props.type === 'number') {
    const min = Number(props.min);
    const max = Number(props.max);
    const value = Number(input.value);

    if (!Number.isNaN(value)) {
      if (!Number.isNaN(min) && value < min) {
        input.value = min.toString();
      } else if (!Number.isNaN(max) && value > max) {
        input.value = max.toString();
      }
    }
  }
  emits('update:modelValue', input.value);
};

const onBlockArrow = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
  }
};
</script>

<template>
  <div class="text-field">
    <label
      v-if="props.label"
      :for="props.id"
      :class="isHiddenLabel ? 'visually-hidden' : ''"
      class="paragraph paragraph--l"
    >
      {{ props.label }}
    </label>
    <div class="text-field__inner">
      <div v-if="!props.textarea" class="relative" style="inline-size: 100%">
        <input
          ref="inputRef"
          :id="props.id"
          :value="props.modelValue"
          :aria-describedby="`${props.label}-help`"
          :type="type"
          class="text-field__input paragraph paragraph--l"
          :class="classes"
          autocomplete="off"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :min="props.min"
          :max="props.max"
          @input="validateInput($event.target as HTMLInputElement)"
          @keydown="onBlockArrow"
        />
        <div v-if="isPassword" class="text-field__input-icon-box">
          <button
            @click.prevent.stop="watchPassword = !watchPassword"
            type="button"
            class="text-field__input-icon-button"
          >
            <div class="input-icon">
              <IconEye v-if="watchPassword" />
              <IconEyeOff v-else />
            </div>
          </button>
        </div>
      </div>
      <textarea
        v-else
        ref="inputRef"
        :id="props.id"
        :value="props.modelValue"
        :aria-describedby="`${props.label}-help`"
        class="text-field__input paragraph paragraph--m"
        :class="classes"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        auto-resize
        :rows="props.rows"
        @input="(event: any) => emits('update:modelValue', event.target?.value)"
      />
    </div>
    <transition transition name="fade" mode="out-in">
      <span v-if="props.textError" class="text-field__error paragraph paragraph--l">
        {{ props.textError }}
      </span>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.text-field {
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;

  &__inner {
    width: 100%;
    border-radius: var(--border-radius--3);
  }
  &__input {
    padding-inline: 1.25rem;
    padding-block: 1.125rem;
    border: 1px solid var(--palette--23);
    border-radius: var(--border-radius--3);
    color: var(--color-text--1);
    transition: all 0.2s linear;
    inline-size: 100%;
    resize: none;

    &::placeholder {
      color: var(--palette--8);
    }

    &:focus {
      outline: unset;
    }

    &:disabled {
      background-color: var(--palette--4);
      border: unset;
      box-shadow: unset;
    }

    &--password {
      padding-inline-end: 3rem;
    }

    &--error {
      border: 1px solid var(--color-text-error);
      color: var(--color-text-error);
    }

    &-icon-box {
      position: absolute;
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      inset: 0 1em auto auto;
    }
    &-icon-button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      background-color: transparent;
      border: none;
      border-radius: none;
      outline: none;
      padding: 0;
      transition: var(--transition-default);

      &:hover {
        opacity: 0.6;
      }

      .input-icon {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &__error {
    color: var(--color-text-error);
  }
}

.relative {
  position: relative;
}
</style>
