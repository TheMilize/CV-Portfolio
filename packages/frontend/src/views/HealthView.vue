<template>
  <div class="min-h-screen">
    <AppHeader />
    <section class="py-20">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="section-title text-center">Состояние API</h1>
        <p class="section-subtitle text-center">
          Проверка бэкенда и переменных окружения (почта)
        </p>
        <div class="card">
          <div v-if="loading" class="text-center py-8 text-gray-500 dark:text-gray-400">
            Загрузка…
          </div>
          <div v-else-if="health" class="space-y-4">
            <p><strong>Статус:</strong> <span class="text-green-600 dark:text-green-400">{{ health.status }}</span></p>
            <p><strong>Окружение:</strong> {{ health.environment }}</p>
            <p><strong>Vercel:</strong> {{ health.vercel ? 'да' : 'нет' }}</p>
            <p>
              <strong>Почта настроена:</strong>
              <span :class="health.emailConfigured ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'">
                {{ health.emailConfigured ? 'да' : 'нет — задайте SMTP_* или SENDGRID_API_KEY в Vercel' }}
              </span>
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ health.timestamp }}</p>
          </div>
          <div v-else class="text-center py-8 text-amber-600 dark:text-amber-400">
            Не удалось получить ответ от /api/health
          </div>
        </div>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { getHealthDetails, type HealthResponse } from "@/utils/api";

const loading = ref(true);
const health = ref<HealthResponse | null>(null);

onMounted(async () => {
  health.value = await getHealthDetails();
  loading.value = false;
});
</script>
