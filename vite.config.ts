import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mancalagame/',
  plugins: [
    react(),
    {
      name: 'html-base-path',
      enforce: 'pre',
      transform(code, id) {
        if (id.endsWith('index.html')) {
          return code.replace(/\$\{import.meta.env.BASE_URL\}/g, '');
        }
      }
    }
  ]
});
