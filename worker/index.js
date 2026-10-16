// Worker du site vitrine (16/10/2026) : sert les fichiers statiques (dossier dist) et compte les
// visites pour les statistiques du back-office. Pour chaque page HTML vue, il transmet à la
// fonction serveur compterVisite la page, le navigateur, le pays et la ville de la requête
// (fournis par Cloudflare) et l'adresse IP, dont le serveur ne garde qu'une empreinte du jour.
// L'envoi se fait après la réponse (waitUntil) : la page n'est jamais ralentie, et une panne du
// comptage reste sans effet sur le site.
// Réglages : VISITES_URL (wrangler.jsonc) et VISITES_SECRET (secret Cloudflare, le même que
// celui des Edge Functions Supabase). Sans secret, rien n'est compté.

const PRECHARGEMENT = /prefetch|prerender/i;

export default {
  async fetch(request, env, ctx) {
    // Une seule adresse pour les moteurs de recherche : www.naellys-express.com renvoie
    // définitivement (301) vers naellys-express.com, en gardant la page demandée.
    const adresse = new URL(request.url);
    if (adresse.hostname === 'www.naellys-express.com') {
      adresse.hostname = 'naellys-express.com';
      return Response.redirect(adresse.toString(), 301);
    }
    const reponse = await env.ASSETS.fetch(request);
    const type = reponse.headers.get('content-type') ?? '';
    const prechargement = PRECHARGEMENT.test(`${request.headers.get('sec-purpose') ?? ''} ${request.headers.get('purpose') ?? ''}`);
    if (request.method === 'GET' && reponse.ok && type.includes('text/html') && !prechargement && env.VISITES_URL && env.VISITES_SECRET) {
      const url = new URL(request.url);
      ctx.waitUntil(
        fetch(env.VISITES_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-cle-visites': env.VISITES_SECRET },
          body: JSON.stringify({
            page: url.pathname,
            ua: request.headers.get('user-agent') ?? '',
            ip: request.headers.get('cf-connecting-ip') ?? '',
            pays: request.cf?.country ?? null,
            ville: request.cf?.city ?? null,
            provenance: request.headers.get('referer') ?? '',
          }),
        }).catch(() => undefined),
      );
    }
    return reponse;
  },
};
