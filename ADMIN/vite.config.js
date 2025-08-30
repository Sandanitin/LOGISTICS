import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',
  },
  
  css: {
    devSourcemap: mode !== 'production',
  },
}));
