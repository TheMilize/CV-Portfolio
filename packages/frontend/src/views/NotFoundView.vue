<template>
  <div class="shell page-section">
    <header class="page-heading">
      <p class="eyebrow">404 / NOT FOUND</p>
      <h1>{{ t("design.notFound") }}</h1>
      <p>{{ t("design.notFoundText") }}</p>
    </header>
    <router-link to="/" class="btn-primary"
      >{{ t("design.home") }}<UiIcon
    /></router-link>
  </div>
</template>
<script setup lang="ts">
import { useTranslations } from "@/locales";
import UiIcon from "@/components/UiIcon.vue";
const { t } = useTranslations();
</script>
