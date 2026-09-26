<template>
  <div class="shell page-section">
    <header class="page-heading">
      <p class="eyebrow">SYSTEM / STATUS</p>
      <h1>{{ t("design.health") }}</h1>
      <p>{{ t("design.healthIntro") }}</p>
    </header>
    <div class="card health-card" aria-live="polite">
      <p v-if="loading">{{ t("design.loading") }}</p>
      <dl v-else-if="health">
        <div>
          <dt>{{ t("design.status") }}</dt>
          <dd>{{ health.status }}</dd>
        </div>
        <div>
          <dt>{{ t("design.environment") }}</dt>
          <dd>{{ health.environment }}</dd>
        </div>
        <div>
          <dt>Vercel</dt>
          <dd>{{ t(health.vercel ? "design.yes" : "design.no") }}</dd>
        </div>
        <div>
          <dt>{{ t("design.emailConfigured") }}</dt>
          <dd>{{ t(health.emailConfigured ? "design.yes" : "design.no") }}</dd>
        </div>
        <div>
          <dt>UTC</dt>
          <dd>{{ health.timestamp }}</dd>
        </div>
      </dl>
      <p v-else>{{ t("design.healthError") }}</p>
      <button class="btn-secondary" :disabled="loading" @click="refresh">
        {{ t("design.retry") }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getHealthDetails, type HealthResponse } from "@/utils/api";
import { useTranslations } from "@/locales";
const { t } = useTranslations();
const loading = ref(true);
const health = ref<HealthResponse | null>(null);
async function refresh() {
  loading.value = true;
  try {
    health.value = await getHealthDetails();
  } finally {
    loading.value = false;
  }
}
onMounted(refresh);
</script>
<style scoped>
.health-card {
  max-width: 650px;
}
.health-card dl {
  display: grid;
  gap: 20px;
}
.health-card dl > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 13px;
}
.health-card dt {
  color: var(--muted);
}
.health-card dd {
  overflow-wrap: anywhere;
}
.health-card .btn-secondary {
  margin-top: 30px;
}
</style>
