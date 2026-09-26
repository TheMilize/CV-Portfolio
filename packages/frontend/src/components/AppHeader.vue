<template>
  <header class="site-header" @keydown.esc="isMobileMenuOpen = false">
    <div class="shell header-inner">
      <router-link
        to="/"
        class="brand"
        :aria-label="t('about.name') + ' — ' + t('nav.home')"
      >
        <span class="brand-mark">v<span>.</span>m</span>
        <span class="brand-name"
          >Vladlen Milize<span>DEVELOPER & MAKER</span></span
        >
      </router-link>
      <nav class="desktop-nav" :aria-label="t('common.navigation')">
        <router-link
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          :class="{ active: route.path === item.path }"
          >{{ t(item.key) }}</router-link
        >
      </nav>
      <div class="header-tools">
        <LanguageToggle /><span class="tool-divider"></span><ThemeToggle />
        <router-link class="header-contact" to="/contact"
          >{{ t("design.letsTalk") }}<UiIcon name="external" :size="16"
        /></router-link>
        <button
          class="icon-button menu-button"
          :aria-label="t('design.menu')"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <UiIcon :name="isMobileMenuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
    <nav
      v-if="isMobileMenuOpen"
      id="mobile-nav"
      class="mobile-nav shell"
      :aria-label="t('common.navigation')"
    >
      <router-link
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        :class="{ active: route.path === item.path }"
        @click="isMobileMenuOpen = false"
        >{{ t(item.key) }}<UiIcon name="external" :size="18"
      /></router-link>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useTranslations } from "@/locales";
import LanguageToggle from "./LanguageToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";
import UiIcon from "./UiIcon.vue";
const route = useRoute();
const { t } = useTranslations();
const isMobileMenuOpen = ref(false);
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  },
);
const navigationItems = [
  { path: "/", key: "nav.home" },
  { path: "/about", key: "nav.about" },
  { path: "/projects", key: "nav.projects" },
  { path: "/contact", key: "nav.contact" },
];
</script>
