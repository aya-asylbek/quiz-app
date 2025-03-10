import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,              // Enable global variables in tests (like `expect`)
    environment: 'jsdom',       // Set the test environment to jsdom (for browser-like behavior)
    setupFiles: ['./client/src/tests/setup.js'],  // Path to the setup file relative to the `vite.config.js`
  },
});


