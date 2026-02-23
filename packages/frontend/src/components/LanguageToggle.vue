<template>
  <div class="relative">
    <button
      class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle language"
      @click="isOpen = !isOpen"
    >
      <div class="w-5 h-5 rounded-full overflow-hidden">
        <img
          :src="currentLanguage === 'en' ? '/flags/en.svg' : '/flags/ru.svg'"
          :alt="currentLanguage === 'en' ? 'English' : 'Русский'"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>

      <span class="text-sm font-medium dark:text-gray-200">
        {{ languageLabel }}
      </span>

      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <div class="py-1">
        <button
          v-for="option in languageOptions"
          :key="option.value"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          :class="{
            'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400':
              currentLanguage === option.value,
          }"
          @click="selectLanguage(option.value)"
        >
          <div class="w-4 h-4 rounded-full overflow-hidden">
            <img
              :src="option.flag"
              :alt="option.label"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>
          <span>{{ option.label }}</span>
          <svg
            v-if="currentLanguage === option.value"
            class="w-4 h-4 ml-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMainStore } from "@/stores";

const store = useMainStore();
const isOpen = ref(false);

const currentLanguage = computed(() => store.currentLanguage);

const languageOptions = [
  {
    value: "en" as const,
    label: "English",
    flag: "/flags/en.svg",
  },
  {
    value: "ru" as const,
    label: "Русский",
    flag: "/flags/ru.svg",
  },
];

const languageLabel = computed(() => {
  const option = languageOptions.find(
    (opt) => opt.value === currentLanguage.value,
  );
  return option?.label || "Language";
});

const selectLanguage = (newLanguage: "en" | "ru") => {
  store.setLanguage(newLanguage);
  isOpen.value = false;
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = "none";
  const parent = target.parentElement;
  if (parent) {
    parent.textContent = target.alt === "English" ? "🇺🇸" : "🇷🇺";
  }
};

const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
