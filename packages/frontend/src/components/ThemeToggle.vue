<template>
  <div class="preference-control">
    <UiIcon :name="store.isDark ? 'moon' : 'sun'" :size="18" />
    <select
      :value="store.theme"
      :aria-label="t('design.theme')"
      @change="changeTheme"
    >
      <option value="light">{{ t("design.light") }}</option>
      <option value="dark">{{ t("design.dark") }}</option>
      <option value="system">{{ t("design.system") }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from "@/stores";
import { useTranslations } from "@/locales";
import UiIcon from "./UiIcon.vue";
const store = useMainStore();
const { t } = useTranslations();
function changeTheme(event: Event) {
  store.setTheme(
    (event.target as HTMLSelectElement).value as "light" | "dark" | "system",
  );
}
</script>
