import { ref, watch, type Ref } from 'vue';
import { getCookie, setCookie, removeCookie } from '@/utils/cookies';

export function useCookie(
  name: string,
  defaultValue: string = '',
  options: {
    path?: string;
    domain?: string;
    expires?: Date | string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {},
) {
  const cookieValue: Ref<string> = ref(getCookie(name) || defaultValue);

  watch(
    cookieValue,
    (newValue) => {
      if (newValue) {
        setCookie(name, newValue, options);
      } else {
        removeCookie(name, options);
      }
    },
    { deep: true },
  );

  const updateCookie = (value: string) => {
    cookieValue.value = value;
  };

  const deleteCookie = () => {
    cookieValue.value = '';
    removeCookie(name, options);
  };

  const refresh = () => {
    cookieValue.value = getCookie(name) || defaultValue;
  };

  return {
    value: cookieValue,
    updateCookie,
    deleteCookie,
    refresh,
  };
}
