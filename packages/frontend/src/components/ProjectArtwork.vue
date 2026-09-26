<template>
  <div
    class="project-artwork"
    :class="'art-' + variant"
    role="img"
    :aria-label="t('design.illustration') + ': ' + project.title"
  >
    <span class="art-label">{{ labels[variant] }}</span
    ><span class="art-index"
      >{{ String(project.id).padStart(2, "0") }} / {{ project.date }}</span
    >
    <template v-if="variant === 'model'"
      ><div class="model-grid"></div>
      <div class="model-orbit"></div>
      <svg
        class="model-shape"
        viewBox="0 0 240 220"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            :id="'facet-' + project.id"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop stop-color="#f4ae8c" />
            <stop offset="1" stop-color="#b94229" />
          </linearGradient>
        </defs>
        <path
          d="m120 18 84 47 14 88-98 53-98-53 14-88Z"
          :fill="'url(#facet-' + project.id + ')'"
        />
        <path
          d="m120 18 0 78-84-31Zm0 78 98 57-98 53ZM22 153l98-57v110Z"
          fill="#fff"
          fill-opacity=".16"
        />
        <path
          d="m120 18 84 47 14 88-98 53-98-53 14-88Zm0 0v78m84-31-84 31-84-31m84 31 98 57m-98-57-98 57m98-57v110"
          stroke="#ffe3cf"
          stroke-opacity=".65"
          stroke-width="1.2"
        />
      </svg>
      <div class="art-toolbar">
        <span>↖</span><span>⤢</span><span>↻</span><span>◈</span>
      </div></template
    >
    <template v-else-if="variant === 'office'"
      ><div class="office-window">
        <div class="office-sidebar">
          <b>o<span>.</span></b
          ><i></i><i></i><i></i><i></i>
        </div>
        <div class="office-content">
          <div class="mini-heading">Your space. Your flow.<span>＋</span></div>
          <div class="mini-subheading">Find your next workspace</div>
          <div class="office-cards">
            <div v-for="i in 3" :key="i">
              <div class="room" :class="'room-' + i"><span></span></div>
              <i></i><small></small>
            </div>
          </div>
          <div class="mini-chart">
            <span
              v-for="n in 12"
              :key="n"
              :style="{ height: 20 + ((n * 17) % 60) + '%' }"
            ></span>
          </div>
        </div></div
    ></template>
    <template v-else-if="variant === 'api'"
      ><div class="api-diagram">
        <div class="api-node">{{ "{ }" }}<span>REST API</span></div>
        <div class="api-lines"><i></i><i></i><i></i></div>
        <div class="api-services">
          <span>auth<small>200 OK</small></span
          ><span>database<small>CONNECTED</small></span
          ><span>storage<small>READY</small></span>
        </div>
      </div>
      <span class="api-caption">REQUEST → PROCESS → RESPONSE</span></template
    >
    <template v-else-if="variant === 'game'"
      ><div class="game-grid">
        <span
          v-for="(symbol, i) in ['✳', '◇', '○', '◇', '✳', '○']"
          :key="i"
          :class="{ flipped: i === 1 || i === 4 }"
          >{{ symbol }}</span
        >
      </div></template
    >
    <template v-else
      ><div class="abstract-window">
        <div class="window-dots"><i></i><i></i><i></i></div>
        <div class="abstract-layout">
          <div><i></i><i></i><i></i></div>
          <div class="abstract-block">
            <span>{{ project.category === "mobile" ? "↗" : "✳" }}</span>
          </div>
        </div>
      </div></template
    >
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useTranslations } from "@/locales";
import type { Project } from "@/data/projects";
const props = defineProps<{ project: Project }>();
const { t } = useTranslations();
const variant = computed(() =>
  props.project.id === 1
    ? "model"
    : props.project.id === 2
      ? "office"
      : props.project.category === "backend"
        ? "api"
        : [8, 9].includes(props.project.id)
          ? "game"
          : "abstract",
);
const labels: Record<string, string> = {
  model: "EXPERIMENT / 3D",
  office: "PRODUCT / WORKSPACE",
  api: "SYSTEM / ARCHITECTURE",
  game: "PLAY / INTERACTION",
  abstract: "WEB / EXPERIENCE",
};
</script>
