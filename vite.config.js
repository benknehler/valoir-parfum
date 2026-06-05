import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/valoir-parfum/',
  plugins: [react()],
});
