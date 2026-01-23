import { ref, computed, onMounted, onUnmounted } from 'vue';

const MOBILE_BREAKPOINT = 767;

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
let isListenerAdded = false;

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

/**
 * Composable для определения текущего breakpoint экрана
 * @returns {Object} объект с reactive свойствами isDesktop
 */
export function useBreakpoints() {
  onMounted(() => {
    if (!isListenerAdded && typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      isListenerAdded = true;
    }
  });

  onUnmounted(() => {
    if (isListenerAdded && typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
      isListenerAdded = false;
    }
  });

  const isDesktop = computed(() => windowWidth.value > MOBILE_BREAKPOINT);

  return {
    isDesktop,
    windowWidth,
  };
}
