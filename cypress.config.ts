import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    setupNodeEvents(on, config) {
      return config;
    },
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
  },
});
