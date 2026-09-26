<template>
  <div class="home-page">
    <section class="hero shell">
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="status-dot"></span>{{ t("design.eyebrow") }}
        </p>
        <h1>
          {{ t("design.heroFirst") }}<br /><span class="hero-accent">{{
            t("design.heroSecond")
          }}</span
          ><br />{{ t("design.heroThird") }}<br /><span class="hero-serif">{{
            t("design.heroFourth")
          }}</span>
        </h1>
        <p class="hero-description">{{ t("design.intro") }}</p>
        <div class="hero-actions">
          <router-link to="/projects" class="btn-primary"
            >{{ t("design.explore")
            }}<UiIcon name="external" :size="18" /></router-link
          ><router-link to="/about" class="text-link"
            >{{ t("design.aboutLink") }}<UiIcon :size="17"
          /></router-link>
        </div>
        <div class="hero-location">
          <UiIcon name="pin" :size="15" />{{ t("design.based") }}
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="visual-topline">
          <span>THE DEVELOPER’S WORKSPACE</span><span>01 — 03</span>
        </div>
        <div class="orbital orbital-one"></div>
        <div class="orbital orbital-two"></div>
        <div class="hero-star">✳</div>
        <div class="code-window">
          <div class="window-bar">
            <div class="window-dots"><i></i><i></i><i></i></div>
            <span>hello.ts</span><UiIcon name="code" :size="14" />
          </div>
          <div class="code-content">
            <div>
              <span class="line-no">01</span
              ><span class="code-purple">const</span> developer = {
            </div>
            <div>
              <span class="line-no">02</span>&nbsp; name:
              <span class="code-green">'Vladlen'</span>,
            </div>
            <div>
              <span class="line-no">03</span>&nbsp; focus:
              <span class="code-green">'full-stack'</span>,
            </div>
            <div>
              <span class="line-no">04</span>&nbsp; stack: [<span
                class="code-green"
                >'Vue', 'Node'</span
              >],
            </div>
            <div>
              <span class="line-no">05</span>&nbsp; mindset:
              <span class="code-green">'always learning'</span>
            </div>
            <div><span class="line-no">06</span>};</div>
            <div class="code-comment">
              <span class="line-no">07</span>// from idea to interaction
            </div>
            <div>
              <span class="line-no">08</span>developer.<span class="code-yellow"
                >build</span
              >(<span class="code-green">'something great'</span>);
            </div>
          </div>
          <div class="code-status">
            <span><span class="status-dot"></span>Ready to create</span
            ><span>TypeScript</span>
          </div>
        </div>
        <div class="floating-tag tag-vue">
          <span class="vue-logo">V</span> Vue.js
        </div>
        <div class="floating-tag tag-ts">
          <span class="ts-logo">TS</span> TypeScript
        </div>
        <span class="visual-bottomline">CODE · CURIOSITY · CRAFT</span
        ><span class="visual-coordinate">{ vm }</span>
      </div>
    </section>
    <div class="shell">
      <div class="technology-strip">
        <span class="mono-label">{{ t("design.stack") }}</span>
        <div>
          <span>Vue.js</span><i>✳</i><span>TypeScript</span><i>✳</i
          ><span>Node.js</span><i>✳</i><span>PostgreSQL</span><i>✳</i
          ><span>Docker</span>
        </div>
      </div>
    </div>
    <section id="selected-work" class="section shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ t("design.featuredLabel") }}</p>
          <h2>{{ t("design.featuredTitle") }}</h2>
          <p class="section-description">{{ t("design.featuredText") }}</p>
        </div>
        <router-link to="/projects" class="text-link"
          >{{ t("design.allWork")
          }}<span class="count-badge">{{ projects.length }}</span
          ><UiIcon name="external" :size="18"
        /></router-link>
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>
    <section class="toolkit-section">
      <div class="shell toolkit-layout">
        <div>
          <p class="eyebrow">{{ t("design.skillsLabel") }}</p>
          <h2 class="multiline">{{ t("design.skillsTitle") }}</h2>
          <p class="section-description">{{ t("design.skillsIntro") }}</p>
          <router-link class="text-link" to="/about"
            >{{ t("nav.about") }}<UiIcon name="external" :size="18"
          /></router-link>
        </div>
        <div class="skill-list">
          <div
            v-for="(skill, i) in skills"
            :key="skill.title"
            class="skill-row"
          >
            <span class="skill-icon"
              ><UiIcon :name="skill.icon" :size="22"
            /></span>
            <div>
              <div class="skill-heading">
                <h3>{{ t("home.skills." + skill.title) }}</h3>
                <span>0{{ i + 1 }}</span>
              </div>
              <p>{{ t("design." + skill.title + "Desc") }}</p>
              <div class="technology-tags">
                <span v-for="tech in skill.technologies" :key="tech">{{
                  tech
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="shell cta-section">
      <div class="cta-panel">
        <div>
          <p class="eyebrow">{{ t("design.ctaLabel") }}</p>
          <h2 class="multiline">{{ t("design.ctaTitle") }}</h2>
          <p>{{ t("design.ctaText") }}</p>
          <router-link to="/contact" class="btn-primary"
            >{{ t("design.letsTalk") }}<UiIcon name="external" :size="18"
          /></router-link>
        </div>
        <span class="cta-asterisk" aria-hidden="true">✳</span>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import UiIcon from "@/components/UiIcon.vue";
import { useTranslations } from "@/locales";
import { projects, featuredProjects } from "@/data/projects";
const { t } = useTranslations();
const skills = [
  {
    title: "frontend",
    icon: "code",
    technologies: ["Vue.js", "React", "TypeScript", "CSS3"],
  },
  {
    title: "backend",
    icon: "server",
    technologies: ["Node.js", "Express", "Telegram Bot API", "PostgreSQL"],
  },
  {
    title: "tools",
    icon: "layers",
    technologies: ["Git", "Docker", "AWS", "CI/CD"],
  },
];
</script>
