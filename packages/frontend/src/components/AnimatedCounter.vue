<template>
  <div class="text-center">
    <div
      class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2"
    >
      {{ displayValue }}
    </div>
    <div class="text-gray-600 dark:text-gray-300 font-medium">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

interface Props {
  value: number;
  label: string;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
});

const displayValue = ref(0);

const animate = () => {
  const startTime = Date.now();
  const startValue = 0;

  const updateValue = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / props.duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    displayValue.value = Math.floor(
      startValue + (props.value - startValue) * easeOutQuart,
    );

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
      displayValue.value = props.value;
    }
  };

  requestAnimationFrame(updateValue);
};

onMounted(() => {
  animate();
});

watch(
  () => props.value,
  () => {
    animate();
  },
);
</script>
