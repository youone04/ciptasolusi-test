import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// console.log('Alias @:', path.resolve(__dirname, './src'));
// console.log('Alias @components:', path.resolve(__dirname, './src/components'));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [react()],
});
