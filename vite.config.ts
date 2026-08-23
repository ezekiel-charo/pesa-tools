import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/pesa-tools/', // Enables deployment on path at https://ezekiel-charo.github.io/pesa-tools
  plugins: [react(), tailwindcss()],
});
