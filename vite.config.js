import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  server: {
    host: true,
    port: 3000
  },
  plugins: [
    {
      name: 'copy-contenuti-to-dist',
      closeBundle() {
        const src = path.resolve('contenuti');
        const dest = path.resolve('dist', 'contenuti');
        if (fs.existsSync(src)) {
          fs.cpSync(src, dest, { recursive: true });
        }
      }
    }
  ]
});
