<template>
  <div class="min-h-screen">
    <AppHeader />

    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="section-title text-center">{{ t("projects.title") }}</h1>
        <p class="section-subtitle text-center">
          {{ t("projects.subtitle") }}
        </p>

        <!-- Фильтры -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="category in categories"
            :key="category.value"
            class="px-4 py-2 rounded-lg transition-colors duration-200"
            :class="
              selectedCategory === category.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            "
            @click="selectedCategory = category.value"
          >
            {{ t(category.translationKey) }}
          </button>
        </div>

        <!-- Проекты -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </div>

        <!-- Пагинация -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <div class="flex gap-2">
            <button
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
              @click="currentPage--"
            >
              {{ t("projects.previous") }}
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              class="px-3 py-2 rounded-lg border"
              :class="
                currentPage === page
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300'
              "
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300"
              @click="currentPage++"
            >
              {{ t("projects.next") }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { useTranslations } from "@/locales";

const { t } = useTranslations();

const selectedCategory = ref("all");
const currentPage = ref(1);
const itemsPerPage = 6;

const categories = [
  { value: "all", translationKey: "projects.all" },
  { value: "frontend", translationKey: "projects.frontend" },
  { value: "backend", translationKey: "projects.backend" },
  { value: "fullstack", translationKey: "projects.fullstack" },
  { value: "mobile", translationKey: "projects.mobile" },
];

const projects = [
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
    title: "REST API Service",
    descriptionKey: "projects.descriptions.restApi",
    technologies: ["Node.js", "Express.js", "MongoDB", "JWT"],
    demo: "#",
    github: "#",
    category: "backend",
    date: "2024",
    type: "commercial",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    descriptionKey: "projects.descriptions.weatherDashboard",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
    demo: "#",
    github: "#",
    category: "frontend",
    date: "2023",
    type: "personal",
  },
  {
    id: 5,
    title: "Mobile App",
    descriptionKey: "projects.descriptions.mobileApp",
    technologies: ["React Native", "Node.js", "MongoDB"],
    demo: "#",
    github: "#",
    category: "mobile",
    date: "2023",
    type: "commercial",
  },
  {
    id: 6,
    title: "Portfolio Website",
    descriptionKey: "projects.descriptions.portfolio",
    technologies: ["Vue.js", "Tailwind CSS", "Vite"],
    demo: "#",
    github: "#",
    category: "frontend",
    date: "2024",
    type: "personal",
  },
  {
    id: 7,
    title: "DnD Character Generator",
    descriptionKey: "projects.descriptions.dnd",
    technologies: ["React.js", "JavaScript", "CSS3"],
    demo: "https://github.com/TheMilize/dnd_randomizer",
    github: "https://github.com/TheMilize/dnd_randomizer",
    category: "fullstack",
    date: "2024",
    type: "personal",
  },
  {
    id: 8,
    title: "Memory Game",
    descriptionKey: "projects.descriptions.memory",
    technologies: ["Vue.js", "JavaScript", "CSS3"],
    demo: "https://github.com/TheMilize/memory_game",
    github: "https://github.com/TheMilize/memory_game",
    category: "fullstack",
    date: "2023",
    type: "personal",
  },
  {
    id: 9,
    title: "Effective Mobile Frontend",
    descriptionKey: "projects.descriptions.effectiveFrontend",
    technologies: ["Vue.js", "TypeScript", "CSS3"],
    demo: "https://github.com/TheMilize/effective_mobile_ts_f",
    github: "https://github.com/TheMilize/effective_mobile_ts_f",
    category: "frontend",
    date: "2024",
    type: "commercial",
  },
  {
    id: 10,
    title: "Effective Mobile Backend",
    descriptionKey: "projects.descriptions.effectiveBackend",
    technologies: ["Node.js", "TypeScript", "Express"],
    demo: "https://github.com/TheMilize/effective_mobile_ts_b",
    github: "https://github.com/TheMilize/effective_mobile_ts_b",
    category: "backend",
    date: "2024",
    type: "commercial",
  },
  {
    id: 11,
    title: "E-commerce Platform",
    descriptionKey: "projects.descriptions.ecommerce",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe"],
    demo: "#",
    github: "#",
    category: "fullstack",
    date: "2024",
    type: "commercial",
  },
  {
    id: 12,
    title: "Task Management App",
    descriptionKey: "projects.descriptions.taskManagement",
    technologies: ["Vue.js", "TypeScript", "Firebase", "Tailwind CSS"],
    demo: "#",
    github: "#",
    category: "frontend",
    date: "2024",
    type: "personal",
  },
];

const filteredProjects = computed(() => {
  const filtered =
    selectedCategory.value === "all"
      ? projects
      : projects.filter(
          (project) => project.category === selectedCategory.value,
        );

  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filtered.slice(start, end);
});

const totalPages = computed(() => {
  const filtered =
    selectedCategory.value === "all"
      ? projects
      : projects.filter(
          (project) => project.category === selectedCategory.value,
        );

  return Math.ceil(filtered.length / itemsPerPage);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages.value, start + maxVisible - 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>
