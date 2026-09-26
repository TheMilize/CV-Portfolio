<template>
  <a class="skip-link" href="#main-content">{{ t("design.skip") }}</a>
  <AppHeader />
  <main id="main-content" tabindex="-1">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in"
        ><component :is="Component"
      /></transition>
    </router-view>
  </main>
  <AppFooter />
</template>
<script setup lang="ts">
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useTranslations } from "@/locales";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
const route = useRoute();
const { t } = useTranslations();
watchEffect(() => {
  document.title = `${t(route.name === "health" ? "design.health" : route.name === "not-found" ? "design.notFound" : `nav.${String(route.name || "home")}`)} — ${t("about.name")}`;
});
</script>
