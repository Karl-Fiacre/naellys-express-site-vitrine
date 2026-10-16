// Plan du site pour les moteurs de recherche (pages et pages par commune, 16/10/2026).
import type { APIRoute } from 'astro';
import { ZONES } from '../data/zones';

const PAGES: [string, string][] = [
  ['', '1.0'],
  ['particuliers/', '0.9'],
  ['entreprises/', '0.9'],
  ['partenaires/', '0.8'],
  ['tarifs/', '0.9'],
  ['zones-desservies/', '0.9'],
  ...ZONES.map((z): [string, string] => [`livraison/${z.slug}/`, '0.8']),
  ['devenir-livreur/', '0.7'],
  ['faq/', '0.7'],
  ['contact/', '0.7'],
  ['mentions-legales/', '0.3'],
  ['cgu/', '0.3'],
];
// Date de la construction du site : chaque mise en ligne actualise la date de modification.
const MAJ = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map(([p, priorite]) => `<url><loc>${new URL(p, site)}</loc><lastmod>${MAJ}</lastmod><priority>${priorite}</priority></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
