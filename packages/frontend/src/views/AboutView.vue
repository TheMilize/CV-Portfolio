<template>
  <div class="min-h-screen">
    <AppHeader />

    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="section-title text-center">{{ t("about.title") }}</h1>

        <!-- Основная информация -->
        <div class="card mb-12">
          <div
            class="flex flex-col md:flex-row items-center md:items-start gap-8"
          >
            <div class="flex-shrink-0">
              <div
                class="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 dark:border-gray-700/50 shadow-lg"
              >
                <img
                  src="@/assets/images/Photo.png"
                  alt="Profile Photo"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {{ t("about.name") }}
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {{ t("about.description") }}
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="mailto:shemakin.vladlen@gmail.com" class="btn-primary">
                  {{ t("common.writeEmail") }}
                </a>
                <button class="btn-secondary" @click="downloadResume">
                  {{ t("common.downloadResume") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Опыт работы -->
        <div class="card mb-12">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t("about.experience.title") }}
          </h3>
          <div class="space-y-8">
            <div
              v-for="job in experience"
              :key="job.id"
              class="border-l-4 border-primary-500 pl-6"
            >
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
              >
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ job.position }}
                </h4>
                <span class="text-gray-500 dark:text-gray-400">{{
                  job.period
                }}</span>
              </div>
              <p
                class="text-primary-600 dark:text-primary-400 font-medium mb-2"
              >
                {{ job.company }}
              </p>
              <p class="text-gray-600 dark:text-gray-300 mb-3">
                {{ job.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in job.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-sm rounded"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Образование -->
        <div class="card mb-12">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t("about.education.title") }}
          </h3>
          <div class="space-y-6">
            <div
              v-for="edu in education"
              :key="edu.id"
              class="border-l-4 border-secondary-500 pl-6"
            >
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between mb-2"
              >
                <h4 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ edu.degree }}
                </h4>
                <span class="text-gray-500 dark:text-gray-400">{{
                  edu.period
                }}</span>
              </div>
              <p class="text-secondary-600 dark:text-secondary-400 font-medium">
                {{ edu.institution }}
              </p>
            </div>
          </div>
        </div>

        <!-- Интересы -->
        <div class="card">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t("about.interests.title") }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="interest in interests"
              :key="interest.id"
              class="flex items-start gap-4"
            >
              <div
                class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-primary-600 dark:text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{ interest.title }}
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ interest.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { computed } from "vue";
import { useTranslations } from "@/locales";
import { generateResumePDF } from "@/utils/resumeGenerator";

const { t, currentLanguage } = useTranslations();

const downloadResume = () => {
  generateResumePDF(currentLanguage.value);
};

const experience = computed(() => [
  {
    id: 1,
    position: t("about.experience.juniorFullstack"),
    company: t("about.experience.freelance"),
    period: `2023 - ${t("about.education.present")}`,
    description: t("about.experience.webDevDescription"),
    technologies: ["Vue.js", "Node.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    position: t("about.experience.juniorFrontend"),
    company: t("about.experience.webStudio"),
    period: `2023 - ${t("about.education.present")}`,
    description: t("about.experience.uiDescription"),
    technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
  },
]);

const education = computed(() => [
  {
    id: 1,
    degree: t("about.education.university"),
    institution: t("about.education.universityName"),
    period: "2021 - 2025",
  },
  {
    id: 2,
    degree: t("about.education.gymnasium"),
    institution: t("about.education.gymnasiumName"),
    period: "2010 - 2021",
  },
  {
    id: 3,
    degree: t("about.education.robotics"),
    institution: t("about.education.roboticsName"),
    period: "2018 - 2020",
  },
  {
    id: 4,
    degree: t("about.education.webDevelopment"),
    institution: t("about.education.online"),
    period: "2022 - 2023",
  },
  {
    id: 5,
    degree: t("about.education.selfStudy"),
    institution: t("about.education.selfStudyName"),
    period: `2022 - ${t("about.education.present")}`,
  },
]);

const interests = computed(() => [
  {
    id: 1,
    title: t("about.interests.openSource"),
    description: t("about.interests.openSourceDesc"),
  },
  {
    id: 2,
    title: t("about.interests.newTech"),
    description: t("about.interests.newTechDesc"),
  },
  {
    id: 3,
    title: t("about.interests.ai").split(" ").slice(0, 2).join(" "),
    description: t("about.interests.ai"),
  },
  {
    id: 4,
    title: t("about.interests.travel"),
    description: t("about.interests.travelDesc"),
  },
  {
    id: 5,
    title: t("about.interests.photography"),
    description: t("about.interests.photographyDesc"),
  },
]);
</script>
