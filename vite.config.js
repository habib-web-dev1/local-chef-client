import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  css: {
    // This resolves the "@property" warning by using a modern CSS transformer
    transformer: "lightningcss",
  },
  build: {
    // This ensures the build step also understands modern CSS
    cssMinify: "lightningcss",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://local-chef-bazar-server-silk.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true,
      },
    },
  },
});
