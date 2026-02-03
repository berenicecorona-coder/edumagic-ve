
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        sw: 'sw.js'
      },
      output: {
        // Asegura que sw.js mantenga su nombre y ubicación en la raíz de dist
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'sw' ? '[name].js' : 'assets/[name]-[hash].js';
        }
      }
    }
  }
});
