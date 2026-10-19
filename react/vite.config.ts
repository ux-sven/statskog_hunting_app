import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// `base: './'` gir relative stier, slik at bygget virker uansett hvor det
// serveres (også i Figma Code Layer).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    port: process.env.FIGMA ? Number(process.env.PORT) : 5173,
    host: process.env.FIGMA ? process.env.FIGMA_DEV_SERVER_HOST || '0.0.0.0' : undefined,
    strictPort: Boolean(process.env.FIGMA),
  },
  build: {
    chunkSizeWarningLimit: 4000,
  },
});
