import { defineStore } from "pinia";

type ThemeMode = "light" | "dark" | "system";
type LanguageCode = "en" | "ru";

interface MainState {
  theme: ThemeMode;
  currentLanguage: LanguageCode;
}

const THEME_KEY = "theme";
const LANG_KEY = "lang";

export const useMainStore = defineStore("main", {
  state: (): MainState => ({
    theme: "system",
    currentLanguage: "en",
  }),
  getters: {
    isDark: (state): boolean => {
      if (state.theme === "system") {
        return typeof window !== "undefined"
          ? window.matchMedia &&
              window.matchMedia("(prefers-color-scheme: dark)").matches
          : false;
      }
      return state.theme === "dark";
    },
  },
  actions: {
    setTheme(mode: ThemeMode) {
      this.theme = mode;
      if (typeof document !== "undefined") {
        const root = document.documentElement;
        const dark = this.isDark;
        root.classList.toggle("dark", dark);
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(THEME_KEY, mode);
      }
    },
    initTheme() {
      if (typeof localStorage !== "undefined") {
        const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
        if (saved === "light" || saved === "dark" || saved === "system") {
          this.theme = saved;
        }
      }
      // apply
      this.setTheme(this.theme);
    },
    setLanguage(lang: LanguageCode) {
      this.currentLanguage = lang;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(LANG_KEY, lang);
      }
    },
    initLanguage() {
      if (typeof localStorage !== "undefined") {
        const saved = localStorage.getItem(LANG_KEY) as LanguageCode | null;
        if (saved === "en" || saved === "ru") {
          this.currentLanguage = saved;
        }
      }
    },
  },
});
