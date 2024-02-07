import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    clearMocks: true,
    globals: true,
    setupFiles: ["setup-test.ts"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
