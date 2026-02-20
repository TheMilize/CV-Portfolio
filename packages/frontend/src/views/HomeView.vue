<template>
  <div class="min-h-screen">
    <AppHeader />

    <!-- Hero Section -->
    <section class="bg-gradient-hero py-32 relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h1
            class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 animate-fade-in"
          >
            {{ t("home.hero.title") }}
          </h1>
          <p
            class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto animate-slide-up"
            style="animation-delay: 0.2s"
          >
            {{ t("home.hero.subtitle") }}
          </p>
          <div
            class="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in"
            style="animation-delay: 0.4s"
          >
            <router-link to="/projects" class="btn-primary text-lg px-8 py-4">
              {{ t("home.hero.viewProjects") }}
            </router-link>
            <router-link to="/contact" class="btn-secondary text-lg px-8 py-4">
              {{ t("home.hero.contactMe") }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-32 bg-gradient-primary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title text-center">{{ t("home.skills.title") }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(skill, index) in skills"
            :key="skill.category"
            class="card animate-fade-in"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <h3
              class="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400"
            >
              {{ t(`home.skills.${skill.category.toLowerCase()}`) }}
            </h3>
            <div class="space-y-2">
              <div
                v-for="tech in skill.technologies"
                :key="tech.name"
                class="flex justify-between items-center"
              >
                <span class="text-gray-700 dark:text-gray-300">{{
                  tech.name
                }}</span>
                <div
                  class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                >
                  <div
                    class="bg-gradient-to-r from-primary-600 to-primary-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    :style="{ width: tech.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-20 bg-gradient-primary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter
            :value="16"
            :label="t('stats.projects')"
            class="animate-fade-in"
          />
          <AnimatedCounter
            :value="1"
            :label="t('stats.experience')"
            class="animate-fade-in"
            :style="{ animationDelay: '0.1s' }"
          />
          <AnimatedCounter
            :value="14"
            :label="t('stats.clients')"
            class="animate-fade-in"
            :style="{ animationDelay: '0.2s' }"
          />
          <AnimatedCounter
            :value="95"
            :label="t('stats.satisfaction')"
            class="animate-fade-in"
            :style="{ animationDelay: '0.3s' }"
          />
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section
      class="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="section-title text-center">
          {{ t("home.featuredProjects.title") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            :project="project"
            class="animate-fade-in"
            :style="{ animationDelay: `${index * 0.2}s` }"
          />
        </div>
        <div class="text-center mt-8">
          <router-link to="/projects" class="btn-primary">
            {{ t("home.featuredProjects.viewAll") }}
          </router-link>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import AnimatedCounter from "@/components/AnimatedCounter.vue";
import { useTranslations } from "@/locales";

const { t } = useTranslations();

const skills = [
  {
    category: "frontend",
    technologies: [
      { name: "Vue.js", level: 90 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    category: "backend",
    technologies: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
    ],
  },
  {
    category: "tools",
    technologies: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "CI/CD", level: 75 },
    ],
  },
];

const featuredProjects = [
  {
    id: 1,
    title: "Office Space Frontend",
    descriptionKey: "projects.descriptions.officeSpaceFrontend",
    technologies: ["Vue.js", "TypeScript", "CSS3"],
    demo: "https://github.com/TheMilize/office_space_f",
    github: "https://github.com/TheMilize/office_space_f",
    category: "frontend",
    date: "2025",
    type: "personal",
  },
  {
    id: 2,
    title: "Office Space Backend",
    descriptionKey: "projects.descriptions.officeSpaceBackend",
    technologies: ["Node.js", "TypeScript", "PostgreSQL"],
    demo: "https://github.com/TheMilize/office_space_b",
    github: "https://github.com/TheMilize/office_space_b",
    category: "backend",
    date: "2025",
    type: "personal",
  },
  {
    id: 3,
    title: "Task Management App",
    descriptionKey: "projects.descriptions.taskManagement",
    technologies: ["Vue.js", "TypeScript", "Firebase"],
    demo: "#",
    github: "#",
    category: "frontend",
    date: "2024",
    type: "personal",
  },
  {
    id: 4,
    title: "DnD Character Generator",
    descriptionKey: "projects.descriptions.dnd",
    technologies: ["React.js", "JavaScript", "CSS3"],
    demo: "https://github.com/TheMilize/dnd_randomizer",
    github: "https://github.com/TheMilize/dnd_randomizer",
    category: "frontend",
    date: "2024",
    type: "personal",
  },
  {
    id: 5,
    title: "Memory Game",
    descriptionKey: "projects.descriptions.memory",
    technologies: ["Vue.js", "JavaScript", "CSS3"],
    demo: "https://github.com/TheMilize/memory_game",
    github: "https://github.com/TheMilize/memory_game",
    category: "frontend",
    date: "2024",
    type: "personal",
  },
  {
    id: 6,
    title: "Effective Mobile Frontend",
    descriptionKey: "projects.descriptions.effectiveFrontend",
    technologies: ["Vue.js", "TypeScript", "CSS3"],
    demo: "https://github.com/TheMilize/effective_mobile_ts_f",
    github: "https://github.com/TheMilize/effective_mobile_ts_f",
    category: "frontend",
    date: "2024",
    type: "commercial",
  },
];
</script>
