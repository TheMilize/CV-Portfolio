<template>
  <div class="shell page-section about-page">
    <header class="page-heading">
      <p class="eyebrow">{{ t("design.aboutLabel") }}</p>
      <h1>{{ t("design.aboutHeading") }}</h1>
      <p>{{ t("design.aboutIntro") }}</p>
    </header>
    <section class="profile-panel">
      <div class="profile-image-wrapper">
        <img
          src="@/assets/images/profile-portrait-retouched.png"
          :alt="t('about.name')"
          class="profile-image"
          width="1122"
          height="1402"
        /><span class="photo-caption"
          >VLADLEN MILIZE / {{ t("design.eyebrow") }}</span
        >
      </div>
      <div class="profile-info">
        <p class="eyebrow">
          <span class="status-dot"></span>{{ t("design.hello") }}
        </p>
        <h2>{{ t("about.name") }}<span class="heading-dot">.</span></h2>
        <p class="profile-description">{{ t("about.description") }}</p>
        <div class="profile-location">
          <UiIcon name="pin" :size="17" />{{ t("common.location") }}
        </div>
        <div class="profile-actions">
          <router-link to="/contact" class="btn-primary"
            >{{ t("design.letsTalk")
            }}<UiIcon name="external" :size="17" /></router-link
          ><button
            class="btn-secondary"
            :disabled="downloading"
            :aria-busy="downloading"
            @click="downloadResume"
          >
            {{
              downloading
                ? t("design.resumeLoading")
                : t("common.downloadResume")
            }}<UiIcon name="download" :size="17" />
          </button>
        </div>
        <p v-if="resumeError" role="alert" class="resume-error">
          {{ t("design.resumeError") }}
        </p>
      </div>
    </section>
    <section class="about-detail-section about-services-section">
      <div class="about-section-heading">
        <p class="eyebrow">{{ t("design.practiceLabel") }}</p>
        <h2>{{ t("about.practice.title") }}</h2>
        <p class="section-description">{{ t("about.practice.intro") }}</p>
        <router-link to="/projects" class="text-link">
          {{ t("home.hero.viewProjects") }}<UiIcon name="external" :size="18" />
        </router-link>
      </div>
      <div class="skill-list">
        <article v-for="item in services" :key="item.id" class="skill-row">
          <span class="skill-icon"
            ><UiIcon :name="item.icon" :size="22"
          /></span>
          <div>
            <div class="skill-heading">
              <h3>{{ item.title }}</h3>
              <span>0{{ item.id }}</span>
            </div>
            <p>{{ item.description }}</p>
            <div class="technology-tags">
              <span v-for="tech in item.technologies" :key="tech">{{
                tech
              }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
    <section class="about-detail-section">
      <div class="about-section-heading">
        <p class="eyebrow">{{ t("design.educationLabel") }}</p>
        <h2>{{ t("about.education.title") }}</h2>
      </div>
      <div class="education-content">
        <div class="timeline">
          <article v-for="edu in education" :key="edu.id" class="timeline-item">
            <div class="education-meta">
              <span class="education-level">{{ edu.level }}</span>
              <span class="timeline-period">{{ edu.period }}</span>
            </div>
            <h3>{{ edu.degree }}</h3>
            <p v-if="edu.institution" class="timeline-description">
              {{ edu.institution }}
            </p>
          </article>
        </div>
      </div>
    </section>
    <section class="interests-section">
      <div class="about-section-heading">
        <p class="eyebrow">{{ t("design.interestsLabel") }}</p>
        <h2>{{ t("about.interests.title") }}</h2>
      </div>
      <div class="interests-grid">
        <article
          v-for="(interest, i) in interests"
          :key="interest.id"
          class="interest-card"
        >
          <div>
            <span class="interest-number">0{{ i + 1 }}</span
            ><UiIcon
              :name="['code', 'layers', 'server', 'globe', 'search'][i]"
              :size="22"
            />
          </div>
          <h3>{{ interest.title }}</h3>
          <p>{{ interest.description }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useTranslations } from "@/locales";
import UiIcon from "@/components/UiIcon.vue";
import "./AboutView.css";

const { t } = useTranslations();

const downloading = ref(false);
const resumeError = ref(false);
const downloadResume = async () => {
  if (downloading.value) return;
  downloading.value = true;
  resumeError.value = false;
  try {
    const { generateResumePDF } = await import("@/utils/resumeGenerator");
    await generateResumePDF();
  } catch {
    resumeError.value = true;
  } finally {
    downloading.value = false;
  }
};

const services = computed(() => [
  {
    id: 1,
    title: t("about.practice.fullstackProjects"),
    icon: "layers",
    description: t("about.practice.fullstackDescription"),
    technologies: ["Vue.js", "Node.js", "PostgreSQL"],
  },
  {
    id: 2,
    title: t("about.practice.botsTitle"),
    icon: "chat",
    description: t("about.practice.botsDescription"),
    technologies: ["Node.js", "TypeScript", "Telegram Bot API"],
  },
  {
    id: 3,
    title: t("about.practice.frontendProjects"),
    icon: "code",
    description: t("about.practice.frontendDescription"),
    technologies: ["Vue.js", "JavaScript", "CSS", "HTML"],
  },
]);

const education = computed(() => [
  {
    id: 4,
    degree: t("about.education.corporateInformationSystems"),
    level: t("about.education.mastersDegree"),
    institution: t("about.education.universityName"),
    period: "2025 - 2028",
  },
  {
    id: 1,
    degree: t("about.education.university"),
    level: t("about.education.bachelorsDegree"),
    institution: t("about.education.universityName"),
    period: "2021 - 2025",
  },
  {
    id: 2,
    degree: t("about.education.gymnasium"),
    level: t("about.education.gymnasiumName"),
    institution: "",
    period: "2010 - 2021",
  },
  {
    id: 3,
    degree: t("about.education.robotics"),
    level: t("about.education.roboticsName"),
    institution: "",
    period: "2018 - 2020",
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
    title: t("design.ai"),
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
