<script lang="ts" setup>
import { computed } from 'vue';

const SVG_SIZE = 100;
const SVG_CIRCLE_PERIMETER = Math.PI * SVG_SIZE;
const MIN_LOADER_DASHARRAY = `${SVG_CIRCLE_PERIMETER * 0.3} ${SVG_CIRCLE_PERIMETER}`;
const MAX_LOADER_DASHARRAY = `${SVG_CIRCLE_PERIMETER * 0.9} ${SVG_CIRCLE_PERIMETER}`;

const props = defineProps({
  size: {
    type: String,
    default: '1em',
    required: false,
  },
  value: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 1,
    required: false,
  },
  isLoader: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const classes = computed(() => ({
  'progress-circular--loader': props.isLoader,
}));

const progressDasharray = computed(
  () => `${SVG_CIRCLE_PERIMETER * props.value} ${SVG_CIRCLE_PERIMETER}`,
);
</script>

<template>
  <div
    class="progress-circular"
    :class="classes"
    role="progressbar"
    aria-valuemax="1"
    aria-valuemin="0"
    :aria-valuenow="value"
  >
    <svg class="progress-circular__svg" viewBox="-5 -5 110 110" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" />
    </svg>
  </div>
</template>

<style scoped lang="scss">
@keyframes loader-dasharray {
  0% {
    stroke-dasharray: v-bind(MIN_LOADER_DASHARRAY);
  }
  50% {
    stroke-dasharray: v-bind(MAX_LOADER_DASHARRAY);
  }
  100% {
    stroke-dasharray: v-bind(MIN_LOADER_DASHARRAY);
  }
}

@keyframes loader-rotation {
  0% {
    rotate: 0turn;
  }
  100% {
    rotate: 1turn;
  }
}

.progress-circular {
  position: relative;
  block-size: v-bind(size);
  inline-size: v-bind(size);

  &__svg {
    aspect-ratio: 1 / 1;
    fill: none;
    inline-size: 100%;
    inset: 0;
    stroke: currentColor;
    stroke-dasharray: v-bind(progressDasharray);
    stroke-linecap: round;
    stroke-width: 10;
    transform: rotate(-90deg);
    transition: stroke-dasharray 0.6s ease;
  }
  &--loader {
    .progress-circular {
      &__svg {
        animation:
          loader-dasharray 2s ease-in-out infinite,
          loader-rotation 0.85s linear infinite;
      }
    }
  }
}
</style>
