import { defineStore } from "pinia";
type ThemeMode = "light" | "dark" | "system";
type LanguageCode = "en" | "ru";
function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Preferences still work when storage is unavailable. */
  }
}
let stopThemeListener: (() => void) | undefined;
export const useMainStore = defineStore("main", {
  state: () => ({
    theme: "system" as ThemeMode,
    currentLanguage: "en" as LanguageCode,
    systemDark: false,
  }),
  getters: {
    isDark: (state) =>
      state.theme === "system" ? state.systemDark : state.theme === "dark",
  },
  actions: {
    applyTheme() {
      document.documentElement.classList.toggle("dark", this.isDark);
    },
    setTheme(mode: ThemeMode) {
      this.theme = mode;
      this.applyTheme();
      savePreference("theme", mode);
    },
    initTheme() {
      const saved = readPreference("theme");
      if (saved === "light" || saved === "dark" || saved === "system")
        this.theme = saved;
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      this.systemDark = media.matches;
      stopThemeListener?.();
      const update = (event: MediaQueryListEvent) => {
        this.systemDark = event.matches;
        this.applyTheme();
      };
      media.addEventListener("change", update);
      stopThemeListener = () => media.removeEventListener("change", update);
      this.applyTheme();
    },
    setLanguage(lang: LanguageCode) {
      this.currentLanguage = lang;
      document.documentElement.lang = lang;
      savePreference("lang", lang);
    },
    initLanguage() {
      const saved = readPreference("lang");
      this.setLanguage(
        saved === "en" || saved === "ru"
          ? saved
          : navigator.language.startsWith("ru")
            ? "ru"
            : "en",
      );
    },
  },
});
