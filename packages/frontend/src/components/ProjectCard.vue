<template>
  <article class="project-card">
    <ProjectArtwork :project="project" />
    <div class="project-body">
      <div class="project-meta">
        <span>{{ t("projects." + project.category) }}</span
        ><span>{{ project.date }}</span>
      </div>
      <h3>
        <a
          v-if="hasSource"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          >{{ project.title }}<UiIcon name="external" :size="21" /></a
        ><span v-else>{{ project.title }}</span>
      </h3>
      <p>{{ t(project.descriptionKey) }}</p>
      <div class="technology-tags">
        <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
      </div>
      <div class="project-bottom">
        <span class="project-type">{{ t("common." + project.type) }}</span
        ><a
          v-if="hasSource"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="t('design.source') + ': ' + project.title"
          >{{ t("design.source") }}<UiIcon name="external" :size="15" /></a
        ><span v-else class="unavailable">{{ t("design.private") }}</span
        ><a
          v-if="hasDemo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          >{{ t("common.demo") }}<UiIcon name="external" :size="15"
        /></a>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useTranslations } from "@/locales";
import type { Project } from "@/data/projects";
import ProjectArtwork from "./ProjectArtwork.vue";
import UiIcon from "./UiIcon.vue";
const props = defineProps<{ project: Project }>();
const { t } = useTranslations();
const hasSource = computed(() => /^https?:\/\//.test(props.project.github));
const hasDemo = computed(
  () =>
    /^https?:\/\//.test(props.project.demo) &&
    !props.project.demo.includes("github.com"),
);
</script>
