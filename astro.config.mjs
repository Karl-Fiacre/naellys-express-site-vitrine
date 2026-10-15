// Site vitrine NAËLLYS EXPRESS : site statique (dossier « dist ») publié sur Cloudflare.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://naellys-express.com',
  output: 'static',
  // Liens préchargés au survol : la navigation entre les pages est instantanée.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { format: 'directory' },
});
