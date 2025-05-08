/// <reference types="vitest" />
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Raise the warning threshold if you really need to, but splitting is better:
    chunkSizeWarningLimit: 2000, // (optional)

    rollupOptions: {
      output: {
        // Split vendor code, Phaser itself, and your game code into separate files
        manualChunks(id) {
          if (id.includes("node_modules/phaser")) {
            return "phaser"; // phaser.[hash].js
          }
          if (id.includes("src/phaser")) {
            return "game-engine"; // game-engine.[hash].js
          }
          if (id.includes("node_modules")) {
            return "vendor"; // other dependencies
          }
        },
      },
    },
  },
});
