<template>
  <div class="group relative h-full">
    <!-- Card container -->
    <div
      class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col"
    >
      <!-- Demo message modal -->
      <div
        v-if="showDemoMessage"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click="showDemoMessage = false"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-4"
          @click.stop
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ t("common.demo") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{
              project.demo === "#"
                ? t("common.demoNotAvailable")
                : t("common.temporarilyUnavailable")
            }}
          </p>
          <button
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            @click="showDemoMessage = false"
          >
            OK
          </button>
        </div>
      </div>

      <!-- GitHub message modal -->
      <div
        v-if="showGithubMessage"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click="showGithubMessage = false"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md mx-4"
          @click.stop
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {{ t("common.github") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ t("common.githubNotAvailable") }}
          </p>
          <button
            class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
            @click="showGithubMessage = false"
          >
            OK
          </button>
        </div>
      </div>

      <!-- Project image/placeholder -->
      <div
        class="relative h-48 bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-50 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-primary-800/20 overflow-hidden"
      >
        <!-- Project icon -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
          >
            <svg
              class="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <!-- Overlay with action buttons -->
        <div
          class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <div
            class="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <a
              v-if="
                project.demo !== '#' && !project.demo.includes('github.com')
              "
              :href="project.demo"
              target="_blank"
              class="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-200 transform hover:scale-105"
            >
              {{ t("common.demo") }}
            </a>
            <button
              v-else
              class="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-white transition-all duration-200 transform hover:scale-105"
              @click="showDemoMessage = true"
            >
              {{ t("common.demo") }}
            </button>
            <a
              v-if="project.github !== '#'"
              :href="project.github"
              target="_blank"
              class="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200 transform hover:scale-105"
            >
              {{ t("common.github") }}
            </a>
            <button
              v-else
              class="bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200 transform hover:scale-105"
              @click="showGithubMessage = true"
            >
              {{ t("common.github") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Project content -->
      <div class="p-6 flex flex-col h-full">
        <h3
          class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
        >
          {{ project.title }}
        </h3>

        <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {{ t(project.descriptionKey) }}
        </p>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium border border-primary-200 dark:border-primary-700/50"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Project meta -->
        <div
          class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto"
        >
          <span class="flex items-center gap-1">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ project.date }}
          </span>
          <span
            class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
          >
            {{ t(`common.${project.type.toLowerCase()}`) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTranslations } from "@/locales";

const { t } = useTranslations();

const showDemoMessage = ref(false);
const showGithubMessage = ref(false);

interface Project {
  id: number;
  title: string;
  descriptionKey: string;
  technologies: string[];
  demo: string;
  github: string;
  category: string;
  date: string;
  type: string;
}

interface Props {
  project: Project;
}

defineProps<Props>();
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
