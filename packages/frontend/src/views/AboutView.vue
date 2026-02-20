<template>
  <div class="about-page">
    <AppHeader />

    <section class="about-section">
      <div class="about-container">
        <h1 class="about-title">{{ t("about.title") }}</h1>

        <!-- Основная информация -->
        <div class="about-card">
          <div class="profile-wrapper">
            <div class="profile-image-wrapper">
              <div class="profile-image-container">
                <img
                  src="@/assets/images/Photo.png"
                  alt="Profile Photo"
                  class="profile-image"
                />
              </div>
            </div>
            <div class="profile-info">
              <h2 class="profile-name">
                {{ t("about.name") }}
              </h2>
              <p class="profile-description">
                {{ t("about.description") }}
              </p>
              <div class="profile-actions">
                <router-link to="/contact" class="btn-primary">
                  {{ t("common.writeEmail") }}
                </router-link>
                <button class="btn-secondary" @click="downloadResume">
                  {{ t("common.downloadResume") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Проекты и практика -->
        <div class="about-card">
          <h3 class="card-title">
            {{ t("about.practice.title") }}
          </h3>
          <div class="practice-list">
            <div
              v-for="item in practice"
              :key="item.id"
              class="practice-item"
            >
              <div class="practice-header">
                <h4 class="practice-position">
                  {{ item.position }}
                </h4>
                <span class="practice-period">{{
                  item.period
                }}</span>
              </div>
              <p class="practice-company">
                {{ item.company }}
              </p>
              <p class="practice-description">
                {{ item.description }}
              </p>
              <div class="practice-technologies">
                <span
                  v-for="tech in item.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Образование -->
        <div class="about-card">
          <h3 class="card-title">
            {{ t("about.education.title") }}
          </h3>
          <div class="education-list">
            <div
              v-for="edu in education"
              :key="edu.id"
              class="education-item"
            >
              <div class="education-header">
                <h4 class="education-degree">
                  {{ edu.degree }}
                </h4>
                <span class="education-period">{{
                  edu.period
                }}</span>
              </div>
              <p class="education-institution">
                {{ edu.institution }}
              </p>
            </div>
          </div>
        </div>

        <!-- Интересы -->
        <div class="about-card">
          <h3 class="card-title">
            {{ t("about.interests.title") }}
          </h3>
          <div class="interests-grid">
            <div
              v-for="interest in interests"
              :key="interest.id"
              class="interest-item"
            >
              <div class="interest-icon">
                <svg
                  class="interest-svg"
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
              <div class="interest-content">
                <h4 class="interest-title">
                  {{ interest.title }}
                </h4>
                <p class="interest-description">
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
import "./AboutView.css";

const { t, currentLanguage } = useTranslations();

const downloadResume = () => {
  generateResumePDF(currentLanguage.value);
};

const practice = computed(() => [
  {
    id: 1,
    position: t("about.practice.fullstackProjects"),
    company: t("about.practice.personalProjects"),
    period: `2023 - ${t("about.education.present")}`,
    description: t("about.practice.fullstackDescription"),
    technologies: ["Vue.js", "Node.js", "TypeScript", "CSS3"],
  },
  {
    id: 2,
    position: t("about.practice.frontendProjects"),
    company: t("about.practice.personalProjects"),
    period: `2023 - ${t("about.education.present")}`,
    description: t("about.practice.frontendDescription"),
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
