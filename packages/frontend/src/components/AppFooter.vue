<template>
  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <div>
          <router-link to="/" class="brand"
            ><span class="brand-mark">v<span>.</span>m</span
            ><span class="footer-name">{{ t("about.name") }}</span></router-link
          >
          <p>{{ t("design.footerNote") }}</p>
        </div>
        <div class="footer-links">
          <a
            href="https://github.com/TheMilize"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub<UiIcon name="external" :size="15" /></a
          ><a
            href="https://www.linkedin.com/in/vladlen-milize-25b22339b/"
            target="_blank"
            rel="noopener noreferrer"
            >LinkedIn<UiIcon name="external" :size="15" /></a
          ><a href="mailto:shemakin.vladlen@gmail.com"
            >Email<UiIcon name="external" :size="15"
          /></a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} {{ t("about.name") }}</span
        ><span
          >{{ t("design.builtWith") }} Vue & TypeScript<span
            class="small-dot"
          ></span
          >{{ t("design.madeWithCare") }}</span
        ><a href="#main-content">{{ t("design.backTop") }} ↑</a>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useTranslations } from "@/locales";
import UiIcon from "./UiIcon.vue";
const { t } = useTranslations();
</script>
