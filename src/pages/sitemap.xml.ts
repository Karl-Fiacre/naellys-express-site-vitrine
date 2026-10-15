// Plan du site pour les moteurs de recherche.
import type { APIRoute } from 'astro';

const PAGES = ['', 'particuliers/', 'entreprises/', 'partenaires/', 'tarifs/', 'devenir-livreur/', 'faq/', 'contact/', 'mentions-legales/'];

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map((p) => `<url><loc>${new URL(p, site)}</loc><changefreq>monthly</changefreq></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
