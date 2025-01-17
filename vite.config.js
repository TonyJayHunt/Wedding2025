import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',         // Tells Vite to look in the `src` directory for index.html
  build: {
    outDir: '../dist', // Bundled files will live in `dist` at the project root
  },
  server: {
    open: true,
  },
});