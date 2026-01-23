import { ref, computed, onMounted, onUnmounted } from 'vue';

const MOBILE_BREAKPOINT = 767;

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
let subscribersCount = 0;

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

/**
 * Composable для определения текущего breakpoint экрана
 * @returns {Object} объект с reactive свойствами isDesktop
 */
export function useBreakpoints() {
  onMounted(() => {
    if (typeof window !== 'undefined') {
      subscribersCount++;
      if (subscribersCount === 1) {
        window.addEventListener('resize', handleResize);
      }
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      subscribersCount--;
      if (subscribersCount === 0) {
        window.removeEventListener('resize', handleResize);
      }
    }
  });

  const isDesktop = computed(() => windowWidth.value > MOBILE_BREAKPOINT);

  return {
    isDesktop,
    windowWidth,
  };
}
