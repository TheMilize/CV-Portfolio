<template>
  <div class="shell page-section projects-page">
    <header class="page-heading">
      <p class="eyebrow">{{ t("design.projectsLabel") }}</p>
      <h1>
        {{ t("design.projectsHeading") }}<span class="heading-dot">.</span>
      </h1>
      <p>{{ t("projects.subtitle") }}</p>
    </header>
    <div class="project-controls">
      <div class="filter-tabs" :aria-label="t('nav.projects')">
        <button
          v-for="category in categories"
          :key="category"
          :class="{ selected: selectedCategory === category }"
          :aria-pressed="selectedCategory === category"
          @click="selectedCategory = category"
        >
          {{ t("projects." + category)
          }}<span>{{
            category === "all"
              ? projects.length
              : projects.filter((p) => p.category === category).length
          }}</span>
        </button>
      </div>
      <label class="search-field"
        ><UiIcon name="search" :size="18" /><input
          v-model="query"
          type="search"
          :placeholder="t('design.search')"
          :aria-label="t('design.search')"
      /></label>
    </div>
    <div class="results-line" aria-live="polite">
      <span>{{ t("design.results") }}: {{ matchedProjects.length }}</span
      ><span v-if="totalPages > 1"
        >{{ t("design.page") }} {{ currentPage }} / {{ totalPages }}</span
      >
    </div>
    <div v-if="matchedProjects.length" class="project-grid">
      <ProjectCard
        v-for="project in visibleProjects"
        :key="project.id"
        :project="project"
      />
    </div>
    <div v-else class="empty-state">
      <UiIcon name="search" :size="36" />
      <h2>{{ t("design.noResults") }}</h2>
      <p>{{ t("design.noResultsText") }}</p>
      <button
        class="btn-secondary"
        @click="
          query = '';
          selectedCategory = 'all';
        "
      >
        {{ t("design.clear") }}
      </button>
    </div>
    <nav
      v-if="totalPages > 1"
      class="pagination"
      :aria-label="t('design.page')"
    >
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        ← <span>{{ t("projects.previous") }}</span>
      </button>
      <div>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="{ selected: currentPage === page }"
          :aria-current="currentPage === page ? 'page' : undefined"
          :aria-label="t('design.page') + ' ' + page"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <span>{{ t("projects.next") }}</span> →
      </button>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import UiIcon from "@/components/UiIcon.vue";
import { useTranslations } from "@/locales";
import { projects } from "@/data/projects";
const { t } = useTranslations();
const selectedCategory = ref("all");
const currentPage = ref(1);
const query = ref("");
const categories = ["all", "frontend", "backend", "fullstack", "mobile"];
const matchedProjects = computed(() =>
  projects.filter(
    (project) =>
      (selectedCategory.value === "all" ||
        project.category === selectedCategory.value) &&
      [project.title, ...project.technologies, t(project.descriptionKey)]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query.value.trim().toLocaleLowerCase()),
  ),
);
const totalPages = computed(() => Math.ceil(matchedProjects.value.length / 6));
const visibleProjects = computed(() =>
  matchedProjects.value.slice(
    (currentPage.value - 1) * 6,
    currentPage.value * 6,
  ),
);
watch(
  [selectedCategory, query, () => matchedProjects.value.length],
  () => {
    currentPage.value = 1;
  },
  { flush: "sync" },
);
function changePage(page: number) {
  currentPage.value = page;
  document.querySelector(".project-controls")?.scrollIntoView({
    block: "start",
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
</script>
