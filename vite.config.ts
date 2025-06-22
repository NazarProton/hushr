import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: '.',
  base: mode === 'production' ? '/hushr/' : '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
}));
