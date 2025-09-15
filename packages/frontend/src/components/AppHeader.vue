<template>
  <header
    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-40"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110"
          >
            <AnimatedGears />
          </div>
          <span
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >Portfolio</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path === item.path }"
          >
            {{ t(item.translationKey) }}
          </router-link>
        </nav>

        <!-- Controls -->
        <div class="flex items-center space-x-4">
          <!-- Language Toggle -->
          <LanguageToggle />

          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle mobile menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-gray-200 dark:border-gray-700"
      >
        <nav class="py-4 space-y-2">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200"
            :class="
              $route.path === item.path
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
            "
            @click="isMobileMenuOpen = false"
          >
            {{ t(item.translationKey) }}
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTranslations } from "@/locales";
import LanguageToggle from "./LanguageToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";
import AnimatedGears from "./AnimatedGears.vue";

const { t } = useTranslations();
const isMobileMenuOpen = ref(false);

const navigationItems = [
  { path: "/", translationKey: "nav.home" },
  { path: "/about", translationKey: "nav.about" },
  { path: "/projects", translationKey: "nav.projects" },
  { path: "/contact", translationKey: "nav.contact" },
];
</script>
