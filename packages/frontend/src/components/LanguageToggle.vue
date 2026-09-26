<template>
  <div class="preference-control language-control">
    <UiIcon name="globe" :size="17" /><span>{{
      store.currentLanguage.toUpperCase()
    }}</span>
    <select
      :value="store.currentLanguage"
      :aria-label="t('design.language')"
      @change="changeLanguage"
    >
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from "@/stores";
import { useTranslations } from "@/locales";
import UiIcon from "./UiIcon.vue";
const store = useMainStore();
const { t } = useTranslations();
function changeLanguage(event: Event) {
  store.setLanguage((event.target as HTMLSelectElement).value as "en" | "ru");
}
</script>
