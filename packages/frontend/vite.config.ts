import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
  build: {
    // На Vercel выводим в корень репо, чтобы outputDirectory "dist" всегда находился
    outDir:
      process.env.NODE_ENV === "production"
        ? resolve(__dirname, "../../dist")
        : "dist",
    sourcemap: true,
  },
});
