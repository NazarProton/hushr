import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  base: '/hushr/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
