import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Ne pas inclure axios ici si vous voulez qu'il soit bundlé
    },
  },
});
