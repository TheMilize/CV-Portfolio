import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import ContactView from "@/views/ContactView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Главная" },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: { title: "Обо мне" },
    },
    {
      path: "/projects",
      name: "projects",
      component: ProjectsView,
      meta: { title: "Проекты" },
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
      meta: { title: "Контакты" },
    },
  ],
});

// Изменение заголовка страницы
router.beforeEach((to, from, next) => {
  document.title = `Портфолио - ${to.meta.title || "Главная"}`;
  next();
});

export default router;
