<template>
  <div
    class="relative group cursor-pointer"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      :class="{ 'animate-pulse': isHovered }"
    ></div>

    <div
      class="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 shadow-lg border border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
      :class="{ 'scale-110': isHovered }"
    >
      <div
        class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300"
      >
        <svg
          class="w-6 h-6 text-white transition-transform duration-300"
          :class="{ 'rotate-12 scale-110': isHovered }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      <p
        class="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-center transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400"
      >
        {{ label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  label: string;
}

defineProps<Props>();

const isHovered = ref(false);
</script>
